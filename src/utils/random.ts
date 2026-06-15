/**
 * Cryptographically secure random number utilities.
 *
 * Works in both environments:
 * - Browser: uses crypto.getRandomValues()
 * - Node.js: uses crypto.randomInt() (via dynamic require, since this file
 *   may be bundled for the browser where 'node:crypto' is unavailable)
 *
 * All randomness used by the I Ching engine MUST go through this module so
 * that divination results are produced with a cryptographically secure
 * source of entropy rather than Math.random().
 */

/**
 * Returns true if running in a browser-like environment with the Web Crypto API.
 */
function hasWebCrypto(): boolean {
  return (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.getRandomValues === 'function'
  );
}

/**
 * Generates a cryptographically secure random integer in the inclusive
 * range [min, max].
 *
 * @param min - Minimum value (inclusive).
 * @param max - Maximum value (inclusive).
 * @returns A secure random integer between min and max, inclusive.
 *
 * @throws {Error} If min > max.
 */
export function secureRandomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error(`secureRandomInt: min (${min}) must be <= max (${max})`);
  }

  const range = max - min + 1;

  if (hasWebCrypto()) {
    // Browser / Web Crypto path.
    // Use rejection sampling over a Uint32 to avoid modulo bias.
    const maxUint32 = 0xffffffff;
    const limit = Math.floor((maxUint32 + 1) / range) * range;

    let rand: number;
    const buffer = new Uint32Array(1);
    do {
      globalThis.crypto.getRandomValues(buffer);
      rand = buffer[0];
    } while (rand >= limit);

    return min + (rand % range);
  }

  // Node.js path: use crypto.randomInt, which is already unbiased.
  // Dynamically required so bundlers targeting the browser don't choke on
  // 'node:crypto'.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = require('crypto');
  return nodeCrypto.randomInt(min, max + 1);
}

/**
 * Generates a cryptographically secure random integer used for a single
 * coin toss outcome, mapped directly to its I Ching value (heads = 3, tails = 2).
 *
 * @returns 2 (tails) or 3 (heads), each with probability 1/2.
 */
export function secureCoinToss(): 2 | 3 {
  // 0 = tails (2), 1 = heads (3)
  return secureRandomInt(0, 1) === 1 ? 3 : 2;
}
