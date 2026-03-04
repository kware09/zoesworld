import { PhonemeBreakdown, SoundManipulation, WordEntry, SentenceEntry, PhonemeEntry } from './types';

// ============================================================
// Full 200-item Phoneme Dataset
// ============================================================
// Stage 1: CVC Words (60 words)
// Stage 2: Initial Digraphs (40 words)
// Stage 3: Final Digraphs (40 words)
// Stage 4: Consonant Blends (40 words)
// Stage 5: Simple Sentences (20 sentences)
// ============================================================

// --- Stage 1: CVC Words (60 words) ---

const STAGE_1_WORDS: WordEntry[] = [
  { id: 'cat', type: 'word', word: 'cat', phonemes: ['c', 'a', 't'], stage: 1 },
  { id: 'dog', type: 'word', word: 'dog', phonemes: ['d', 'o', 'g'], stage: 1 },
  { id: 'sun', type: 'word', word: 'sun', phonemes: ['s', 'u', 'n'], stage: 1 },
  { id: 'map', type: 'word', word: 'map', phonemes: ['m', 'a', 'p'], stage: 1 },
  { id: 'tap', type: 'word', word: 'tap', phonemes: ['t', 'a', 'p'], stage: 1 },
  { id: 'hat', type: 'word', word: 'hat', phonemes: ['h', 'a', 't'], stage: 1 },
  { id: 'run', type: 'word', word: 'run', phonemes: ['r', 'u', 'n'], stage: 1 },
  { id: 'sit', type: 'word', word: 'sit', phonemes: ['s', 'i', 't'], stage: 1 },
  { id: 'cup', type: 'word', word: 'cup', phonemes: ['c', 'u', 'p'], stage: 1 },
  { id: 'bed', type: 'word', word: 'bed', phonemes: ['b', 'e', 'd'], stage: 1 },
  { id: 'pen', type: 'word', word: 'pen', phonemes: ['p', 'e', 'n'], stage: 1 },
  { id: 'pig', type: 'word', word: 'pig', phonemes: ['p', 'i', 'g'], stage: 1 },
  { id: 'log', type: 'word', word: 'log', phonemes: ['l', 'o', 'g'], stage: 1 },
  { id: 'jam', type: 'word', word: 'jam', phonemes: ['j', 'a', 'm'], stage: 1 },
  { id: 'bat', type: 'word', word: 'bat', phonemes: ['b', 'a', 't'], stage: 1 },
  { id: 'red', type: 'word', word: 'red', phonemes: ['r', 'e', 'd'], stage: 1 },
  { id: 'hot', type: 'word', word: 'hot', phonemes: ['h', 'o', 't'], stage: 1 },
  { id: 'wet', type: 'word', word: 'wet', phonemes: ['w', 'e', 't'], stage: 1 },
  { id: 'fox', type: 'word', word: 'fox', phonemes: ['f', 'o', 'x'], stage: 1 },
  { id: 'box', type: 'word', word: 'box', phonemes: ['b', 'o', 'x'], stage: 1 },
  { id: 'mix', type: 'word', word: 'mix', phonemes: ['m', 'i', 'x'], stage: 1 },
  { id: 'fix', type: 'word', word: 'fix', phonemes: ['f', 'i', 'x'], stage: 1 },
  { id: 'bus', type: 'word', word: 'bus', phonemes: ['b', 'u', 's'], stage: 1 },
  { id: 'hug', type: 'word', word: 'hug', phonemes: ['h', 'u', 'g'], stage: 1 },
  { id: 'nut', type: 'word', word: 'nut', phonemes: ['n', 'u', 't'], stage: 1 },
  { id: 'cut', type: 'word', word: 'cut', phonemes: ['c', 'u', 't'], stage: 1 },
  { id: 'mud', type: 'word', word: 'mud', phonemes: ['m', 'u', 'd'], stage: 1 },
  { id: 'fun', type: 'word', word: 'fun', phonemes: ['f', 'u', 'n'], stage: 1 },
  { id: 'bun', type: 'word', word: 'bun', phonemes: ['b', 'u', 'n'], stage: 1 },
  { id: 'dug', type: 'word', word: 'dug', phonemes: ['d', 'u', 'g'], stage: 1 },
  { id: 'rug', type: 'word', word: 'rug', phonemes: ['r', 'u', 'g'], stage: 1 },
  { id: 'tug', type: 'word', word: 'tug', phonemes: ['t', 'u', 'g'], stage: 1 },
  { id: 'mop', type: 'word', word: 'mop', phonemes: ['m', 'o', 'p'], stage: 1 },
  { id: 'hop', type: 'word', word: 'hop', phonemes: ['h', 'o', 'p'], stage: 1 },
  { id: 'pop', type: 'word', word: 'pop', phonemes: ['p', 'o', 'p'], stage: 1 },
  { id: 'top', type: 'word', word: 'top', phonemes: ['t', 'o', 'p'], stage: 1 },
  { id: 'lip', type: 'word', word: 'lip', phonemes: ['l', 'i', 'p'], stage: 1 },
  { id: 'tip', type: 'word', word: 'tip', phonemes: ['t', 'i', 'p'], stage: 1 },
  { id: 'dip', type: 'word', word: 'dip', phonemes: ['d', 'i', 'p'], stage: 1 },
  { id: 'rip', type: 'word', word: 'rip', phonemes: ['r', 'i', 'p'], stage: 1 },
  { id: 'zip', type: 'word', word: 'zip', phonemes: ['z', 'i', 'p'], stage: 1 },
  { id: 'gap', type: 'word', word: 'gap', phonemes: ['g', 'a', 'p'], stage: 1 },
  { id: 'nap', type: 'word', word: 'nap', phonemes: ['n', 'a', 'p'], stage: 1 },
  { id: 'lap', type: 'word', word: 'lap', phonemes: ['l', 'a', 'p'], stage: 1 },
  { id: 'sap', type: 'word', word: 'sap', phonemes: ['s', 'a', 'p'], stage: 1 },
  { id: 'kit', type: 'word', word: 'kit', phonemes: ['k', 'i', 't'], stage: 1 },
  { id: 'bit', type: 'word', word: 'bit', phonemes: ['b', 'i', 't'], stage: 1 },
  { id: 'fit', type: 'word', word: 'fit', phonemes: ['f', 'i', 't'], stage: 1 },
  { id: 'hit', type: 'word', word: 'hit', phonemes: ['h', 'i', 't'], stage: 1 },
  { id: 'dim', type: 'word', word: 'dim', phonemes: ['d', 'i', 'm'], stage: 1 },
  { id: 'him', type: 'word', word: 'him', phonemes: ['h', 'i', 'm'], stage: 1 },
  { id: 'fin', type: 'word', word: 'fin', phonemes: ['f', 'i', 'n'], stage: 1 },
  { id: 'bin', type: 'word', word: 'bin', phonemes: ['b', 'i', 'n'], stage: 1 },
  { id: 'win', type: 'word', word: 'win', phonemes: ['w', 'i', 'n'], stage: 1 },
  { id: 'tin', type: 'word', word: 'tin', phonemes: ['t', 'i', 'n'], stage: 1 },
  { id: 'cob', type: 'word', word: 'cob', phonemes: ['c', 'o', 'b'], stage: 1 },
  { id: 'job', type: 'word', word: 'job', phonemes: ['j', 'o', 'b'], stage: 1 },
  { id: 'mob', type: 'word', word: 'mob', phonemes: ['m', 'o', 'b'], stage: 1 },
  { id: 'rob', type: 'word', word: 'rob', phonemes: ['r', 'o', 'b'], stage: 1 },
  { id: 'sob', type: 'word', word: 'sob', phonemes: ['s', 'o', 'b'], stage: 1 },
];

