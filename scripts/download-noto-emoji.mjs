#!/usr/bin/env node
/**
 * Downloads Noto Color Emoji SVGs from Google's GitHub repo
 * and saves them as word-named files in public/images/words/.
 *
 * Usage: node scripts/download-noto-emoji.mjs
 *
 * For words without a direct Noto Emoji match, this script logs them
 * so you can source images separately (AI-generated or hand-picked).
 */

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(import.meta.dirname, '..', 'public', 'images', 'words');

// Map each word to the emoji character it should use.
// The script converts the emoji to its Unicode codepoint(s) to build
// the Noto Emoji SVG filename: emoji_u{codepoint}.svg
const WORD_TO_EMOJI = {
  // Stage 1 — CVC nouns
  cat: '🐱', dog: '🐶', sun: '☀️', map: '🗺️', tap: '🚰', hat: '🎩',
  cup: '☕', bed: '🛏️', pen: '🖊️', pig: '🐷', log: '🪵', jam: '🍓',
  bat: '🦇', fox: '🦊', box: '📦', bus: '🚌', nut: '🥜', bun: '🍞',
  rug: '🧶', mop: '🧹', lip: '👄', kit: '🧰', fin: '🦈', bin: '🗑️',
  tin: '🥫', cob: '🌽', mud: '🟤', gum: '🫧', web: '🕸️', pot: '🍯',
  net: '🥅', wig: '💇', bug: '🐛', hut: '🛖', fan: '🪭', jug: '🫗',
  mug: '☕', cot: '🛏️', pin: '📌', yam: '🍠', ram: '🐏', cap: '🧢',
  van: '🚐', pan: '🍳', ham: '🍖', bag: '👜', tag: '🏷️', rat: '🐀',
  hen: '🐔', peg: '📌', gem: '💎', rod: '🎣', pod: '🫛', cab: '🚕',
  pup: '🐶', sub: '🚇', mat: '🧶', top: '🪀', zip: '🤐', egg: '🥚',

  // Stage 2 — Initial digraphs
  ship: '🚢', shop: '🏪', shed: '🏚️', shell: '🐚', shack: '🛖',
  shark: '🦈', shelf: '🪵',
  chin: '🧔', chip: '🍟', chess: '♟️', chick: '🐤', chef: '🧑‍🍳',
  chest: '🧳', chimp: '🐵', chunk: '🧱',
  thumb: '👍', thorn: '🌹',
  whip: '🏇', wheat: '🌾', whisk: '🥄', wheel: '☸️', whale: '🐋',

  // Stage 3 — Final digraphs
  duck: '🦆', lock: '🔒', rock: '🪨', sock: '🧦', pack: '🎒',
  neck: '🦒', wick: '🕯️', dock: '⚓', deck: '🃏', puck: '🏒',
  sack: '🎒', buck: '🦌', rack: '🗄️',
  ring: '💍', king: '👑', wing: '🪽', fang: '🧛', gong: '🔔',
  fish: '🐟', dish: '🍽️', bush: '🌳', cash: '💵', mash: '🥔',
  sash: '🎀',
  bath: '🛁', path: '🛤️', moth: '🦋',
  hutch: '🐇', patch: '🩹', witch: '🧙', watch: '⌚', match: '🔥', hatch: '🥚',

  // Stage 4 — Consonant blends
  frog: '🐸', flag: '🚩', trap: '🪤', tram: '🚋', plug: '🔌',
  plum: '🫐', drop: '💧', drum: '🥁', dress: '👗', clam: '🦪',
  clip: '📎', clog: '🩴', crab: '🦀', crib: '🛏️', pram: '👶',
  grill: '🍖', grass: '🌿', slug: '🐌', sled: '🛷', spot: '🔵',
  spud: '🥔', step: '👣', stem: '🌱', stag: '🦌', snack: '🍿',
  swan: '🦢', blob: '🫧',
};

/**
 * Convert an emoji string to the Noto Emoji SVG filename.
 * Noto uses: emoji_u{codepoint1}_{codepoint2}.svg (lowercased hex, no ZWJ/VS16)
 */
function emojiToNotoFilename(emoji) {
  const codepoints = [...emoji]
    .map(ch => ch.codePointAt(0))
    .filter(cp => cp !== 0xfe0f && cp !== 0x200d) // strip VS16 and ZWJ
    .map(cp => cp.toString(16));
  return `emoji_u${codepoints.join('_')}.svg`;
}

const BASE_URL = 'https://raw.githubusercontent.com/googlefonts/noto-emoji/main/svg/';
const missing = [];

async function downloadAll() {
  const entries = Object.entries(WORD_TO_EMOJI);
  console.log(`Downloading ${entries.length} Noto Emoji SVGs...`);

  for (const [word, emoji] of entries) {
    const outPath = join(OUT_DIR, `${word}.svg`);
    if (existsSync(outPath)) {
      console.log(`  ✓ ${word} (already exists)`);
      continue;
    }

    const filename = emojiToNotoFilename(emoji);
    const url = BASE_URL + filename;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const svg = await res.text();
      writeFileSync(outPath, svg, 'utf-8');
      console.log(`  ✓ ${word} <- ${filename}`);
    } catch (err) {
      console.log(`  ✗ ${word} — MISSING (${filename}): ${err.message}`);
      missing.push({ word, emoji, filename });
    }

    // Small delay to be polite to GitHub
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\nDone! ${entries.length - missing.length}/${entries.length} downloaded.`);
  if (missing.length > 0) {
    console.log('\nMissing images (need manual sourcing):');
    for (const { word, emoji, filename } of missing) {
      console.log(`  ${word} (${emoji}) — tried ${filename}`);
    }
  }
}

downloadAll().catch(console.error);
