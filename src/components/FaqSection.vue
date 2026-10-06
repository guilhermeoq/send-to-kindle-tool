<template>
  <section class="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-3">
          {{ t('faq.badge') }}
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {{ t('faq.title') }}
        </h2>
      </div>

      <div class="space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200"
        >
          <button
            type="button"
            @click="toggle(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span class="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              {{ item.q }}
            </span>
            <ChevronDown
              :class="[
                'w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200',
                openIndex === index ? 'rotate-180 text-brand-500' : ''
              ]"
            />
          </button>
          <div
            v-if="openIndex === index"
            class="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50"
          >
            {{ item.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const openIndex = ref(0) // First open by default

const faqItems = computed(() => [
  { q: t('faq.q1'), a: t('faq.a1') },
  { q: t('faq.q2'), a: t('faq.a2') },
  { q: t('faq.q3'), a: t('faq.a3') },
  { q: t('faq.q4'), a: t('faq.a4') }
])

const toggle = (idx) => {
  openIndex.value = openIndex.value === idx ? -1 : idx
}
</script>
