/**
 * Tests for IChingEngine.
 *
 * Covers:
 *  - Three Coin Method: correct value range and (approximate) probability
 *    distribution (6:1/8, 7:3/8, 8:3/8, 9:1/8).
 *  - Yarrow Stalk Method: correct value range and (approximate) probability
 *    distribution (6:1/16, 7:5/16, 8:7/16, 9:3/16).
 *  - Hexagram construction: binary mapping, dataset lookup.
 *  - Moving line detection and hexagram transformation.
 *  - Edge cases: no moving lines, all moving lines.
 */

import { describe, it, expect } from 'vitest';
import {
  generateCoinLine,
  generateYarrowLine,
  generateHexagram,
  detectMovingLines,
  transformHexagram,
  binaryToHexagram,
  getInterpretation,
  generateReading,
} from '../IChingEngine';
import { hexagrams } from '../../data/hexagrams';
import type { Hexagram, Line, LineValue, Reading } from '../../types/iching';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Runs a generator function `n` times and returns a frequency map of results.
 */
function sampleDistribution<T extends number>(generator: () => T, n: number): Record<number, number> {
  const counts: Record<number, number> = {};
  for (let i = 0; i < n; i++) {
    const value = generator();
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
}

/**
 * Builds a Hexagram from an array of six raw LineValues (bottom-to-top),
 * for use in transformation/detection tests without relying on randomness.
 */
function buildHexagramFromValues(values: LineValue[]): Hexagram {
  if (values.length !== 6) {
    throw new Error('Expected exactly 6 line values');
  }

  const lines: Line[] = values.map((value) => ({
    value,
    binary: value === 7 || value === 9 ? 1 : 0,
    isMoving: value === 6 || value === 9,
  }));

  // binaryKey is top-to-bottom: reverse the bottom-to-top lines array.
  const binaryKey = lines
    .slice()
    .reverse()
    .map((l) => String(l.binary))
    .join('');

  const data = binaryToHexagram(binaryKey);

  return { lines, binaryKey, number: data.number };
}

// ---------------------------------------------------------------------------
// Three Coin Method
// ---------------------------------------------------------------------------

describe('generateCoinLine', () => {
  it('always returns a value in {6, 7, 8, 9}', () => {
    for (let i = 0; i < 500; i++) {
      const value = generateCoinLine();
      expect([6, 7, 8, 9]).toContain(value);
    }
  });

  it('approximates the expected distribution (6:1/8, 7:3/8, 8:3/8, 9:1/8)', () => {
    const n = 20000;
    const counts = sampleDistribution(generateCoinLine, n);

    const p6 = (counts[6] ?? 0) / n;
    const p7 = (counts[7] ?? 0) / n;
    const p8 = (counts[8] ?? 0) / n;
    const p9 = (counts[9] ?? 0) / n;

    // Expected: 1/8 = 0.125, 3/8 = 0.375
    const tolerance = 0.02;

    expect(p6).toBeGreaterThan(0.125 - tolerance);
    expect(p6).toBeLessThan(0.125 + tolerance);

    expect(p7).toBeGreaterThan(0.375 - tolerance);
    expect(p7).toBeLessThan(0.375 + tolerance);

    expect(p8).toBeGreaterThan(0.375 - tolerance);
    expect(p8).toBeLessThan(0.375 + tolerance);

    expect(p9).toBeGreaterThan(0.125 - tolerance);
    expect(p9).toBeLessThan(0.125 + tolerance);
  });
});

// ---------------------------------------------------------------------------
// Yarrow Stalk Method
// ---------------------------------------------------------------------------

describe('generateYarrowLine', () => {
  it('always returns a value in {6, 7, 8, 9}', () => {
    for (let i = 0; i < 500; i++) {
      const value = generateYarrowLine();
      expect([6, 7, 8, 9]).toContain(value);
    }
  });

  it('approximates the traditional distribution (6:1/16, 7:5/16, 8:7/16, 9:3/16)', () => {
    const n = 20000;
    const counts = sampleDistribution(generateYarrowLine, n);

    const p6 = (counts[6] ?? 0) / n;
    const p7 = (counts[7] ?? 0) / n;
    const p8 = (counts[8] ?? 0) / n;
    const p9 = (counts[9] ?? 0) / n;

    // Expected: 1/16 = 0.0625, 5/16 = 0.3125, 7/16 = 0.4375, 3/16 = 0.1875
    const tolerance = 0.02;

    expect(p6).toBeGreaterThan(0.0625 - tolerance);
    expect(p6).toBeLessThan(0.0625 + tolerance);

    expect(p7).toBeGreaterThan(0.3125 - tolerance);
    expect(p7).toBeLessThan(0.3125 + tolerance);

    expect(p8).toBeGreaterThan(0.4375 - tolerance);
    expect(p8).toBeLessThan(0.4375 + tolerance);

    expect(p9).toBeGreaterThan(0.1875 - tolerance);
    expect(p9).toBeLessThan(0.1875 + tolerance);
  });
});

// ---------------------------------------------------------------------------
// Hexagram generation & dataset mapping
// ---------------------------------------------------------------------------

describe('generateHexagram', () => {
  it('produces six lines for both methods', () => {
    const coinHex = generateHexagram('coin');
    const yarrowHex = generateHexagram('yarrow');

    expect(coinHex.lines).toHaveLength(6);
    expect(yarrowHex.lines).toHaveLength(6);
  });

  it('produces a binaryKey that matches a real dataset entry', () => {
    for (let i = 0; i < 50; i++) {
      const hex = generateHexagram('coin');
      expect(hexagrams[hex.binaryKey]).toBeDefined();
      expect(hexagrams[hex.binaryKey].number).toBe(hex.number);
    }
  });

  it('correctly maps all-yang lines to Hexagram 1 (The Creative)', () => {
    const hex = buildHexagramFromValues([7, 7, 7, 7, 7, 7]);
    expect(hex.binaryKey).toBe('111111');
    expect(hex.number).toBe(1);
    expect(hexagrams[hex.binaryKey].name).toBe('The Creative');
  });

  it('correctly maps all-yin lines to Hexagram 2 (The Receptive)', () => {
    const hex = buildHexagramFromValues([8, 8, 8, 8, 8, 8]);
    expect(hex.binaryKey).toBe('000000');
    expect(hex.number).toBe(2);
    expect(hexagrams[hex.binaryKey].name).toBe('The Receptive');
  });
});

// ---------------------------------------------------------------------------
// binaryToHexagram
// ---------------------------------------------------------------------------

describe('binaryToHexagram', () => {
  it('returns the correct dataset entry for a known key', () => {
    const data = binaryToHexagram('111111');
    expect(data.number).toBe(1);
    expect(data.name).toBe('The Creative');
    expect(data.chinese).toBe('Qián');
  });

  it('contains all 64 unique hexagrams', () => {
    const keys = Object.keys(hexagrams);
    expect(keys).toHaveLength(64);

    const numbers = new Set(Object.values(hexagrams).map((h) => h.number));
    expect(numbers.size).toBe(64);
    for (let i = 1; i <= 64; i++) {
      expect(numbers.has(i)).toBe(true);
    }
  });

  it('throws for an invalid binary key', () => {
    expect(() => binaryToHexagram('999999')).toThrow();
  });
});

// ---------------------------------------------------------------------------
// detectMovingLines
// ---------------------------------------------------------------------------

describe('detectMovingLines', () => {
  it('returns an empty array when there are no moving lines', () => {
    const hex = buildHexagramFromValues([7, 8, 7, 8, 7, 8]);
    expect(detectMovingLines(hex)).toEqual([]);
  });

  it('returns correct indices for moving lines (6 and 9)', () => {
    // bottom-to-top: index 0 = 6 (moving), index 3 = 9 (moving)
    const hex = buildHexagramFromValues([6, 7, 8, 9, 7, 8]);
    expect(detectMovingLines(hex)).toEqual([0, 3]);
  });

  it('returns all indices when every line is moving', () => {
    const hex = buildHexagramFromValues([6, 9, 6, 9, 6, 9]);
    expect(detectMovingLines(hex)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

// ---------------------------------------------------------------------------
// transformHexagram
// ---------------------------------------------------------------------------

describe('transformHexagram', () => {
  it('returns null when there are no moving lines', () => {
    const hex = buildHexagramFromValues([7, 8, 7, 8, 7, 8]);
    expect(transformHexagram(hex)).toBeNull();
  });

  it('flips old yin (6) to yang and old yang (9) to yin', () => {
    // bottom-to-top: [6,7,8,9,7,8] -> moving lines at index 0 (6->yang) and 3 (9->yin)
    const hex = buildHexagramFromValues([6, 7, 8, 9, 7, 8]);
    const transformed = transformHexagram(hex);

    expect(transformed).not.toBeNull();
    if (!transformed) return;

    // index 0 was old yin (6, binary 0) -> should become yang (binary 1)
    expect(transformed.lines[0].binary).toBe(1);
    expect(transformed.lines[0].isMoving).toBe(false);

    // index 3 was old yang (9, binary 1) -> should become yin (binary 0)
    expect(transformed.lines[3].binary).toBe(0);
    expect(transformed.lines[3].isMoving).toBe(false);

    // non-moving lines (indices 1,2,4,5) unchanged
    expect(transformed.lines[1].binary).toBe(hex.lines[1].binary);
    expect(transformed.lines[2].binary).toBe(hex.lines[2].binary);
    expect(transformed.lines[4].binary).toBe(hex.lines[4].binary);
    expect(transformed.lines[5].binary).toBe(hex.lines[5].binary);
  });

  it('transforms Hexagram 1 (all moving yang, 999999) into Hexagram 2 (all yin)', () => {
    const hex = buildHexagramFromValues([9, 9, 9, 9, 9, 9]);
    expect(hex.binaryKey).toBe('111111');
    expect(hex.number).toBe(1);

    const transformed = transformHexagram(hex);
    expect(transformed).not.toBeNull();
    if (!transformed) return;

    expect(transformed.binaryKey).toBe('000000');
    expect(transformed.number).toBe(2);
  });

  it('transforms Hexagram 2 (all moving yin, 666666) into Hexagram 1 (all yang)', () => {
    const hex = buildHexagramFromValues([6, 6, 6, 6, 6, 6]);
    expect(hex.binaryKey).toBe('000000');
    expect(hex.number).toBe(2);

    const transformed = transformHexagram(hex);
    expect(transformed).not.toBeNull();
    if (!transformed) return;

    expect(transformed.binaryKey).toBe('111111');
    expect(transformed.number).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// getInterpretation & generateReading
// ---------------------------------------------------------------------------

describe('getInterpretation', () => {
  it('returns primary data and null resulting when there are no moving lines', () => {
    const primary = buildHexagramFromValues([7, 8, 7, 8, 7, 8]);
    const reading: Reading = {
      method: 'coin',
      primary,
      resulting: transformHexagram(primary),
      movingLines: detectMovingLines(primary),
      timestamp: Date.now(),
    };

    const result = getInterpretation(reading);
    expect(result.primary.number).toBe(primary.number);
    expect(result.resulting).toBeNull();
    expect(result.summary).toContain('No moving lines');
  });

  it('returns both primary and resulting data when moving lines are present', () => {
    const primary = buildHexagramFromValues([9, 9, 9, 9, 9, 9]); // Hexagram 1, all moving
    const resulting = transformHexagram(primary);

    const reading: Reading = {
      method: 'coin',
      primary,
      resulting,
      movingLines: detectMovingLines(primary),
      timestamp: Date.now(),
    };

    const result = getInterpretation(reading);
    expect(result.primary.number).toBe(1);
    expect(result.resulting).not.toBeNull();
    expect(result.resulting?.number).toBe(2);
    expect(result.summary).toContain('Hexagram 1');
    expect(result.summary).toContain('Hexagram 2');
  });
});

describe('generateReading', () => {
  it('produces a complete, internally consistent reading', () => {
    const reading = generateReading('yarrow', 'Will this project succeed?');

    expect(reading.question).toBe('Will this project succeed?');
    expect(reading.method).toBe('yarrow');
    expect(reading.primary.lines).toHaveLength(6);
    expect(reading.movingLines).toEqual(detectMovingLines(reading.primary));

    if (reading.movingLines.length > 0) {
      expect(reading.resulting).not.toBeNull();
    } else {
      expect(reading.resulting).toBeNull();
    }
  });
});
