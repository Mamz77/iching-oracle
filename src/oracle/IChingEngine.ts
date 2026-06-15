/**
 * IChingEngine
 * ============
 *
 * Pure, UI-independent divination engine implementing the two classical
 * I Ching casting methods:
 *
 *  1. Three Coin Method  - generateCoinLine()
 *  2. Yarrow Stalk Method - generateYarrowLine()
 *
 * and the supporting hexagram logic: building a hexagram from six lines,
 * detecting moving lines, transforming the primary hexagram into the
 * resulting hexagram, mapping binary keys to dataset entries, and producing
 * a combined interpretation.
 *
 * This module has no dependency on React, Next.js, or any UI framework, so
 * it can be reused from API routes, server actions, CLI tools, or tests.
 */

import { secureRandomInt, secureCoinToss } from '../utils/random';
import { hexagrams } from '../data/hexagrams';
import type {
  Binary,
  DivinationMethod,
  Hexagram,
  HexagramData,
  InterpretationResult,
  Line,
  LineValue,
  Reading,
} from '../types/iching';

// ---------------------------------------------------------------------------
// Three Coin Method
// ---------------------------------------------------------------------------

/**
 * Generates a single line using the traditional Three Coin Method.
 *
 * Each of three coins is tossed independently:
 *   heads = 3, tails = 2 (each with probability 1/2)
 *
 * The three results are summed to produce a value of 6, 7, 8, or 9:
 *   6 -> old yin   (moving, broken line)
 *   7 -> young yang (solid line)
 *   8 -> young yin  (broken line)
 *   9 -> old yang  (moving, solid line)
 *
 * Resulting probabilities: 6 -> 1/8, 7 -> 3/8, 8 -> 3/8, 9 -> 1/8.
 *
 * @returns The line value (6, 7, 8, or 9).
 */
export function generateCoinLine(): LineValue {
  const sum = secureCoinToss() + secureCoinToss() + secureCoinToss();
  return sum as LineValue;
}

// ---------------------------------------------------------------------------
// Yarrow Stalk Method
// ---------------------------------------------------------------------------

/**
 * Result of a single "round" (change) of the yarrow stalk counting process.
 */
interface YarrowRound {
  /** The value contributed by this round: 2 or 3. */
  value: 2 | 3;
  /** Number of stalks remaining for the next round. */
  nextStalks: number;
}

/**
 * Performs a single round (one of three "changes") of the yarrow stalk
 * counting procedure.
 *
 * Procedure:
 *  1. Set aside one stalk ("hang" stalk) - remaining = stalks - 1.
 *  2. Randomly divide the remaining stalks into two piles (left, right),
 *     each containing at least one stalk.
 *  3. Count the right pile off in groups of four; the remainder (1-4,
 *     where an exact multiple of 4 yields a remainder of 4, not 0) is set
 *     aside.
 *  4. Count the left pile off in groups of four in the same way; its
 *     remainder is also set aside.
 *  5. The total set aside (1 from step 1, plus both remainders) maps to a
 *     round value of 2 or 3:
 *       - First round (starting from 49): total 5 -> 3, total 9 -> 2.
 *       - Second/third rounds (starting from 44 or 40): total 4 -> 3,
 *         total 8 -> 2.
 *  6. The stalks remaining for the next round = stalks - totalSetAside.
 *
 * This faithfully reproduces the traditional procedure, including its
 * statistical properties: round 1 yields value 3 with probability 1/4 and
 * value 2 with probability 3/4; rounds 2 and 3 yield value 3 with
 * probability 3/8 and value 2 with probability 5/8.
 *
 * @param stalks - Number of stalks available at the start of this round.
 * @returns The round's contributed value (2 or 3) and the stalk count
 *          carried into the next round.
 */
function performYarrowRound(stalks: number): YarrowRound {
  // Step 1: set aside the "hang" stalk.
  const remaining = stalks - 1;

  // Step 2: randomly divide into two non-empty piles.
  //
  // Each of the `remaining` stalks is independently assigned to the left or
  // right pile with probability 1/2 (a binomial split), re-rolling if either
  // pile would end up empty. This - rather than picking the pile *size*
  // uniformly at random - is what correctly reproduces the traditional
  // probability distribution, because it mirrors how a bundle of stalks is
  // actually divided by hand at an approximately random point.
  let leftPile = 0;
  let rightPile = 0;
  do {
    leftPile = 0;
    for (let i = 0; i < remaining; i++) {
      if (secureRandomInt(0, 1) === 1) {
        leftPile++;
      }
    }
    rightPile = remaining - leftPile;
  } while (leftPile === 0 || rightPile === 0);

  // Step 3 & 4: count each pile off in groups of four; an exact multiple of
  // 4 yields a remainder of 4 (never 0).
  const remainderRight = rightPile % 4 === 0 ? 4 : rightPile % 4;
  const remainderLeft = leftPile % 4 === 0 ? 4 : leftPile % 4;

  // Step 5: total set aside this round (including the hang stalk).
  const totalSetAside = 1 + remainderRight + remainderLeft;

  // Map totalSetAside to a round value of 2 or 3.
  // First round (stalks === 49): totalSetAside is 5 or 9.
  // Later rounds (stalks === 44 or 40): totalSetAside is 4 or 8.
  const value: 2 | 3 = totalSetAside === 5 || totalSetAside === 4 ? 3 : 2;

  // Step 6: stalks carried forward.
  const nextStalks = stalks - totalSetAside;

  return { value, nextStalks };
}

