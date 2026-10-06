<template>
  <footer class="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800/60 text-center md:text-left">
        <!-- Brand / Description -->
        <div>
          <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span class="font-bold text-slate-900 dark:text-white">Send to Kindle Fixer</span>
            <span class="text-xs text-brand-500 font-semibold">• v2.0</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ t('footer.madeWith') }}
          </p>
        </div>

        <!-- Links -->
        <div class="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          <a
            href="https://www.amazon.com/sendtokindle"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-brand-500 transition-colors"
          >
            {{ t('footer.amazonLink') }}
          </a>
          <span class="text-slate-300 dark:text-slate-700">•</span>
          <a
            href="https://github.com/guilhermeoq/send-to-kindle-tool"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-brand-500 transition-colors"
          >
            {{ t('footer.githubLink') }}
          </a>
        </div>
      </div>

      <!-- Legal disclaimer -->
      <div class="pt-6 text-center text-[11px] text-slate-400 dark:text-slate-500 max-w-2xl mx-auto leading-relaxed">
        {{ t('footer.disclaimer') }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
