<template>
  <section class="relative pt-10 pb-12 sm:pt-16 sm:pb-16 overflow-hidden">
    <!-- Subtle background gradient glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <!-- Feature Pill -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 text-xs font-semibold mb-6 shadow-sm">
        <Sparkles class="w-3.5 h-3.5 text-brand-500 animate-pulse" />
        <span>{{ t('hero.badge') }}</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none mb-6">
        {{ t('hero.titlePrefix') }}
        <span class="bg-gradient-to-r from-amber-500 via-brand-500 to-orange-500 bg-clip-text text-transparent">
          {{ t('hero.titleHighlight') }}
        </span>
        <br class="hidden sm:inline" />
        {{ t('hero.titleSuffix') }}
      </h1>

      <!-- Subtitle -->
      <p class="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
        {{ t('hero.subtitle') }}
      </p>

      <!-- Dropzone Area -->
      <div
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        @click="triggerFilePicker"
        :class="[
          'relative max-w-2xl mx-auto rounded-3xl border-2 border-dashed p-8 sm:p-12 transition-all duration-300 cursor-pointer group text-center shadow-lg',
          isDragging
            ? 'border-brand-500 bg-brand-500/10 scale-[1.02] shadow-glow-brand ring-4 ring-brand-500/20'
            : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 hover:border-brand-400 hover:bg-white dark:hover:bg-slate-900 shadow-slate-200/50 dark:shadow-none'
        ]"
      >
        <input
          ref="fileInputRef"
          type="file"
          accept=".epub"
          multiple
          class="hidden"
          @change="onFileChange"
        />

        <div class="flex flex-col items-center">
          <!-- Animated Icon Badge -->
          <div
            :class="[
              'w-20 h-20 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-md',
              isDragging
                ? 'bg-brand-500 text-white animate-bounce'
                : 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-800 dark:to-slate-700/80 text-brand-600 dark:text-brand-400'
            ]"
          >
            <UploadCloud v-if="isDragging" class="w-10 h-10" />
            <BookOpenCheck v-else class="w-10 h-10" />
          </div>

          <!-- Drop Text -->
          <h2 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {{ isDragging ? t('hero.dropActive') : t('hero.dropTitle') }}
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {{ t('hero.dropSubtitle') }}
          </p>

          <!-- Browse Button -->
          <button
            type="button"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-600 hover:to-brand-700 text-white font-medium text-sm shadow-md shadow-brand-500/25 transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-95 pointer-events-none"
          >
            <FileUp class="w-4 h-4" />
            <span>{{ t('hero.selectFilesBtn') }}</span>
          </button>

          <!-- Hints -->
          <div class="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span class="inline-flex items-center gap-1.5">
              <Files class="w-3.5 h-3.5 text-brand-500" />
              {{ t('hero.multipleHint') }}
            </span>
            <span class="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span class="inline-flex items-center gap-1.5">
              <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" />
              {{ t('hero.privacyBadge') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Sparkles, BookOpenCheck, UploadCloud, FileUp, Files, ShieldCheck } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const emit = defineEmits(['files-selected'])
const { t } = useI18n()

const fileInputRef = ref(null)
const isDragging = ref(false)

const triggerFilePicker = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const onFileChange = (e) => {
  const files = Array.from(e.target.files || []).filter(f => f.name.toLowerCase().endsWith('.epub'))
  if (files.length > 0) {
    emit('files-selected', files)
  }
  // Reset input to allow selecting the same file again if desired
  e.target.value = ''
}

const onDrop = (e) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer.files || []).filter(f => f.name.toLowerCase().endsWith('.epub'))
  if (files.length > 0) {
    emit('files-selected', files)
  }
}
</script>
