'use client';

import { motion } from 'framer-motion';
import type { Hexagram, Line } from '@/types/iching';

/**
 * Props for HexagramDisplay.
 */
export interface HexagramDisplayProps {
  /** The hexagram to render (six lines, bottom-to-top). */
  hexagram: Hexagram;
  /**
   * Optional label shown above the hexagram (e.g. "Primary Hexagram" or
   * "Resulting Hexagram").
   */
  label?: string;
  /**
   * Optional hexagram name/number shown below the lines, e.g.
   * "1. The Creative (Qián)".
   */
  caption?: string;
  /**
   * Width of the rendered SVG in pixels. Height is derived from this.
   * Defaults to 160.
   */
  width?: number;
  /**
   * If true, lines animate into view one at a time from bottom to top.
   * Defaults to true.
   */
  animate?: boolean;
}

const LINE_HEIGHT = 14;
const LINE_GAP = 18;
const GAP_WIDTH_RATIO = 0.18; // width of the central gap in a broken (yin) line, relative to total width

/**
 * Renders a single hexagram line as an SVG group: a solid bar for yang, or
 * two bars with a gap for yin. Moving lines are highlighted with an accent
 * color and a subtle glow.
 */
function HexagramLine({
  line,
  index,
  width,
  animate,
}: {
  line: Line;
  index: number;
  width: number;
  animate: boolean;
}) {
  // index 0 = bottom line, so render position from the bottom upward.
  const y = index * LINE_GAP;
  const isYang = line.binary === 1;
  const isMoving = line.isMoving;

  const baseColor = isMoving ? 'text-cinnabar-500 dark:text-cinnabar-400' : 'text-ink-700 dark:text-parchment-200';

  const lineVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1 },
  };

  const transition = {
    duration: 0.5,
    delay: animate ? index * 0.15 : 0,
    ease: 'easeOut' as const,
  };

  const commonRectProps = {
    height: LINE_HEIGHT,
    rx: 3,
    className: `${baseColor} fill-current`,
  };

  if (isYang) {
    return (
      <motion.g
        initial={animate ? 'hidden' : 'visible'}
        animate="visible"
        variants={lineVariants}
        transition={transition}
        style={{ transformOrigin: `${width / 2}px ${y + LINE_HEIGHT / 2}px` }}
      >
        <rect x={0} y={y} width={width} {...commonRectProps} />
        {isMoving && (
          <circle
            cx={width + 14}
            cy={y + LINE_HEIGHT / 2}
            r={4}
            className="fill-cinnabar-500 dark:fill-cinnabar-400 animate-glow-pulse"
          />
        )}
      </motion.g>
    );
  }

  // Yin (broken) line: two segments with a gap in the middle.
  const gapWidth = width * GAP_WIDTH_RATIO;
  const segmentWidth = (width - gapWidth) / 2;

  return (
    <motion.g
      initial={animate ? 'hidden' : 'visible'}
      animate="visible"
      variants={lineVariants}
      transition={transition}
      style={{ transformOrigin: `${width / 2}px ${y + LINE_HEIGHT / 2}px` }}
    >
      <rect x={0} y={y} width={segmentWidth} {...commonRectProps} />
      <rect x={segmentWidth + gapWidth} y={y} width={segmentWidth} {...commonRectProps} />
      {isMoving && (
        <circle
          cx={width + 14}
          cy={y + LINE_HEIGHT / 2}
          r={4}
          className="fill-cinnabar-500 dark:fill-cinnabar-400 animate-glow-pulse"
        />
      )}
    </motion.g>
  );
}

/**
 * HexagramDisplay
 * ================
 *
 * Renders a complete hexagram as six SVG lines (solid = yang, broken = yin),
 * stacked bottom-to-top as is traditional. Moving lines (old yin/old yang)
 * are highlighted in an accent color with a small glowing marker. When
 * `animate` is true, lines reveal in sequence from bottom to top.
 *
 * This component is purely presentational and has no dependency on the
 * IChingEngine beyond the `Hexagram` type - it can be reused anywhere a
 * hexagram needs to be drawn.
 */
export default function HexagramDisplay({
  hexagram,
  label,
  caption,
  width = 160,
  animate = true,
}: HexagramDisplayProps) {
  const svgHeight = 6 * LINE_GAP - (LINE_GAP - LINE_HEIGHT);
  // extra horizontal space on the right for the moving-line marker
  const svgWidth = width + 28;

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <h3 className="text-sm font-serif uppercase tracking-widest text-ink-500 dark:text-parchment-300">
          {label}
        </h3>
      )}

      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="img"
        aria-label={caption ?? 'Hexagram'}
      >
        {/* Render bottom-to-top: line index 0 is drawn at the bottom of the SVG. */}
        <g transform={`translate(0, ${svgHeight - LINE_HEIGHT})`}>
          {hexagram.lines.map((line, index) => (
            <g key={index} transform={`translate(0, ${-index * LINE_GAP})`}>
              <HexagramLine line={line} index={index} width={width} animate={animate} />
            </g>
          ))}
        </g>
      </svg>

      {caption && (
        <p className="text-center font-serif text-lg text-ink-700 dark:text-parchment-100">
          {caption}
        </p>
      )}
    </div>
  );
}
