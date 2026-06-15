'use client';

import { motion } from 'framer-motion';
import type { Line } from '@/types/iching';

/**
 * Props for CoinTossAnimation.
 */
export interface CoinTossAnimationProps {
  /**
   * The line currently being revealed (used to decide the final coin
   * faces shown at the end of the animation). If undefined, coins spin
   * indefinitely (used while waiting for the next line).
   */
  line?: Line;
  /** Index of this line within the hexagram (0 = bottom, 5 = top). */
  index: number;
}

/**
 * Renders three small coin glyphs that "toss" with a brief spin animation.
 * Heads (yang contribution, value 3) is shown as a solid circle; tails
 * (yin contribution, value 2) is shown as a hollow ring. This is a purely
 * decorative animation accompanying line generation - the actual outcome is
 * always determined by IChingEngine, not by this component.
 */
export default function CoinTossAnimation({ line, index }: CoinTossAnimationProps) {
  // Decide a plausible-looking set of three coin faces consistent with the
  // line's value, purely for visual flavor. This does not influence the
  // engine's result in any way.
  const facesForValue = (value: number): boolean[] => {
    // true = heads (3), false = tails (2)
    switch (value) {
      case 6:
        return [false, false, false]; // 2+2+2
      case 7:
        return [true, false, false]; // 3+2+2
      case 8:
        return [true, true, false]; // 3+3+2
      case 9:
        return [true, true, true]; // 3+3+3
      default:
        return [false, false, false];
    }
  };

  const faces = line ? facesForValue(line.value) : [false, false, false];

  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      {faces.map((isHeads, i) => (
        <motion.div
          key={i}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-serif
            ${isHeads
              ? 'bg-parchment-300 border-parchment-500 dark:bg-ink-500 dark:border-parchment-400'
              : 'bg-transparent border-ink-400 dark:border-parchment-500'}`}
          initial={{ rotateY: 0, opacity: 0.4 }}
          animate={{ rotateY: [0, 360, 720], opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15 + i * 0.05,
            ease: 'easeOut',
          }}
        >
          {isHeads ? '陽' : '陰'}
        </motion.div>
      ))}
    </div>
  );
}