// --- Stage 2: Initial Digraphs (40 words) ---
// Digraphs at the start: sh-, ch-, th-, wh-

const STAGE_2_WORDS: WordEntry[] = [
  { id: 'ship', type: 'word', word: 'ship', phonemes: ['sh', 'i', 'p'], stage: 2 },
  { id: 'shop', type: 'word', word: 'shop', phonemes: ['sh', 'o', 'p'], stage: 2 },
  { id: 'shin', type: 'word', word: 'shin', phonemes: ['sh', 'i', 'n'], stage: 2 },
  { id: 'shed', type: 'word', word: 'shed', phonemes: ['sh', 'e', 'd'], stage: 2 },
  { id: 'shell', type: 'word', word: 'shell', phonemes: ['sh', 'e', 'l'], stage: 2 },
  { id: 'shut', type: 'word', word: 'shut', phonemes: ['sh', 'u', 't'], stage: 2 },
  { id: 'shock', type: 'word', word: 'shock', phonemes: ['sh', 'o', 'ck'], stage: 2 },
  { id: 'shag', type: 'word', word: 'shag', phonemes: ['sh', 'a', 'g'], stage: 2 },
  { id: 'sham', type: 'word', word: 'sham', phonemes: ['sh', 'a', 'm'], stage: 2 },
  { id: 'shod', type: 'word', word: 'shod', phonemes: ['sh', 'o', 'd'], stage: 2 },
  { id: 'chat', type: 'word', word: 'chat', phonemes: ['ch', 'a', 't'], stage: 2 },
  { id: 'chin', type: 'word', word: 'chin', phonemes: ['ch', 'i', 'n'], stage: 2 },
  { id: 'chop', type: 'word', word: 'chop', phonemes: ['ch', 'o', 'p'], stage: 2 },
  { id: 'chip', type: 'word', word: 'chip', phonemes: ['ch', 'i', 'p'], stage: 2 },
  { id: 'chug', type: 'word', word: 'chug', phonemes: ['ch', 'u', 'g'], stage: 2 },
  { id: 'chap', type: 'word', word: 'chap', phonemes: ['ch', 'a', 'p'], stage: 2 },
  { id: 'check', type: 'word', word: 'check', phonemes: ['ch', 'e', 'ck'], stage: 2 },
  { id: 'chess', type: 'word', word: 'chess', phonemes: ['ch', 'e', 's'], stage: 2 },
  { id: 'chill', type: 'word', word: 'chill', phonemes: ['ch', 'i', 'l'], stage: 2 },
  { id: 'chum', type: 'word', word: 'chum', phonemes: ['ch', 'u', 'm'], stage: 2 },
  { id: 'thin', type: 'word', word: 'thin', phonemes: ['th', 'i', 'n'], stage: 2 },
  { id: 'them', type: 'word', word: 'them', phonemes: ['th', 'e', 'm'], stage: 2 },
  { id: 'then', type: 'word', word: 'then', phonemes: ['th', 'e', 'n'], stage: 2 },
  { id: 'that', type: 'word', word: 'that', phonemes: ['th', 'a', 't'], stage: 2 },
  { id: 'this', type: 'word', word: 'this', phonemes: ['th', 'i', 's'], stage: 2 },
  { id: 'thud', type: 'word', word: 'thud', phonemes: ['th', 'u', 'd'], stage: 2 },
  { id: 'thug', type: 'word', word: 'thug', phonemes: ['th', 'u', 'g'], stage: 2 },
  { id: 'thus', type: 'word', word: 'thus', phonemes: ['th', 'u', 's'], stage: 2 },
  { id: 'than', type: 'word', word: 'than', phonemes: ['th', 'a', 'n'], stage: 2 },
  { id: 'thaw', type: 'word', word: 'thaw', phonemes: ['th', 'aw'], stage: 2 },
  { id: 'when', type: 'word', word: 'when', phonemes: ['wh', 'e', 'n'], stage: 2 },
  { id: 'whip', type: 'word', word: 'whip', phonemes: ['wh', 'i', 'p'], stage: 2 },
  { id: 'whiz', type: 'word', word: 'whiz', phonemes: ['wh', 'i', 'z'], stage: 2 },
  { id: 'wham', type: 'word', word: 'wham', phonemes: ['wh', 'a', 'm'], stage: 2 },
  { id: 'what', type: 'word', word: 'what', phonemes: ['wh', 'o', 't'], stage: 2 },
  { id: 'whack', type: 'word', word: 'whack', phonemes: ['wh', 'a', 'ck'], stage: 2 },
  { id: 'which', type: 'word', word: 'which', phonemes: ['wh', 'i', 'ch'], stage: 2 },
  { id: 'whiff', type: 'word', word: 'whiff', phonemes: ['wh', 'i', 'f'], stage: 2 },
  { id: 'wheat', type: 'word', word: 'wheat', phonemes: ['wh', 'ee', 't'], stage: 2 },
  { id: 'while', type: 'word', word: 'while', phonemes: ['wh', 'i', 'l'], stage: 2 },
];

