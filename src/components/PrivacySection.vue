<template>
  <section class="py-16 sm:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-transparent via-slate-100/50 dark:via-slate-900/30 to-transparent">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-8 sm:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none text-center">
        <!-- Shield badge -->
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldCheck class="w-8 h-8" />
        </div>

        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
          {{ t('privacy.badge') }}
        </div>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          {{ t('privacy.title') }}
        </h2>

        <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          {{ t('privacy.desc') }}
        </p>

        <!-- 3 Feature badges -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <Lock class="w-5 h-5 text-emerald-500 mb-2" />
            <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">
              {{ t('privacy.card1Title') }}
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ t('privacy.card1Desc') }}
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <Zap class="w-5 h-5 text-amber-500 mb-2" />
            <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">
              {{ t('privacy.card2Title') }}
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ t('privacy.card2Desc') }}
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <Github class="w-5 h-5 text-brand-500 mb-2" />
            <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">
              {{ t('privacy.card3Title') }}
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ t('privacy.card3Desc') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ShieldCheck, Lock, Zap, Github } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
