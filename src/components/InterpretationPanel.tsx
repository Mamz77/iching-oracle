'use client';

import { motion } from 'framer-motion';
import type { InterpretationResult, Reading } from '@/types/iching';

/**
 * Props for InterpretationPanel.
 */
export interface InterpretationPanelProps {
  /** The reading being interpreted. */
  reading: Reading;
  /** The interpretation result produced by IChingEngine.getInterpretation(). */
  interpretation: InterpretationResult;
}

/**
 * Renders a single hexagram's textual content (Judgment, Image, and modern
 * interpretation) in a labeled block.
 */
function HexagramText({
  title,
  number,
  name,
  chinese,
  unicode,
  judgment,
  image,
  interpretation,
}: {
  title: string;
  number: number;
  name: string;
  chinese: string;
  unicode: string;
  judgment: string;
  image: string;
  interpretation: string;
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-ink-400 dark:text-parchment-400 mb-1">
        {title}
      </h4>
      <p className="font-serif text-xl text-ink-800 dark:text-parchment-100 mb-3">
        <span className="mr-2 text-2xl" aria-hidden="true">
          {unicode}
        </span>
        {number}. {name}{' '}
        <span className="italic text-ink-400 dark:text-parchment-400">({chinese})</span>
      </p>

      <div className="space-y-3 text-sm leading-relaxed text-ink-600 dark:text-parchment-200">
        <p>
          <span className="font-semibold text-ink-700 dark:text-parchment-100">Judgment — </span>
          {judgment}
        </p>
        <p>
          <span className="font-semibold text-ink-700 dark:text-parchment-100">Image — </span>
          {image}
        </p>
        <p>
          <span className="font-semibold text-ink-700 dark:text-parchment-100">Reading — </span>
          {interpretation}
        </p>
      </div>
    </div>
  );
}

/**
 * InterpretationPanel
 * ====================
 *
 * Displays the full interpretation of a reading: the primary hexagram's
 * Judgment/Image/modern reading, the list of moving lines (if any), and -
 * when applicable - the resulting hexagram's text as well.
 */
export default function InterpretationPanel({ reading, interpretation }: InterpretationPanelProps) {
  const { primary, resulting } = interpretation;
  const movingLineNumbers = reading.movingLines.map((i) => i + 1).sort((a, b) => a - b);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass-panel bg-parchment-50/80 dark:bg-ink-700/60 border-parchment-300 dark:border-ink-500 p-6 md:p-8 space-y-8"
    >
      {reading.question && (
        <div>
          <h4 className="text-xs uppercase tracking-widest text-ink-400 dark:text-parchment-400 mb-1">
            Your Question
          </h4>
          <p className="font-serif text-lg italic text-ink-700 dark:text-parchment-100">
            “{reading.question}”
          </p>
        </div>
      )}

      <HexagramText
        title="Primary Hexagram"
        number={primary.number}
        name={primary.name}
        chinese={primary.chinese}
        unicode={primary.unicode}
        judgment={primary.judgment}
        image={primary.image}
        interpretation={primary.interpretation}
      />

      {movingLineNumbers.length > 0 ? (
        <div className="border-t border-parchment-300 dark:border-ink-500 pt-6">
          <p className="text-sm text-cinnabar-600 dark:text-cinnabar-400 mb-6">
            Moving line{movingLineNumbers.length > 1 ? 's' : ''}:{' '}
            {movingLineNumbers.join(', ')} — change is in motion, leading toward:
          </p>

          {resulting && (
            <HexagramText
              title="Resulting Hexagram"
              number={resulting.number}
              name={resulting.name}
              chinese={resulting.chinese}
              unicode={resulting.unicode}
              judgment={resulting.judgment}
              image={resulting.image}
              interpretation={resulting.interpretation}
            />
          )}
        </div>
      ) : (
        <div className="border-t border-parchment-300 dark:border-ink-500 pt-6">
          <p className="text-sm text-ink-400 dark:text-parchment-400">
            No moving lines were cast — this hexagram describes a stable, unchanging situation.
          </p>
        </div>
      )}
    </motion.div>
  );
}