// --- Stage 3: Final Digraphs (40 words) ---
// Digraphs at the end: -ck, -ng, -sh, -th, -ch, -ll, -ss, -ff

const STAGE_3_WORDS: WordEntry[] = [
  { id: 'duck', type: 'word', word: 'duck', phonemes: ['d', 'u', 'ck'], stage: 3 },
  { id: 'kick', type: 'word', word: 'kick', phonemes: ['k', 'i', 'ck'], stage: 3 },
  { id: 'lock', type: 'word', word: 'lock', phonemes: ['l', 'o', 'ck'], stage: 3 },
  { id: 'rock', type: 'word', word: 'rock', phonemes: ['r', 'o', 'ck'], stage: 3 },
  { id: 'sock', type: 'word', word: 'sock', phonemes: ['s', 'o', 'ck'], stage: 3 },
  { id: 'tack', type: 'word', word: 'tack', phonemes: ['t', 'a', 'ck'], stage: 3 },
  { id: 'pack', type: 'word', word: 'pack', phonemes: ['p', 'a', 'ck'], stage: 3 },
  { id: 'neck', type: 'word', word: 'neck', phonemes: ['n', 'e', 'ck'], stage: 3 },
  { id: 'tick', type: 'word', word: 'tick', phonemes: ['t', 'i', 'ck'], stage: 3 },
  { id: 'pick', type: 'word', word: 'pick', phonemes: ['p', 'i', 'ck'], stage: 3 },
  { id: 'ring', type: 'word', word: 'ring', phonemes: ['r', 'i', 'ng'], stage: 3 },
  { id: 'king', type: 'word', word: 'king', phonemes: ['k', 'i', 'ng'], stage: 3 },
  { id: 'sing', type: 'word', word: 'sing', phonemes: ['s', 'i', 'ng'], stage: 3 },
  { id: 'wing', type: 'word', word: 'wing', phonemes: ['w', 'i', 'ng'], stage: 3 },
  { id: 'song', type: 'word', word: 'song', phonemes: ['s', 'o', 'ng'], stage: 3 },
  { id: 'long', type: 'word', word: 'long', phonemes: ['l', 'o', 'ng'], stage: 3 },
  { id: 'hung', type: 'word', word: 'hung', phonemes: ['h', 'u', 'ng'], stage: 3 },
  { id: 'lung', type: 'word', word: 'lung', phonemes: ['l', 'u', 'ng'], stage: 3 },
  { id: 'bang', type: 'word', word: 'bang', phonemes: ['b', 'a', 'ng'], stage: 3 },
  { id: 'gang', type: 'word', word: 'gang', phonemes: ['g', 'a', 'ng'], stage: 3 },
  { id: 'fish', type: 'word', word: 'fish', phonemes: ['f', 'i', 'sh'], stage: 3 },
  { id: 'dish', type: 'word', word: 'dish', phonemes: ['d', 'i', 'sh'], stage: 3 },
  { id: 'wish', type: 'word', word: 'wish', phonemes: ['w', 'i', 'sh'], stage: 3 },
  { id: 'rush', type: 'word', word: 'rush', phonemes: ['r', 'u', 'sh'], stage: 3 },
  { id: 'gush', type: 'word', word: 'gush', phonemes: ['g', 'u', 'sh'], stage: 3 },
  { id: 'hush', type: 'word', word: 'hush', phonemes: ['h', 'u', 'sh'], stage: 3 },
  { id: 'bash', type: 'word', word: 'bash', phonemes: ['b', 'a', 'sh'], stage: 3 },
  { id: 'cash', type: 'word', word: 'cash', phonemes: ['c', 'a', 'sh'], stage: 3 },
  { id: 'mash', type: 'word', word: 'mash', phonemes: ['m', 'a', 'sh'], stage: 3 },
  { id: 'rash', type: 'word', word: 'rash', phonemes: ['r', 'a', 'sh'], stage: 3 },
  { id: 'bath', type: 'word', word: 'bath', phonemes: ['b', 'a', 'th'], stage: 3 },
  { id: 'math', type: 'word', word: 'math', phonemes: ['m', 'a', 'th'], stage: 3 },
  { id: 'path', type: 'word', word: 'path', phonemes: ['p', 'a', 'th'], stage: 3 },
  { id: 'moth', type: 'word', word: 'moth', phonemes: ['m', 'o', 'th'], stage: 3 },
  { id: 'with', type: 'word', word: 'with', phonemes: ['w', 'i', 'th'], stage: 3 },
  { id: 'much', type: 'word', word: 'much', phonemes: ['m', 'u', 'ch'], stage: 3 },
  { id: 'such', type: 'word', word: 'such', phonemes: ['s', 'u', 'ch'], stage: 3 },
  { id: 'rich', type: 'word', word: 'rich', phonemes: ['r', 'i', 'ch'], stage: 3 },
  { id: 'each', type: 'word', word: 'each', phonemes: ['ee', 'ch'], stage: 3 },
  { id: 'inch', type: 'word', word: 'inch', phonemes: ['i', 'n', 'ch'], stage: 3 },
];

