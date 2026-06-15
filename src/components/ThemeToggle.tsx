'use client';

import { useEffect, useState } from 'react';

/**
 * ThemeToggle
 * ============
 *
 * A small floating button that toggles between light ("parchment") and
 * dark ("ink") themes by adding/removing the `dark` class on the document
 * root. The preference is persisted to localStorage.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('iching-oracle-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored === 'dark' || (stored === null && prefersDark);

    setIsDark(initialDark);
    document.documentElement.classList.toggle('dark', initialDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('iching-oracle-theme', next ? 'dark' : 'light');
  };

  // Avoid rendering until mounted to prevent a flash of the wrong icon.
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="fixed top-4 right-4 z-10 w-10 h-10 rounded-full
        border border-parchment-300 dark:border-ink-500
        bg-parchment-50/80 dark:bg-ink-700/80 backdrop-blur-sm
        flex items-center justify-center text-lg
        text-ink-600 dark:text-parchment-200
        hover:border-cinnabar-400 transition-colors"
    >
      {isDark ? '☼' : '☾'}
    </button>
  );
}
