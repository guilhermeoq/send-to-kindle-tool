<template>
  <section class="py-16 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
          {{ t('howItWorks.badge') }}
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {{ t('howItWorks.title') }}
        </h2>
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {{ t('howItWorks.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <!-- Step 1 -->
        <div class="relative rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg mb-6">
            <UploadCloud class="w-6 h-6" />
          </div>
          <span class="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Passo 01</span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('howItWorks.step1Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ t('howItWorks.step1Desc') }}
          </p>
        </div>

        <!-- Step 2 -->
        <div class="relative rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg mb-6">
            <Cpu class="w-6 h-6" />
          </div>
          <span class="text-xs font-bold text-brand-500 uppercase tracking-widest block mb-1">Passo 02</span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('howItWorks.step2Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ t('howItWorks.step2Desc') }}
          </p>
        </div>

        <!-- Step 3 -->
        <div class="relative rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-6">
            <Send class="w-6 h-6" />
          </div>
          <span class="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-1">Passo 03</span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('howItWorks.step3Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ t('howItWorks.step3Desc') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UploadCloud, Cpu, Send } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