// --- Stage 4: Consonant Blends (40 words) ---
// Blends remain separate phonemes per PRD

const STAGE_4_WORDS: WordEntry[] = [
  { id: 'frog', type: 'word', word: 'frog', phonemes: ['f', 'r', 'o', 'g'], stage: 4 },
  { id: 'flag', type: 'word', word: 'flag', phonemes: ['f', 'l', 'a', 'g'], stage: 4 },
  { id: 'trap', type: 'word', word: 'trap', phonemes: ['t', 'r', 'a', 'p'], stage: 4 },
  { id: 'spin', type: 'word', word: 'spin', phonemes: ['s', 'p', 'i', 'n'], stage: 4 },
  { id: 'clap', type: 'word', word: 'clap', phonemes: ['c', 'l', 'a', 'p'], stage: 4 },
  { id: 'plug', type: 'word', word: 'plug', phonemes: ['p', 'l', 'u', 'g'], stage: 4 },
  { id: 'stop', type: 'word', word: 'stop', phonemes: ['s', 't', 'o', 'p'], stage: 4 },
  { id: 'grip', type: 'word', word: 'grip', phonemes: ['g', 'r', 'i', 'p'], stage: 4 },
  { id: 'drip', type: 'word', word: 'drip', phonemes: ['d', 'r', 'i', 'p'], stage: 4 },
  { id: 'drop', type: 'word', word: 'drop', phonemes: ['d', 'r', 'o', 'p'], stage: 4 },
  { id: 'drum', type: 'word', word: 'drum', phonemes: ['d', 'r', 'u', 'm'], stage: 4 },
  { id: 'trip', type: 'word', word: 'trip', phonemes: ['t', 'r', 'i', 'p'], stage: 4 },
  { id: 'trim', type: 'word', word: 'trim', phonemes: ['t', 'r', 'i', 'm'], stage: 4 },
  { id: 'trot', type: 'word', word: 'trot', phonemes: ['t', 'r', 'o', 't'], stage: 4 },
  { id: 'blob', type: 'word', word: 'blob', phonemes: ['b', 'l', 'o', 'b'], stage: 4 },
  { id: 'blot', type: 'word', word: 'blot', phonemes: ['b', 'l', 'o', 't'], stage: 4 },
  { id: 'club', type: 'word', word: 'club', phonemes: ['c', 'l', 'u', 'b'], stage: 4 },
  { id: 'clam', type: 'word', word: 'clam', phonemes: ['c', 'l', 'a', 'm'], stage: 4 },
  { id: 'clip', type: 'word', word: 'clip', phonemes: ['c', 'l', 'i', 'p'], stage: 4 },
  { id: 'clog', type: 'word', word: 'clog', phonemes: ['c', 'l', 'o', 'g'], stage: 4 },
  { id: 'flat', type: 'word', word: 'flat', phonemes: ['f', 'l', 'a', 't'], stage: 4 },
  { id: 'flip', type: 'word', word: 'flip', phonemes: ['f', 'l', 'i', 'p'], stage: 4 },
  { id: 'flop', type: 'word', word: 'flop', phonemes: ['f', 'l', 'o', 'p'], stage: 4 },
  { id: 'glad', type: 'word', word: 'glad', phonemes: ['g', 'l', 'a', 'd'], stage: 4 },
  { id: 'glen', type: 'word', word: 'glen', phonemes: ['g', 'l', 'e', 'n'], stage: 4 },
  { id: 'plod', type: 'word', word: 'plod', phonemes: ['p', 'l', 'o', 'd'], stage: 4 },
  { id: 'plan', type: 'word', word: 'plan', phonemes: ['p', 'l', 'a', 'n'], stage: 4 },
  { id: 'plop', type: 'word', word: 'plop', phonemes: ['p', 'l', 'o', 'p'], stage: 4 },
  { id: 'plum', type: 'word', word: 'plum', phonemes: ['p', 'l', 'u', 'm'], stage: 4 },
  { id: 'skit', type: 'word', word: 'skit', phonemes: ['s', 'k', 'i', 't'], stage: 4 },
  { id: 'skip', type: 'word', word: 'skip', phonemes: ['s', 'k', 'i', 'p'], stage: 4 },
  { id: 'slam', type: 'word', word: 'slam', phonemes: ['s', 'l', 'a', 'm'], stage: 4 },
  { id: 'slim', type: 'word', word: 'slim', phonemes: ['s', 'l', 'i', 'm'], stage: 4 },
  { id: 'slop', type: 'word', word: 'slop', phonemes: ['s', 'l', 'o', 'p'], stage: 4 },
  { id: 'slug', type: 'word', word: 'slug', phonemes: ['s', 'l', 'u', 'g'], stage: 4 },
  { id: 'snap', type: 'word', word: 'snap', phonemes: ['s', 'n', 'a', 'p'], stage: 4 },
  { id: 'snip', type: 'word', word: 'snip', phonemes: ['s', 'n', 'i', 'p'], stage: 4 },
  { id: 'spot', type: 'word', word: 'spot', phonemes: ['s', 'p', 'o', 't'], stage: 4 },
  { id: 'step', type: 'word', word: 'step', phonemes: ['s', 't', 'e', 'p'], stage: 4 },
  { id: 'stem', type: 'word', word: 'stem', phonemes: ['s', 't', 'e', 'm'], stage: 4 },
];

