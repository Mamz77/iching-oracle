'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HexagramDisplay from './HexagramDisplay';
import InterpretationPanel from './InterpretationPanel';
import { generateReading, getInterpretation } from '@/oracle/IChingEngine';
import type { DivinationMethod, Reading } from '@/types/iching';

const STORAGE_KEY = 'iching-oracle-history';
const MAX_HISTORY = 20;

/**
 * Reads the reading history from localStorage. Returns an empty array if
 * unavailable or invalid (e.g. during server-side rendering).
 */
function loadHistory(): Reading[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Persists the reading history to localStorage, capped at MAX_HISTORY entries.
 */
function saveHistory(history: Reading[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {
    // Storage may be unavailable (private browsing, quota, etc.) - fail silently.
  }
}

/**
 * OracleConsole
 * ==============
 *
 * The main interactive component implementing the full oracle UX flow:
 *
 *  1. The user enters an (optional) question.
 *  2. The user selects a divination method (coin or yarrow).
 *  3. The user clicks "Consult the Oracle".
 *  4. A reading is generated via IChingEngine.
 *  5. The primary hexagram, moving lines, resulting hexagram (if any), and
 *     interpretation are displayed.
 *
 * Readings are also saved to localStorage as a simple history feature.
 */
export default function OracleConsole() {
  const [question, setQuestion] = useState('');
  const [method, setMethod] = useState<DivinationMethod>('coin');
  const [reading, setReading] = useState<Reading | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);
  const [history, setHistory] = useState<Reading[]>(() => loadHistory());
  const [showHistory, setShowHistory] = useState(false);

  const handleConsult = async () => {
    setIsConsulting(true);

    // Small delay so the casting animation has time to feel meaningful,
    // even though the result is already determined the instant it's generated.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const newReading = generateReading(method, question.trim() || undefined);
    setReading(newReading);

    const updatedHistory = [newReading, ...history];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    setIsConsulting(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const interpretation = reading ? getInterpretation(reading) : null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-serif text-4xl md:text-5xl text-ink-800 dark:text-parchment-100 tracking-wide">
          The Oracle of Changes
        </h1>
        <p className="text-ink-500 dark:text-parchment-300 text-sm md:text-base">
          Pose a question. Cast a hexagram. Reflect on what it reveals.
        </p>
      </div>

      {/* Question + Method selection */}
      <div className="glass-panel bg-parchment-50/70 dark:bg-ink-700/50 border-parchment-300 dark:border-ink-500 p-6 md:p-8 space-y-6">
        <div>
          <label
            htmlFor="question"
            className="block text-xs uppercase tracking-widest text-ink-400 dark:text-parchment-400 mb-2"
          >
            Your Question (optional)
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like guidance on?"
            rows={2}
            className="w-full bg-transparent border border-parchment-300 dark:border-ink-500 rounded-lg px-4 py-3
              text-ink-800 dark:text-parchment-100 placeholder:text-ink-300 dark:placeholder:text-parchment-500
              focus:outline-none focus:ring-2 focus:ring-cinnabar-400/50 resize-none font-serif"
          />
        </div>

        <div>
          <span className="block text-xs uppercase tracking-widest text-ink-400 dark:text-parchment-400 mb-2">
            Divination Method
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMethod('coin')}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors
                ${method === 'coin'
                  ? 'border-cinnabar-400 bg-cinnabar-500/10 text-cinnabar-600 dark:text-cinnabar-400'
                  : 'border-parchment-300 dark:border-ink-500 text-ink-500 dark:text-parchment-300 hover:border-cinnabar-300'}`}
            >
              Three Coins
              <span className="block text-xs opacity-70 mt-1">Faster, traditional shortcut</span>
            </button>
            <button
              type="button"
              onClick={() => setMethod('yarrow')}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors
                ${method === 'yarrow'
                  ? 'border-cinnabar-400 bg-cinnabar-500/10 text-cinnabar-600 dark:text-cinnabar-400'
                  : 'border-parchment-300 dark:border-ink-500 text-ink-500 dark:text-parchment-300 hover:border-cinnabar-300'}`}
            >
              Yarrow Stalks
              <span className="block text-xs opacity-70 mt-1">Slower, classical ritual</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleConsult}
          disabled={isConsulting}
          className="w-full rounded-lg bg-ink-700 dark:bg-parchment-200 text-parchment-50 dark:text-ink-800
            font-serif text-lg py-3 tracking-wide transition-opacity hover:opacity-90
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConsulting ? 'Consulting…' : 'Consult the Oracle'}
        </button>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        {reading && interpretation && (
          <motion.div
            key={reading.timestamp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-6">
              <HexagramDisplay
                hexagram={reading.primary}
                label="Primary Hexagram"
                caption={`${interpretation.primary.unicode} ${interpretation.primary.number}. ${interpretation.primary.name}`}
              />

              {reading.resulting && interpretation.resulting && (
                <>
                  <span className="text-2xl text-ink-300 dark:text-parchment-500" aria-hidden="true">
                    →
                  </span>
                  <HexagramDisplay
                    hexagram={reading.resulting}
                    label="Resulting Hexagram"
                    caption={`${interpretation.resulting.unicode} ${interpretation.resulting.number}. ${interpretation.resulting.name}`}
                    animate={false}
                  />
                </>
              )}
            </div>

            <InterpretationPanel reading={reading} interpretation={interpretation} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      {history.length > 0 && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowHistory((v) => !v)}
            className="text-xs uppercase tracking-widest text-ink-400 dark:text-parchment-400 hover:text-cinnabar-500 transition-colors"
          >
            {showHistory ? 'Hide' : 'Show'} Reading History ({history.length})
          </button>

          {showHistory && (
            <div className="mt-4 space-y-2 text-left max-w-xl mx-auto">
              {history.map((h) => {
                const data = getInterpretation(h);
                return (
                  <div
                    key={h.timestamp}
                    className="text-sm border border-parchment-300 dark:border-ink-500 rounded-lg px-4 py-3
                      bg-parchment-50/50 dark:bg-ink-700/40 text-ink-600 dark:text-parchment-200"
                  >
                    <span className="font-serif">
                      {data.primary.unicode} {data.primary.number}. {data.primary.name}
                    </span>
                    {data.resulting && (
                      <span className="text-ink-400 dark:text-parchment-400">
                        {' '}→ {data.resulting.unicode} {data.resulting.number}. {data.resulting.name}
                      </span>
                    )}
                    {h.question && (
                      <span className="block text-xs italic text-ink-400 dark:text-parchment-400 mt-1">
                        “{h.question}”
                      </span>
                    )}
                    <span className="block text-xs text-ink-300 dark:text-parchment-500 mt-1">
                      {new Date(h.timestamp).toLocaleString()} · {h.method === 'coin' ? 'Three Coins' : 'Yarrow Stalks'}
                    </span>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs text-ink-300 dark:text-parchment-500 hover:text-cinnabar-500 transition-colors mt-2"
              >
                Clear history
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