/**
 * Generates a single line using a faithful simulation of the traditional
 * Yarrow Stalk Method (50 stalks, 1 set aside permanently, 49 in active use).
 *
 * Three rounds ("changes") are performed in sequence, each contributing a
 * value of 2 or 3. The three values are summed to produce the final line
 * value of 6, 7, 8, or 9.
 *
 * This reproduces the traditional probability distribution:
 *   6 -> 1/16, 7 -> 5/16, 8 -> 7/16, 9 -> 3/16.
 *
 * @returns The line value (6, 7, 8, or 9).
 */
export function generateYarrowLine(): LineValue {
  let stalks = 49;
  let total = 0;

  for (let round = 0; round < 3; round++) {
    const { value, nextStalks } = performYarrowRound(stalks);
    total += value;
    stalks = nextStalks;
  }

  return total as LineValue;
}

// ---------------------------------------------------------------------------
// Hexagram construction
// ---------------------------------------------------------------------------

/**
 * Converts a raw line value (6-9) into its binary form.
 *
 * 6 (old yin)    -> 0 (yin / broken)
 * 7 (young yang) -> 1 (yang / solid)
 * 8 (young yin)  -> 0 (yin / broken)
 * 9 (old yang)   -> 1 (yang / solid)
 *
 * @param value - The raw line value.
 * @returns The binary representation (0 = yin, 1 = yang).
 */
function lineValueToBinary(value: LineValue): Binary {
  return value === 7 || value === 9 ? 1 : 0;
}

/**
 * Determines whether a raw line value represents a "moving" line.
 *
 * Moving lines are 6 (old yin) and 9 (old yang) - the lines that transform
 * into their opposite when generating the resulting hexagram.
 *
 * @param value - The raw line value.
 * @returns True if the line is moving (6 or 9).
 */
function isMovingLine(value: LineValue): boolean {
  return value === 6 || value === 9;
}

/**
 * Builds the 6-character binary key (top-to-bottom) for a set of lines
 * ordered bottom-to-top.
 *
 * @param lines - Six lines, ordered bottom-to-top (lines[0] = bottom).
 * @returns A 6-character string of '0'/'1', written top-to-bottom.
 */
function buildBinaryKey(lines: Line[]): string {
  // lines[5] is the top line -> binaryKey[0]
  // lines[0] is the bottom line -> binaryKey[5]
  return lines
    .slice()
    .reverse()
    .map((line) => String(line.binary))
    .join('');
}

/**
 * Generates a complete hexagram (six lines, bottom-to-top) using the
 * specified divination method, and resolves it to its King Wen number via
 * the hexagram dataset.
 *
 * @param method - Which casting method to use: 'coin' or 'yarrow'.
 * @returns A complete Hexagram object.
 */
export function generateHexagram(method: DivinationMethod): Hexagram {
  const lines: Line[] = [];

  for (let i = 0; i < 6; i++) {
    const value = method === 'coin' ? generateCoinLine() : generateYarrowLine();
    lines.push({
      value,
      binary: lineValueToBinary(value),
      isMoving: isMovingLine(value),
    });
  }

  const binaryKey = buildBinaryKey(lines);
  const data = binaryToHexagram(binaryKey);

  return {
    lines,
    binaryKey,
    number: data.number,
  };
}

// ---------------------------------------------------------------------------
// Moving lines & transformation
// ---------------------------------------------------------------------------

/**
 * Returns the indices (0-5, bottom-to-top) of all moving lines in a hexagram.
 *
 * Moving lines are those with a raw value of 6 (old yin) or 9 (old yang).
 *
 * @param hexagram - The hexagram to inspect.
 * @returns An array of line indices that are moving, in ascending order.
 *          Empty if there are no moving lines.
 */
export function detectMovingLines(hexagram: Hexagram): number[] {
  const indices: number[] = [];
  hexagram.lines.forEach((line, index) => {
    if (line.isMoving) {
      indices.push(index);
    }
  });
  return indices;
}

/**
 * Produces the "resulting hexagram" by transforming all moving lines in the
 * primary hexagram:
 *
 *   old yin (6)  -> yang (becomes a solid line)
 *   old yang (9) -> yin  (becomes a broken line)
 *
 * Non-moving lines (7 and 8) are carried over unchanged.
 *
 * @param hexagram - The primary hexagram.
 * @returns A new Hexagram representing the transformed result, or `null` if
 *          the primary hexagram has no moving lines (in which case there is
 *          no separate resulting hexagram).
 */