// --- Stage 5: Simple Sentences (20 sentences) ---

const STAGE_5_SENTENCES: SentenceEntry[] = [
  { id: 'the_cat_ran', type: 'sentence', text: 'The cat ran', tokens: ['the', 'cat', 'ran'], stage: 5 },
  { id: 'the_dog_sat', type: 'sentence', text: 'The dog sat', tokens: ['the', 'dog', 'sat'], stage: 5 },
  { id: 'the_ship_is_big', type: 'sentence', text: 'The ship is big', tokens: ['the', 'ship', 'is', 'big'], stage: 5 },
  { id: 'the_frog_can_hop', type: 'sentence', text: 'The frog can hop', tokens: ['the', 'frog', 'can', 'hop'], stage: 5 },
  { id: 'the_sun_is_hot', type: 'sentence', text: 'The sun is hot', tokens: ['the', 'sun', 'is', 'hot'], stage: 5 },
  { id: 'a_big_red_bus', type: 'sentence', text: 'A big red bus', tokens: ['a', 'big', 'red', 'bus'], stage: 5 },
  { id: 'the_fox_hid', type: 'sentence', text: 'The fox hid', tokens: ['the', 'fox', 'hid'], stage: 5 },
  { id: 'i_can_run_fast', type: 'sentence', text: 'I can run fast', tokens: ['i', 'can', 'run', 'fast'], stage: 5 },
  { id: 'the_fish_got_wet', type: 'sentence', text: 'The fish got wet', tokens: ['the', 'fish', 'got', 'wet'], stage: 5 },
  { id: 'a_fat_pig_sat', type: 'sentence', text: 'A fat pig sat', tokens: ['a', 'fat', 'pig', 'sat'], stage: 5 },
  { id: 'the_duck_can_swim', type: 'sentence', text: 'The duck can swim', tokens: ['the', 'duck', 'can', 'swim'], stage: 5 },
  { id: 'the_king_has_a_ring', type: 'sentence', text: 'The king has a ring', tokens: ['the', 'king', 'has', 'a', 'ring'], stage: 5 },
  { id: 'a_frog_on_a_log', type: 'sentence', text: 'A frog on a log', tokens: ['a', 'frog', 'on', 'a', 'log'], stage: 5 },
  { id: 'the_hen_is_in_the_pen', type: 'sentence', text: 'The hen is in the pen', tokens: ['the', 'hen', 'is', 'in', 'the', 'pen'], stage: 5 },
  { id: 'a_bug_on_the_rug', type: 'sentence', text: 'A bug on the rug', tokens: ['a', 'bug', 'on', 'the', 'rug'], stage: 5 },
  { id: 'the_man_had_a_map', type: 'sentence', text: 'The man had a map', tokens: ['the', 'man', 'had', 'a', 'map'], stage: 5 },
  { id: 'the_ship_can_rock', type: 'sentence', text: 'The ship can rock', tokens: ['the', 'ship', 'can', 'rock'], stage: 5 },
  { id: 'i_can_clap_and_sing', type: 'sentence', text: 'I can clap and sing', tokens: ['i', 'can', 'clap', 'and', 'sing'], stage: 5 },
  { id: 'the_crab_is_on_the_sand', type: 'sentence', text: 'The crab is on the sand', tokens: ['the', 'crab', 'is', 'on', 'the', 'sand'], stage: 5 },
  { id: 'a_thin_cat_sat_on_a_mat', type: 'sentence', text: 'A thin cat sat on a mat', tokens: ['a', 'thin', 'cat', 'sat', 'on', 'a', 'mat'], stage: 5 },
];

// ============================================================
// Combined dataset
// ============================================================

export const PHONEME_DATASET: PhonemeEntry[] = [
  ...STAGE_1_WORDS,
  ...STAGE_2_WORDS,
  ...STAGE_3_WORDS,
  ...STAGE_4_WORDS,
  ...STAGE_5_SENTENCES,
];

// ============================================================
// Legacy WORD_DATABASE (PhonemeBreakdown[]) for backward compat
// Maps the new WordEntry format back to the old PhonemeBreakdown
// ============================================================

export const WORD_DATABASE: PhonemeBreakdown[] = [
  ...STAGE_1_WORDS,
  ...STAGE_2_WORDS,
  ...STAGE_3_WORDS,
  ...STAGE_4_WORDS,
].map((entry) => ({
  word: entry.word,
  phonemes: entry.phonemes,
  level: entry.stage,
}));

