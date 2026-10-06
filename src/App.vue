<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1">
      <!-- Hero & Drag-and-Drop Uploader -->
      <HeroDropzone @files-selected="handleFilesSelected" />

      <!-- Active Processing & Results Area -->
      <section v-if="fileList.length > 0" class="py-10 max-w-4xl mx-auto px-4 sm:px-6">
        <!-- Section Header & Batch Action Bar -->
        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 shadow-lg mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{{ t('process.title') }}</span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  {{ fileList.length }}
                </span>
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {{ isProcessingAny ? t('process.processingAll') : t('process.doneAll') }}
              </p>
            </div>

            <!-- Batch Action Buttons -->
            <div class="flex items-center gap-2.5">
              <button
                v-if="completedCount > 1"
                @click="downloadAllZip"
                :disabled="isZipping || isProcessingAny"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <Loader2 v-if="isZipping" class="w-3.5 h-3.5 animate-spin" />
                <Archive v-else class="w-3.5 h-3.5" />
                <span>{{ isZipping ? t('process.preparingZip') : t('process.downloadAll') }}</span>
              </button>

              <button
                @click="clearAllFiles"
                type="button"
                class="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors"
              >
                <RotateCcw class="w-3.5 h-3.5" />
                <span>{{ t('process.clearAll') }}</span>
              </button>
            </div>
          </div>

          <!-- Overall Progress Bar if processing -->
          <div v-if="isProcessingAny" class="mt-4">
            <div class="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                class="bg-brand-500 h-2 transition-all duration-300"
                :style="{ width: `${progressPercent}%` }"
              ></div>
            </div>
          </div>

          <!-- File Cards List -->
          <div class="mt-6 space-y-3.5">
            <FileCard
              v-for="item in fileList"
              :key="item.id"
              :file-item="item"
              @download="downloadSingle"
              @remove="removeFile"
            />
          </div>

          <!-- Amazon Link Reminder -->
          <div class="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ t('process.recheckTip') }}
              <a
                href="https://www.amazon.com/sendtokindle"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold text-brand-600 dark:text-brand-400 hover:underline ml-1 inline-flex items-center gap-1"
              >
                <span>amazon.com/sendtokindle</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </section>

      <!-- Landing Page Sections -->
      <HowItWorks />
      <IssuesFixedSection />
      <PrivacySection />
      <FaqSection />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Language Selector Modal (replaces browser window.prompt) -->
    <LanguageModal
      :is-open="languageModalState.isOpen"
      :modal-data="languageModalState.data"
      @resolve="onResolveLanguageModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { Archive, RotateCcw, Loader2, ExternalLink } from 'lucide-vue-next'

import Navbar from '@/components/Navbar.vue'
import HeroDropzone from '@/components/HeroDropzone.vue'
import FileCard from '@/components/FileCard.vue'
import HowItWorks from '@/components/HowItWorks.vue'
import IssuesFixedSection from '@/components/IssuesFixedSection.vue'
import PrivacySection from '@/components/PrivacySection.vue'
import FaqSection from '@/components/FaqSection.vue'
import Footer from '@/components/Footer.vue'
import LanguageModal from '@/components/LanguageModal.vue'

import { EPUBBook, downloadBlob, createBatchZip } from '@/services/epubFixer'
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

const fileList = ref([])
const isZipping = ref(false)

// Language modal state
const languageModalState = ref({
  isOpen: false,
  data: { filename: '', current: 'en' },
  resolver: null
})

const isProcessingAny = computed(() => {
  return fileList.value.some(f => f.status === 'processing')
})

const completedCount = computed(() => {
  return fileList.value.filter(f => f.status === 'fixed' || f.status === 'repacked').length
})

const progressPercent = computed(() => {
  if (fileList.value.length === 0) return 0
  const done = fileList.value.filter(f => f.status !== 'processing').length
  return Math.round((done / fileList.value.length) * 100)
})

// Trigger confetti celebration
const triggerSuccessConfetti = () => {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#10b981', '#3b82f6']
    })
  } catch (e) {
    // Graceful fallback if confetti blocked
  }
}

// Language modal handling
const promptBookLanguageAsync = (filename, currentLang) => {
  return new Promise((resolve) => {
    languageModalState.value = {
      isOpen: true,
      data: { filename, current: currentLang },
      resolver: resolve
    }
  })
}

const onResolveLanguageModal = (selectedCode) => {
  if (languageModalState.value.resolver) {
    languageModalState.value.resolver(selectedCode)
  }
  languageModalState.value.isOpen = false
  languageModalState.value.resolver = null
}

// Add files and process sequentially
const handleFilesSelected = async (newFiles) => {
  const initialItems = newFiles.map(file => ({
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    name: file.name,
    size: file.size,
    status: 'processing',
    problems: [],
    errorMsg: '',
    blob: null,
    outputFilename: '',
    rawFile: file
  }))

  fileList.value.unshift(...initialItems)

  for (const item of initialItems) {
    await processSingleEpub(item)
  }
}

// Core processing runner for a single EPUB
const processSingleEpub = async (item) => {
  const target = fileList.value.find(f => f.id === item.id) || item
  try {
    target.status = 'processing'
    console.log('[S2K] Processing:', item.name)

    const epub = new EPUBBook()
    await epub.readEPUB(item.rawFile)
    console.log('[S2K] Read successfully:', item.name, 'total files:', Object.keys(epub.files).length)

    // Run structural fixes
    epub.fixBodyIdLink()
    await epub.fixBookLanguage(async ({ reason, current }) => {
      console.log('[S2K] Prompting language for:', item.name, 'current:', current)
      return await promptBookLanguageAsync(item.name, current)
    })
    epub.fixStrayIMG()
    epub.fixEncoding()

    // Write repaired EPUB
    const outputBlob = await epub.writeEPUB()
    console.log('[S2K] Write finished:', item.name, 'problems:', epub.fixedProblems.length)
    target.blob = outputBlob
    target.problems = [...epub.fixedProblems]

    if (epub.fixedProblems.length > 0) {
      target.status = 'fixed'
      target.outputFilename = `(fixed) ${item.name}`
    } else {
      target.status = 'repacked'
      target.outputFilename = `(repacked) ${item.name}`
    }
  } catch (err) {
    console.error('[S2K] Error processing EPUB:', item.name, err)
    target.status = 'error'
    target.errorMsg = err?.message || t('process.sysError')
  }
}

const downloadSingle = (item) => {
  if (item.blob && item.outputFilename) {
    downloadBlob(item.blob, item.outputFilename)
    triggerSuccessConfetti()
  }
}

const downloadAllZip = async () => {
  isZipping.value = true
  try {
    const validFiles = fileList.value.filter(f => f.blob && f.outputFilename)
    const zipBlob = await createBatchZip(validFiles)
    downloadBlob(zipBlob, 'fixed-epubs.zip')
    triggerSuccessConfetti()
  } catch (err) {
    console.error('Error creating batch zip:', err)
  } finally {
    isZipping.value = false
  }
}

const removeFile = (id) => {
  fileList.value = fileList.value.filter(f => f.id !== id)
}

const clearAllFiles = () => {
  fileList.value = []
}
</script>
