# The Oracle of Changes — Digital I Ching Platform

A calm, mystical, and technically rigorous digital I Ching oracle built with
Next.js (App Router), React, TypeScript, and Tailwind CSS.

It implements **two classical divination methods** with statistically
accurate results, a complete **64-hexagram dataset** in King Wen order, and
an animated SVG hexagram visualization.

---

## Features

- **Three Coin Method** — heads = 3, tails = 2, summed per line (6/7/8/9).
- **Yarrow Stalk Method** — a faithful simulation of the traditional
  49-stalk, three-round counting procedure, reproducing the classical
  6:7:8:9 = 1:5:7:3 / 16 probability distribution.
- **64-hexagram dataset** — King Wen order, binary keys, Unicode glyphs,
  trigram names, Judgment/Image text (original wording), and modern
  interpretations.
- **HexagramDisplay** — animated SVG rendering of solid (yang) and broken
  (yin) lines, bottom-to-top, with moving lines highlighted.
- **Primary → Resulting hexagram transformation** when moving lines are cast.
- **Reading history** stored in `localStorage`.
- **Dark / light ("ink" / "parchment") theme toggle.**
- **Daily hexagram API route** (`/api/daily-hexagram`), deterministic per day.
- **Unit tests** for line-generation probability distributions, hexagram
  mapping, and transformation logic (Vitest).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18, TypeScript, Tailwind CSS |
| Animation | Framer Motion |
| Visualization | Inline SVG |
| Randomness | `crypto.getRandomValues()` (browser) / `crypto.randomInt()` (Node) |
| Tests | Vitest |

---

## Project Structure

```
/src
  /app
    layout.tsx              - root layout, theme toggle, global styles
    page.tsx                - home page (renders OracleConsole)
    /api/daily-hexagram
      route.ts              - deterministic "hexagram of the day" endpoint
  /components
    OracleConsole.tsx        - main UX flow: question, method, consult, history
    HexagramDisplay.tsx       - animated SVG hexagram renderer
    CoinTossAnimation.tsx     - decorative coin-toss animation
    InterpretationPanel.tsx   - Judgment/Image/interpretation display
    ThemeToggle.tsx           - light/dark theme switch
  /oracle
    IChingEngine.ts           - core divination engine (UI-independent)
    /__tests__
      IChingEngine.test.ts    - unit tests
  /data
    hexagrams.ts              - full 64-hexagram dataset
  /types
    iching.ts                 - shared TypeScript types
  /utils
    random.ts                 - cryptographically secure RNG helpers
  /styles
    globals.css               - Tailwind base + parchment/ink theme
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run tests

```bash
npm test
```

This runs the Vitest suite, which validates:
- Coin and yarrow line generation always return values in `{6,7,8,9}`.
- Both methods approximate their respective theoretical distributions
  (coin: 1/8, 3/8, 3/8, 1/8 for 6/7/8/9; yarrow: 1/16, 5/16, 7/16, 3/16).
- Binary keys map correctly to the dataset (e.g. `111111` → Hexagram 1,
  `000000` → Hexagram 2).
- Moving-line detection and hexagram transformation (6→yang, 9→yin) are
  correct, including the full Hexagram 1 ↔ Hexagram 2 transformation.

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Architecture Notes

### IChingEngine (`src/oracle/IChingEngine.ts`)

A pure, framework-independent module exposing:

- `generateCoinLine()` / `generateYarrowLine()` — single-line generators.
- `generateHexagram(method)` — builds a full six-line hexagram and resolves
  it against the dataset.
- `detectMovingLines(hexagram)` — returns indices of lines with value 6 or 9.
- `transformHexagram(hexagram)` — applies the traditional transformation
  (old yin → yang, old yang → yin) to produce the resulting hexagram, or
  `null` if there are no moving lines.
- `binaryToHexagram(binaryKey)` — dataset lookup.
- `getInterpretation(reading)` — combines primary/resulting data into a
  human-readable summary.
- `generateReading(method, question?)` — convenience wrapper producing a
  complete `Reading`.

Because this module has no React or Next.js dependencies, it can be reused
in API routes, CLI scripts, or other applications.

### Binary key convention

Hexagrams are stored and looked up by a 6-character binary string written
**top-to-bottom** (matching how hexagrams are traditionally drawn and read).
`lines[0]` in a `Hexagram` object is always the **bottom** line; the binary
key is built by reversing this array. `"111111"` = Hexagram 1 (The
Creative); `"000000"` = Hexagram 2 (The Receptive).

### Yarrow Stalk simulation

Rather than directly sampling from the target distribution, the engine
simulates the traditional procedure: for each of three "rounds" per line,
49 (then 44, then 40) stalks are conceptually divided into two piles (each
of the 49/44/40 stalks independently assigned left or right, re-rolling if
either pile is empty), each pile is counted off in groups of four, and the
remainders determine whether that round contributes a 2 or a 3. Summing
three rounds yields a final value of 6–9, reproducing the classical
1:5:7:3 (out of 16) distribution for 6:7:8:9.

### Hexagram dataset (`src/data/hexagrams.ts`)

All 64 entries include King Wen number, binary key, Unicode glyph (`U+4DC0`
+ (number − 1), per the Unicode "Yijing Hexagram Symbols" block), English
and Chinese (pinyin) names, upper/lower trigram names, and three text
fields:

- `judgment` and `image` — original paraphrased text conveying the
  traditional meaning of each hexagram's Judgment and Image (not quoted
  from any copyrighted translation).
- `interpretation` — a short, original modern reading.

### Randomness (`src/utils/random.ts`)

All randomness flows through `secureRandomInt(min, max)`, which uses
`crypto.getRandomValues()` in the browser (with rejection sampling to avoid
modulo bias) and `crypto.randomInt()` in Node.

---

## Extending the Project

- **Persian/localized content**: the `judgment`, `image`, and
  `interpretation` fields in `hexagrams.ts` can be translated or extended
  with a `locale`-keyed structure for i18n.
- **Shareable readings**: a reading's `binaryKey`(s), method, and question
  can be serialized into a URL query string and reconstructed on load.
- **Question-seeded randomness**: a hash of the question text could be used
  to seed a deterministic PRNG as an alternative mode (note: this would
  replace, not combine with, the cryptographic randomness used for genuine
  divination).