// ============================================================
// Sound Manipulations (Stages 1-4, sentences excluded)
// ============================================================

export const SOUND_MANIPULATIONS: SoundManipulation[] = [
  // Stage 1 - CVC words: remove initial consonant
  { word: 'bat', remove: 'b', result: 'at', level: 1 },
  { word: 'cup', remove: 'c', result: 'up', level: 1 },
  { word: 'hat', remove: 'h', result: 'at', level: 1 },
  { word: 'sit', remove: 's', result: 'it', level: 1 },
  { word: 'tap', remove: 't', result: 'ap', level: 1 },
  { word: 'run', remove: 'r', result: 'un', level: 1 },
  { word: 'pen', remove: 'p', result: 'en', level: 1 },
  { word: 'jam', remove: 'j', result: 'am', level: 1 },
  { word: 'log', remove: 'l', result: 'og', level: 1 },
  { word: 'bed', remove: 'b', result: 'ed', level: 1 },
  { word: 'sun', remove: 's', result: 'un', level: 1 },
  { word: 'map', remove: 'm', result: 'ap', level: 1 },
  { word: 'dog', remove: 'd', result: 'og', level: 1 },
  { word: 'cat', remove: 'c', result: 'at', level: 1 },
  { word: 'pig', remove: 'p', result: 'ig', level: 1 },
  { word: 'red', remove: 'r', result: 'ed', level: 1 },
  { word: 'hot', remove: 'h', result: 'ot', level: 1 },
  { word: 'wet', remove: 'w', result: 'et', level: 1 },
  { word: 'fox', remove: 'f', result: 'ox', level: 1 },
  { word: 'box', remove: 'b', result: 'ox', level: 1 },
  { word: 'bus', remove: 'b', result: 'us', level: 1 },
  { word: 'hug', remove: 'h', result: 'ug', level: 1 },
  { word: 'nut', remove: 'n', result: 'ut', level: 1 },
  { word: 'cut', remove: 'c', result: 'ut', level: 1 },
  { word: 'mud', remove: 'm', result: 'ud', level: 1 },
  { word: 'fun', remove: 'f', result: 'un', level: 1 },
  { word: 'bun', remove: 'b', result: 'un', level: 1 },
  { word: 'mop', remove: 'm', result: 'op', level: 1 },
  { word: 'hop', remove: 'h', result: 'op', level: 1 },
  { word: 'pop', remove: 'p', result: 'op', level: 1 },
  { word: 'top', remove: 't', result: 'op', level: 1 },
  { word: 'lip', remove: 'l', result: 'ip', level: 1 },
  { word: 'tip', remove: 't', result: 'ip', level: 1 },
  { word: 'dip', remove: 'd', result: 'ip', level: 1 },
  { word: 'rip', remove: 'r', result: 'ip', level: 1 },
  { word: 'zip', remove: 'z', result: 'ip', level: 1 },
  { word: 'gap', remove: 'g', result: 'ap', level: 1 },
  { word: 'nap', remove: 'n', result: 'ap', level: 1 },
  { word: 'lap', remove: 'l', result: 'ap', level: 1 },
  { word: 'bit', remove: 'b', result: 'it', level: 1 },
  { word: 'fit', remove: 'f', result: 'it', level: 1 },
  { word: 'hit', remove: 'h', result: 'it', level: 1 },
  { word: 'fin', remove: 'f', result: 'in', level: 1 },
  { word: 'bin', remove: 'b', result: 'in', level: 1 },
  { word: 'win', remove: 'w', result: 'in', level: 1 },
  { word: 'tin', remove: 't', result: 'in', level: 1 },

  // Stage 2 - Initial digraphs: remove initial digraph
  { word: 'ship', remove: 'sh', result: 'ip', isRobotWord: true, level: 2 },
  { word: 'shop', remove: 'sh', result: 'op', level: 2 },
  { word: 'shin', remove: 'sh', result: 'in', level: 2 },
  { word: 'shed', remove: 'sh', result: 'ed', level: 2 },
  { word: 'shut', remove: 'sh', result: 'ut', level: 2 },
  { word: 'chat', remove: 'ch', result: 'at', level: 2 },
  { word: 'chin', remove: 'ch', result: 'in', level: 2 },
  { word: 'chop', remove: 'ch', result: 'op', level: 2 },
  { word: 'chip', remove: 'ch', result: 'ip', isRobotWord: true, level: 2 },
  { word: 'chug', remove: 'ch', result: 'ug', level: 2 },
  { word: 'chap', remove: 'ch', result: 'ap', level: 2 },
  { word: 'thin', remove: 'th', result: 'in', level: 2 },
  { word: 'them', remove: 'th', result: 'em', isRobotWord: true, level: 2 },
  { word: 'then', remove: 'th', result: 'en', level: 2 },
  { word: 'that', remove: 'th', result: 'at', level: 2 },
  { word: 'this', remove: 'th', result: 'is', level: 2 },
  { word: 'thud', remove: 'th', result: 'ud', isRobotWord: true, level: 2 },
  { word: 'whip', remove: 'wh', result: 'ip', isRobotWord: true, level: 2 },
  { word: 'whiz', remove: 'wh', result: 'iz', isRobotWord: true, level: 2 },
  { word: 'wham', remove: 'wh', result: 'am', level: 2 },

  // Stage 3 - Final digraphs: remove initial consonant
  { word: 'duck', remove: 'd', result: 'uck', level: 3 },
  { word: 'kick', remove: 'k', result: 'ick', level: 3 },
  { word: 'lock', remove: 'l', result: 'ock', level: 3 },
  { word: 'rock', remove: 'r', result: 'ock', level: 3 },
  { word: 'sock', remove: 's', result: 'ock', level: 3 },
  { word: 'tack', remove: 't', result: 'ack', level: 3 },
  { word: 'pack', remove: 'p', result: 'ack', level: 3 },
  { word: 'ring', remove: 'r', result: 'ing', level: 3 },
  { word: 'king', remove: 'k', result: 'ing', level: 3 },
  { word: 'sing', remove: 's', result: 'ing', level: 3 },
  { word: 'wing', remove: 'w', result: 'ing', level: 3 },
  { word: 'song', remove: 's', result: 'ong', isRobotWord: true, level: 3 },
  { word: 'long', remove: 'l', result: 'ong', isRobotWord: true, level: 3 },
  { word: 'bang', remove: 'b', result: 'ang', isRobotWord: true, level: 3 },
  { word: 'fish', remove: 'f', result: 'ish', level: 3 },
  { word: 'dish', remove: 'd', result: 'ish', level: 3 },
  { word: 'wish', remove: 'w', result: 'ish', level: 3 },
  { word: 'rush', remove: 'r', result: 'ush', level: 3 },
  { word: 'gush', remove: 'g', result: 'ush', level: 3 },
  { word: 'bash', remove: 'b', result: 'ash', level: 3 },
  { word: 'cash', remove: 'c', result: 'ash', level: 3 },
  { word: 'mash', remove: 'm', result: 'ash', level: 3 },
  { word: 'bath', remove: 'b', result: 'ath', isRobotWord: true, level: 3 },
  { word: 'math', remove: 'm', result: 'ath', isRobotWord: true, level: 3 },
  { word: 'path', remove: 'p', result: 'ath', isRobotWord: true, level: 3 },
  { word: 'rich', remove: 'r', result: 'ich', isRobotWord: true, level: 3 },
  { word: 'much', remove: 'm', result: 'uch', isRobotWord: true, level: 3 },
  { word: 'such', remove: 's', result: 'uch', isRobotWord: true, level: 3 },

  // Stage 4 - Consonant blends: remove initial consonant from blend
  { word: 'frog', remove: 'f', result: 'rog', isRobotWord: true, level: 4 },
  { word: 'flag', remove: 'f', result: 'lag', level: 4 },
  { word: 'trap', remove: 't', result: 'rap', level: 4 },
  { word: 'spin', remove: 's', result: 'pin', level: 4 },
  { word: 'clap', remove: 'c', result: 'lap', level: 4 },
  { word: 'plug', remove: 'p', result: 'lug', level: 4 },
  { word: 'stop', remove: 's', result: 'top', level: 4 },
  { word: 'grip', remove: 'g', result: 'rip', level: 4 },
  { word: 'drip', remove: 'd', result: 'rip', level: 4 },
  { word: 'drop', remove: 'd', result: 'rop', isRobotWord: true, level: 4 },
  { word: 'drum', remove: 'd', result: 'rum', level: 4 },
  { word: 'trip', remove: 't', result: 'rip', level: 4 },
  { word: 'trim', remove: 't', result: 'rim', level: 4 },
  { word: 'trot', remove: 't', result: 'rot', level: 4 },
  { word: 'blob', remove: 'b', result: 'lob', level: 4 },
  { word: 'blot', remove: 'b', result: 'lot', level: 4 },
  { word: 'club', remove: 'c', result: 'lub', isRobotWord: true, level: 4 },
  { word: 'clam', remove: 'c', result: 'lam', isRobotWord: true, level: 4 },
  { word: 'clip', remove: 'c', result: 'lip', level: 4 },
  { word: 'flat', remove: 'f', result: 'lat', isRobotWord: true, level: 4 },
  { word: 'flip', remove: 'f', result: 'lip', level: 4 },
  { word: 'flop', remove: 'f', result: 'lop', level: 4 },
  { word: 'glad', remove: 'g', result: 'lad', level: 4 },
  { word: 'plan', remove: 'p', result: 'lan', isRobotWord: true, level: 4 },
  { word: 'plop', remove: 'p', result: 'lop', level: 4 },
  { word: 'plum', remove: 'p', result: 'lum', isRobotWord: true, level: 4 },
  { word: 'slam', remove: 's', result: 'lam', isRobotWord: true, level: 4 },
  { word: 'slim', remove: 's', result: 'lim', isRobotWord: true, level: 4 },
  { word: 'snap', remove: 's', result: 'nap', level: 4 },
  { word: 'snip', remove: 's', result: 'nip', level: 4 },
  { word: 'spot', remove: 's', result: 'pot', level: 4 },
  { word: 'step', remove: 's', result: 'tep', isRobotWord: true, level: 4 },
];

