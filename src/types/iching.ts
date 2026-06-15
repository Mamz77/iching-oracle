/**
 * Core type definitions for the Digital I Ching Oracle.
 *
 * Conventions:
 * - Line values: 6 (old yin), 7 (young yang), 8 (young yin), 9 (old yang)
 * - Binary: 1 = yang (solid line), 0 = yin (broken line)
 * - Line arrays are ordered bottom-to-top: lines[0] is the bottom (first) line,
 *   lines[5] is the top (sixth) line.
 * - binaryKey is a 6-character string written TOP-to-BOTTOM (matching the
 *   traditional way hexagrams are drawn/read), i.e. binaryKey[0] corresponds
 *   to lines[5] (top) and binaryKey[5] corresponds to lines[0] (bottom).
 */

/** Raw line value produced by either divination method. */
export type LineValue = 6 | 7 | 8 | 9;

/** Binary representation of a line: 1 = yang (solid), 0 = yin (broken). */
export type Binary = 0 | 1;

/** Divination method used to generate a hexagram. */
export type DivinationMethod = 'coin' | 'yarrow';

/**
 * A single line within a hexagram.
 */
export interface Line {
  /** Raw generated value (6-9). */
  value: LineValue;
  /** Binary form: 1 = yang, 0 = yin. */
  binary: Binary;
  /** True if this line is a "moving line" (old yin = 6, or old yang = 9). */
  isMoving: boolean;
}

/**
 * A full hexagram: six lines plus derived metadata.
 */
export interface Hexagram {
  /** Six lines, ordered bottom-to-top (lines[0] = bottom, lines[5] = top). */
  lines: Line[];
  /**
   * 6-character binary key, written top-to-bottom, used to look up the
   * hexagram in the dataset. E.g. "111111" = Hexagram 1 (The Creative).
   */
  binaryKey: string;
  /** King Wen sequence number (1-64). */
  number: number;
}

/**
 * Static metadata for a single hexagram, as stored in the dataset.
 */
export interface HexagramData {
  /** King Wen sequence number (1-64). */
  number: number;
  /** 6-character binary key, top-to-bottom. */
  binary: string;
  /** Unicode hexagram glyph (e.g. "䷀"). */
  unicode: string;
  /** English name of the hexagram. */
  name: string;
  /** Romanized Chinese name (pinyin). */
  chinese: string;
  /** Name of the upper (outer) trigram. */
  upper_trigram: string;
  /** Name of the lower (inner) trigram. */
  lower_trigram: string;
  /** Original-style "Judgment" text (paraphrased, not a direct quote). */
  judgment: string;
  /** Original-style "Image" text (paraphrased, not a direct quote). */
  image: string;
  /** Short modern interpretation / guidance. */
  interpretation: string;
}

/**
 * A complete oracle reading, combining the primary hexagram, any moving
 * lines, and (if applicable) the resulting hexagram after transformation.
 */
export interface Reading {
  /** The question the user asked, if any. */
  question?: string;
  /** Divination method used. */
  method: DivinationMethod;
  /** The hexagram as originally cast. */
  primary: Hexagram;
  /** The hexagram after transforming moving lines, or null if none. */
  resulting: Hexagram | null;
  /** Indices (0-5, bottom-to-top) of lines that are "moving". */
  movingLines: number[];
  /** Unix timestamp (ms) of when the reading was generated. */
  timestamp: number;
}

/**
 * Combined interpretation payload returned by getInterpretation().
 */
export interface InterpretationResult {
  /** Dataset entry for the primary hexagram. */
  primary: HexagramData;
  /** Dataset entry for the resulting hexagram, or null if no moving lines. */
  resulting: HexagramData | null;
  /** Human-readable summary combining primary, moving lines, and resulting. */
  summary: string;
}
