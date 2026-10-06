<template>
  <div
    :class="[
      'rounded-2xl border p-5 transition-all duration-200 shadow-sm',
      fileItem.status === 'error'
        ? 'border-rose-300/80 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20'
        : fileItem.status === 'processing'
        ? 'border-amber-300/80 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/10'
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
    ]"
  >
    <!-- Top Row: Icon, Filename & Meta, Status Badge, Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-3.5 min-w-0">
        <!-- Status Icon -->
        <div
          :class="[
            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm',
            fileItem.status === 'fixed'
              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
              : fileItem.status === 'repacked'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
              : fileItem.status === 'processing'
              ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
              : 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
          ]"
        >
          <Loader2 v-if="fileItem.status === 'processing'" class="w-5 h-5 animate-spin" />
          <CheckCircle2 v-else-if="fileItem.status === 'fixed'" class="w-5 h-5" />
          <FileCheck2 v-else-if="fileItem.status === 'repacked'" class="w-5 h-5" />
          <AlertTriangle v-else class="w-5 h-5" />
        </div>

        <!-- Name & Details -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h4 class="font-semibold text-slate-900 dark:text-white truncate text-base leading-tight">
              {{ fileItem.name }}
            </h4>
          </div>
          <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>{{ formatSize(fileItem.size) }}</span>
            <span>•</span>
            <span
              :class="[
                'font-medium',
                fileItem.status === 'fixed'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : fileItem.status === 'repacked'
                  ? 'text-blue-600 dark:text-blue-400'
                  : fileItem.status === 'processing'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-rose-600 dark:text-rose-400'
              ]"
            >
              {{ statusLabel }}
            </span>
            <template v-if="fileItem.problems && fileItem.problems.length > 0">
              <span>•</span>
              <span class="text-slate-600 dark:text-slate-300 font-medium">
                {{ fileItem.problems.length }} {{ t('process.fixesApplied') }}
              </span>
            </template>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
        <!-- Download Single File -->
        <button
          v-if="fileItem.blob"
          @click="emit('download', fileItem)"
          type="button"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95"
        >
          <Download class="w-3.5 h-3.5" />
          <span>{{ t('process.downloadSingle') }}</span>
        </button>

        <!-- Toggle Details button if has problems -->
        <button
          v-if="fileItem.problems && fileItem.problems.length > 0"
          @click="showDetails = !showDetails"
          type="button"
          :class="[
            'p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors',
            showDetails ? 'bg-slate-100 dark:bg-slate-800' : ''
          ]"
          :title="showDetails ? t('process.hideDetails') : t('process.showDetails')"
        >
          <ChevronUp v-if="showDetails" class="w-4 h-4" />
          <ChevronDown v-else class="w-4 h-4" />
        </button>

        <!-- Remove file button -->
        <button
          @click="emit('remove', fileItem.id)"
          type="button"
          class="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          title="Remover"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Expandable Details Section -->
    <div
      v-if="showDetails && fileItem.problems && fileItem.problems.length > 0"
      class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2"
    >
      <div
        v-for="(prob, idx) in fileItem.problems"
        :key="idx"
        class="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300"
      >
        <Check class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>{{ currentLang === 'pt' ? prob.summary : prob.summaryEn }}</span>
      </div>
    </div>

    <!-- Error message display if any -->
    <div
      v-else-if="fileItem.status === 'error'"
      class="mt-3 pt-3 border-t border-rose-200 dark:border-rose-900/60 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2"
    >
      <AlertTriangle class="w-4 h-4 shrink-0" />
      <span>{{ fileItem.errorMsg || t('process.sysError') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Loader2,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  Download,
  ChevronDown,
  ChevronUp,
  Trash2,
  Check
} from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  fileItem: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['download', 'remove'])
const { t, currentLang } = useI18n()

const showDetails = ref(false)

const statusLabel = computed(() => {
  switch (props.fileItem.status) {
    case 'processing':
      return t('process.processingItem')
    case 'fixed':
      return t('process.fixedTitle')
    case 'repacked':
      return t('process.repackedTitle')
    case 'error':
      return t('process.errorTitle')
    default:
      return ''
  }
})

function formatSize(bytes) {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>