// ============================================================
// Helper functions
// ============================================================

/** Get all word entries for a specific stage */
export function getWordsByLevel(level: 1 | 2 | 3 | 4 | 5): PhonemeBreakdown[] {
  return WORD_DATABASE.filter((w) => w.level === level);
}

/** Get all word entries (new format) for a stage */
export function getWordEntriesByStage(stage: 1 | 2 | 3 | 4 | 5): WordEntry[] {
  const stageWords: Record<number, WordEntry[]> = {
    1: STAGE_1_WORDS,
    2: STAGE_2_WORDS,
    3: STAGE_3_WORDS,
    4: STAGE_4_WORDS,
    5: [],
  };
  return stageWords[stage] ?? [];
}

/** Get sentence entries (Stage 5 only) */
export function getSentenceEntries(): SentenceEntry[] {
  return STAGE_5_SENTENCES;
}

/** Get all phoneme entries up to and including a stage */
export function getEntriesUpToStage(stage: 1 | 2 | 3 | 4 | 5): PhonemeEntry[] {
  return PHONEME_DATASET.filter((entry) => entry.stage <= stage);
}

/** Get all word entries (excluding sentences) up to and including a stage */
export function getWordEntriesUpToStage(stage: 1 | 2 | 3 | 4 | 5): WordEntry[] {
  return [
    ...STAGE_1_WORDS,
    ...STAGE_2_WORDS,
    ...STAGE_3_WORDS,
    ...STAGE_4_WORDS,
  ].filter((w) => w.stage <= stage);
}

