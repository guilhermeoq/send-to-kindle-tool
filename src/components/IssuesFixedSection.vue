<template>
  <section class="py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 text-xs font-semibold mb-3">
          {{ t('fixes.badge') }}
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {{ t('fixes.title') }}
        </h2>
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {{ t('fixes.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Issue 1: UTF-8 -->
        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 hover:border-brand-500/50 transition-all duration-300">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-5">
            <Code2 class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('fixes.issue1Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('fixes.issue1Desc') }}
          </p>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
            <span class="text-rose-500 line-through">â€œOlá mundoâ€</span>
            <span class="mx-2">➔</span>
            <span class="text-emerald-500 font-semibold">“Olá mundo”</span>
          </div>
        </div>

        <!-- Issue 2: Body ID Link -->
        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 hover:border-brand-500/50 transition-all duration-300">
          <div class="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5">
            <Link2Off class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('fixes.issue2Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('fixes.issue2Desc') }}
          </p>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
            <span class="text-rose-500 line-through">chapter1.xhtml#bodyID</span>
            <span class="mx-2">➔</span>
            <span class="text-emerald-500 font-semibold">chapter1.xhtml</span>
          </div>
        </div>

        <!-- Issue 3: Language Metadata -->
        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 hover:border-brand-500/50 transition-all duration-300">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5">
            <Globe2 class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('fixes.issue3Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('fixes.issue3Desc') }}
          </p>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
            <span class="text-emerald-500 font-semibold">&lt;dc:language&gt;pt-BR&lt;/dc:language&gt;</span>
          </div>
        </div>

        <!-- Issue 4: Stray Image Tags -->
        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 hover:border-brand-500/50 transition-all duration-300">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5">
            <ImageMinus class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {{ t('fixes.issue4Title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {{ t('fixes.issue4Desc') }}
          </p>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-300">
            <span class="text-rose-500 line-through">&lt;img alt="" /&gt;</span>
            <span class="mx-2">➔</span>
            <span class="text-emerald-500 font-semibold">[tag removida com segurança]</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Code2, Link2Off, Globe2, ImageMinus } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