export function transformHexagram(hexagram: Hexagram): Hexagram | null {
  const movingLines = detectMovingLines(hexagram);

  if (movingLines.length === 0) {
    return null;
  }

  const transformedLines: Line[] = hexagram.lines.map((line) => {
    if (!line.isMoving) {
      // Non-moving lines are carried over unchanged.
      return { ...line };
    }

    // Moving lines flip to their opposite binary value.
    // The resulting line is no longer "moving" - it has settled into its
    // new state, represented here as the corresponding young value.
    const newBinary: Binary = line.binary === 1 ? 0 : 1;
    const newValue: LineValue = newBinary === 1 ? 7 : 8;

    return {
      value: newValue,
      binary: newBinary,
      isMoving: false,
    };
  });

  const binaryKey = buildBinaryKey(transformedLines);
  const data = binaryToHexagram(binaryKey);

  return {
    lines: transformedLines,
    binaryKey,
    number: data.number,
  };
}

// ---------------------------------------------------------------------------
// Dataset lookup
// ---------------------------------------------------------------------------

/**
 * Looks up the static dataset entry for a hexagram given its binary key.
 *
 * @param binaryKey - A 6-character string of '0'/'1', written top-to-bottom.
 * @returns The corresponding HexagramData entry.
 * @throws {Error} If no hexagram matches the given binary key (indicates a
 *         corrupt key or incomplete dataset).
 */
export function binaryToHexagram(binaryKey: string): HexagramData {
  const data = hexagrams[binaryKey];

  if (!data) {
    throw new Error(
      `binaryToHexagram: no hexagram found for binary key "${binaryKey}". ` +
        `Expected a 6-character string of '0'/'1'.`
    );
  }

  return data;
}

// ---------------------------------------------------------------------------
// Interpretation
// ---------------------------------------------------------------------------

/**
 * Produces a combined interpretation for a full reading: the primary
 * hexagram's data, the resulting hexagram's data (if any moving lines were
 * present), and a human-readable summary tying them together.
 *
 * @param reading - The reading to interpret.
 * @returns An InterpretationResult containing dataset entries for the
 *          primary and resulting hexagrams (resulting may be null) plus a
 *          composed summary string.
 */
export function getInterpretation(reading: Reading): InterpretationResult {
  const primaryData = binaryToHexagram(reading.primary.binaryKey);
  const resultingData = reading.resulting
    ? binaryToHexagram(reading.resulting.binaryKey)
    : null;

  const summaryParts: string[] = [];

  summaryParts.push(
    `Hexagram ${primaryData.number}: ${primaryData.name} (${primaryData.chinese}). ${primaryData.interpretation}`
  );

  if (reading.movingLines.length > 0 && resultingData) {
    const lineNumbers = reading.movingLines
      .map((index) => index + 1) // convert 0-based to 1-based, traditional line numbering
      .sort((a, b) => a - b)
      .join(', ');

    summaryParts.push(
      `Moving line(s) ${lineNumbers} indicate change is underway, leading toward ` +
        `Hexagram ${resultingData.number}: ${resultingData.name} (${resultingData.chinese}). ${resultingData.interpretation}`
    );
  } else {
    summaryParts.push('No moving lines were cast, so this hexagram represents a stable, unchanging situation.');
  }

  return {
    primary: primaryData,
    resulting: resultingData,
    summary: summaryParts.join(' '),
  };
}

// ---------------------------------------------------------------------------
// Convenience: full reading
// ---------------------------------------------------------------------------

/**
 * Generates a complete Reading: casts a primary hexagram using the given
 * method, detects moving lines, and (if any are present) computes the
 * resulting hexagram.
 *
 * @param method - Which casting method to use: 'coin' or 'yarrow'.
 * @param question - Optional question text associated with this reading.
 * @returns A complete Reading object.
 */
export function generateReading(method: DivinationMethod, question?: string): Reading {
  const primary = generateHexagram(method);
  const movingLines = detectMovingLines(primary);
  const resulting = transformHexagram(primary);

  return {
    question,
    method,
    primary,
    resulting,
    movingLines,
    timestamp: Date.now(),
  };
}

/**
 * The IChingEngine namespace object, bundling all engine functions for
 * convenient single-import usage:
 *
 * ```ts
 * import { IChingEngine } from '@/oracle/IChingEngine';
 * const reading = IChingEngine.generateReading('yarrow', 'Should I proceed?');
 * ```
 */
export const IChingEngine = {
  generateCoinLine,
  generateYarrowLine,
  generateHexagram,
  detectMovingLines,
  transformHexagram,
  binaryToHexagram,
  getInterpretation,
  generateReading,
};