/** Get all sound manipulations for a specific level */
export function getManipulationsByLevel(level: 1 | 2 | 3 | 4): SoundManipulation[] {
  return SOUND_MANIPULATIONS.filter((m) => m.level === level);
}

/** Get manipulations up to and including a level */
export function getManipulationsUpToLevel(level: 1 | 2 | 3 | 4): SoundManipulation[] {
  return SOUND_MANIPULATIONS.filter((m) => m.level <= level);
}

// ============================================================
// Emoji map — temporary visual stand-in for real illustrations
// ============================================================

export const WORD_EMOJI_MAP: Record<string, string> = {
  // Stage 1 — CVC words
  cat: '🐱', dog: '🐶', sun: '☀️', map: '🗺️', tap: '🚰', hat: '🎩',
  run: '🏃', sit: '🪑', cup: '☕', bed: '🛏️', pen: '🖊️', pig: '🐷',
  log: '🪵', jam: '🍓', bat: '🦇', red: '🔴', hot: '🔥', wet: '💧',
  fox: '🦊', box: '📦', mix: '🥣', fix: '🔧', bus: '🚌', hug: '🤗',
  nut: '🥜', cut: '✂️', mud: '🟤', fun: '🎉', bun: '🍞', dug: '⛏️',
  rug: '🧶', tug: '🪢', mop: '🧹', hop: '🐰', pop: '🎈', top: '🔝',
  lip: '👄', tip: '☝️', dip: '🫕', rip: '💥', zip: '🤐', gap: '🕳️',
  nap: '😴', lap: '🏁', sap: '🌳', kit: '🧰', bit: '🔹', fit: '💪',
  hit: '🥊', dim: '🌑', him: '👦', fin: '🦈', bin: '🗑️', win: '🏆',
  tin: '🥫', cob: '🌽', job: '👷', mob: '👥', rob: '🦹', sob: '😢',

  // Stage 2 — Initial digraphs
  ship: '🚢', shop: '🏪', shin: '🦵', shed: '🏚️', shell: '🐚',
  shut: '🚪', shock: '⚡', shag: '🧸', sham: '🎭', shod: '👞',
  chat: '💬', chin: '🧔', chop: '🪓', chip: '🍟', chug: '🚂',
  chap: '🤠', check: '✅', chess: '♟️', chill: '🧊', chum: '🤝',
  thin: '📏', them: '👫', then: '➡️', that: '👉', this: '👆',
  thud: '💢', thug: '😠', thus: '📌', than: '⚖️', thaw: '🫠',
  when: '🕐', whip: '🏇', whiz: '💨', wham: '💥', what: '❓',
  whack: '🏏', which: '🤔', whiff: '👃', wheat: '🌾', while: '⏳',

  // Stage 3 — Final digraphs
  duck: '🦆', kick: '🦶', lock: '🔒', rock: '🪨', sock: '🧦',
  tack: '📌', pack: '🎒', neck: '🦒', tick: '✔️', pick: '⛏️',
  ring: '💍', king: '👑', sing: '🎤', wing: '🪽', song: '🎵',
  long: '📏', hung: '🪝', lung: '🫁', bang: '💥', gang: '👥',
  fish: '🐟', dish: '🍽️', wish: '⭐', rush: '🏃‍♂️', gush: '🌊',
  hush: '🤫', bash: '🎊', cash: '💵', mash: '🥔', rash: '🔴',
  bath: '🛁', math: '🔢', path: '🛤️', moth: '🦋', with: '🤝',
  much: '📈', such: '✨', rich: '💰', each: '👐', inch: '📐',

  // Stage 4 — Consonant blends
  frog: '🐸', flag: '🚩', trap: '🪤', spin: '🌀', clap: '👏',
  plug: '🔌', stop: '🛑', grip: '✊', drip: '💧', drop: '⬇️',
  drum: '🥁', trip: '✈️', trim: '💇', trot: '🐴', blob: '🫧',
  blot: '🖋️', club: '🏌️', clam: '🦪', clip: '📎', clog: '🩴',
  flat: '🏠', flip: '🔄', flop: '🐠', glad: '😊', glen: '🏞️',
  plod: '🚶', plan: '📋', plop: '💦', plum: '🫐', skit: '🎭',
  skip: '⏭️', slam: '🚪', slim: '🤸', slop: '🍲', slug: '🐌',
  snap: '🫰', snip: '✂️', spot: '🔵', step: '👣', stem: '🌱',
};

/** Set of all real words in the dataset for robot word validation */
const ALL_REAL_WORDS = new Set(
  [...STAGE_1_WORDS, ...STAGE_2_WORDS, ...STAGE_3_WORDS, ...STAGE_4_WORDS].map((w) => w.word)
);

/** Check if a result string is a known real word */
export function isRealWord(word: string): boolean {
  return ALL_REAL_WORDS.has(word.toLowerCase());
}
