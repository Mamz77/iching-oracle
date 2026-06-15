import { NextResponse } from 'next/server';
import { hexagramsByNumber } from '@/oracle/IChingEngine';

export const dynamic = 'force-dynamic';

/**
 * GET /api/daily-hexagram
 *
 * Returns a single hexagram deterministically selected based on today's
 * date (UTC), so that every visitor sees the same "hexagram of the day".
 *
 * This is intentionally NOT a divination reading - it uses a simple
 * deterministic hash of the date rather than IChingEngine's cryptographic
 * randomness, since the goal is a shared daily prompt rather than a
 * personal cast.
 */
export async function GET() {
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10); // "YYYY-MM-DD"

  // Simple deterministic hash of the date string -> 1..64.
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash * 31 + dateString.charCodeAt(i)) >>> 0;
  }
  const hexagramNumber = (hash % 64) + 1;

  const data = hexagramsByNumber[hexagramNumber];

  return NextResponse.json({
    date: dateString,
    hexagram: data,
  });
}
