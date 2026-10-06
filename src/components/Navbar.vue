<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <!-- Brand -->
      <a href="#" class="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
          <BookOpen class="w-5 h-5" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-900 dark:text-white tracking-tight leading-tight text-base sm:text-lg">
              Send to Kindle <span class="text-brand-500">Fixer</span>
            </span>
            <span class="text-[10px] font-semibold uppercase tracking-wider bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 px-1.5 py-0.5 rounded-full">
              v2.0
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {{ t('nav.tagline') }}
          </p>
        </div>
      </a>

      <!-- Right actions -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Send to Kindle official link -->
        <a
          href="https://www.amazon.com/sendtokindle"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
        >
          <ExternalLink class="w-3.5 h-3.5" />
          {{ t('nav.sendToKindle') }}
        </a>

        <!-- Language toggle button -->
        <button
          @click="toggleLang"
          :title="t('nav.switchLang')"
          class="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Languages class="w-4 h-4 text-brand-500" />
          <span>{{ currentLang.toUpperCase() }}</span>
        </button>

        <!-- Dark / Light theme toggle -->
        <button
          @click="toggleTheme"
          :title="t('nav.toggleTheme')"
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          aria-label="Toggle theme"
        >
          <Sun v-if="isDark" class="w-4 h-4 text-amber-400" />
          <Moon v-else class="w-4 h-4 text-slate-600" />
        </button>

        <!-- GitHub button -->
        <a
          href="https://github.com/guilhermeoq/send-to-kindle-tool"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          title="GitHub Repository"
          aria-label="GitHub Repository"
        >
          <Github class="w-4 h-4" />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { BookOpen, ExternalLink, Languages, Sun, Moon, Github } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'

const { t, currentLang, toggleLang } = useI18n()
const { isDark, toggleTheme } = useTheme()
</script>
