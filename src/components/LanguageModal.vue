<template>
  <div
    v-if="isOpen"
    @click.self="onFallback"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
  >
    <div
      class="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-left transition-all"
    >
      <!-- Close button (X) -->
      <button
        @click="onFallback"
        type="button"
        class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Fechar"
      >
        <X class="w-4 h-4" />
      </button>

      <!-- Header -->
      <div class="flex items-center gap-3 mb-4 pr-8">
        <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Globe class="w-5 h-5" />
        </div>
        <div class="min-w-0">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {{ t('langModal.title') }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-sm mt-0.5">
            {{ modalData.filename }}
          </p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        {{ t('langModal.desc', { filename: modalData.filename, lang: modalData.current || 'n/a' }) }}
      </p>

      <!-- Suggested language chips -->
      <div class="mb-5">
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          {{ t('langModal.commonLangs') }}
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(label, code) in commonLangs"
            :key="code"
            type="button"
            @click="selectedCode = code"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
              selectedCode === code
                ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            ]"
          >
            {{ label }}
          </button>
        </div>
      </div>

      <!-- Custom Code Input -->
      <div class="mb-6">
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          {{ t('langModal.customLabel') }}
        </label>
        <input
          v-model="selectedCode"
          @keydown.enter="onConfirm"
          type="text"
          placeholder="ex: pt-BR, en, es"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
        <button
          type="button"
          @click="onFallback"
          class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {{ t('langModal.fallback') }}
        </button>
        <button
          type="button"
          @click="onConfirm"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-colors"
        >
          {{ t('langModal.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Globe, X } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  isOpen: Boolean,
  modalData: {
    type: Object,
    default: () => ({ filename: '', current: 'en' })
  }
})

const emit = defineEmits(['resolve'])
const { t } = useI18n()

const selectedCode = ref('pt-BR')

watch(
  () => props.isOpen,
  (newOpen) => {
    if (newOpen) {
      selectedCode.value = props.modalData?.current && props.modalData.current !== 'undefined'
        ? props.modalData.current
        : 'pt-BR'
    }
  }
)

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    onFallback()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const commonLangs = computed(() => ({
  'pt-BR': t('langModal.langs.pt-BR'),
  'pt': t('langModal.langs.pt'),
  'en': t('langModal.langs.en'),
  'es': t('langModal.langs.es'),
  'fr': t('langModal.langs.fr'),
  'de': t('langModal.langs.de')
}))

const onConfirm = () => {
  emit('resolve', selectedCode.value.trim() || 'en')
}

const onFallback = () => {
  emit('resolve', 'en')
}
</script>
