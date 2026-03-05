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

// --- Stage 1: CVC Words (60 words — all imageable nouns) ---

const STAGE_1_WORDS: WordEntry[] = [
  { id: 'cat', type: 'word', word: 'cat', phonemes: ['c', 'a', 't'], stage: 1 },
  { id: 'dog', type: 'word', word: 'dog', phonemes: ['d', 'o', 'g'], stage: 1 },
  { id: 'sun', type: 'word', word: 'sun', phonemes: ['s', 'u', 'n'], stage: 1 },
  { id: 'map', type: 'word', word: 'map', phonemes: ['m', 'a', 'p'], stage: 1 },
  { id: 'tap', type: 'word', word: 'tap', phonemes: ['t', 'a', 'p'], stage: 1 },
  { id: 'hat', type: 'word', word: 'hat', phonemes: ['h', 'a', 't'], stage: 1 },
  { id: 'cup', type: 'word', word: 'cup', phonemes: ['c', 'u', 'p'], stage: 1 },
  { id: 'bed', type: 'word', word: 'bed', phonemes: ['b', 'e', 'd'], stage: 1 },
  { id: 'pen', type: 'word', word: 'pen', phonemes: ['p', 'e', 'n'], stage: 1 },
  { id: 'pig', type: 'word', word: 'pig', phonemes: ['p', 'i', 'g'], stage: 1 },
  { id: 'log', type: 'word', word: 'log', phonemes: ['l', 'o', 'g'], stage: 1 },
  { id: 'jam', type: 'word', word: 'jam', phonemes: ['j', 'a', 'm'], stage: 1 },
  { id: 'bat', type: 'word', word: 'bat', phonemes: ['b', 'a', 't'], stage: 1 },
  { id: 'fox', type: 'word', word: 'fox', phonemes: ['f', 'o', 'x'], stage: 1 },
  { id: 'box', type: 'word', word: 'box', phonemes: ['b', 'o', 'x'], stage: 1 },
  { id: 'bus', type: 'word', word: 'bus', phonemes: ['b', 'u', 's'], stage: 1 },
  { id: 'nut', type: 'word', word: 'nut', phonemes: ['n', 'u', 't'], stage: 1 },
  { id: 'bun', type: 'word', word: 'bun', phonemes: ['b', 'u', 'n'], stage: 1 },
  { id: 'rug', type: 'word', word: 'rug', phonemes: ['r', 'u', 'g'], stage: 1 },
  { id: 'mop', type: 'word', word: 'mop', phonemes: ['m', 'o', 'p'], stage: 1 },
  { id: 'lip', type: 'word', word: 'lip', phonemes: ['l', 'i', 'p'], stage: 1 },
  { id: 'kit', type: 'word', word: 'kit', phonemes: ['k', 'i', 't'], stage: 1 },
  { id: 'fin', type: 'word', word: 'fin', phonemes: ['f', 'i', 'n'], stage: 1 },
  { id: 'bin', type: 'word', word: 'bin', phonemes: ['b', 'i', 'n'], stage: 1 },
  { id: 'tin', type: 'word', word: 'tin', phonemes: ['t', 'i', 'n'], stage: 1 },
  { id: 'cob', type: 'word', word: 'cob', phonemes: ['c', 'o', 'b'], stage: 1 },
  { id: 'mud', type: 'word', word: 'mud', phonemes: ['m', 'u', 'd'], stage: 1 },
  { id: 'gum', type: 'word', word: 'gum', phonemes: ['g', 'u', 'm'], stage: 1 },
  { id: 'web', type: 'word', word: 'web', phonemes: ['w', 'e', 'b'], stage: 1 },
  { id: 'pot', type: 'word', word: 'pot', phonemes: ['p', 'o', 't'], stage: 1 },
  { id: 'net', type: 'word', word: 'net', phonemes: ['n', 'e', 't'], stage: 1 },
  { id: 'wig', type: 'word', word: 'wig', phonemes: ['w', 'i', 'g'], stage: 1 },
  { id: 'bug', type: 'word', word: 'bug', phonemes: ['b', 'u', 'g'], stage: 1 },
  { id: 'hut', type: 'word', word: 'hut', phonemes: ['h', 'u', 't'], stage: 1 },
  { id: 'fan', type: 'word', word: 'fan', phonemes: ['f', 'a', 'n'], stage: 1 },
  { id: 'jug', type: 'word', word: 'jug', phonemes: ['j', 'u', 'g'], stage: 1 },
  { id: 'mug', type: 'word', word: 'mug', phonemes: ['m', 'u', 'g'], stage: 1 },
  { id: 'cot', type: 'word', word: 'cot', phonemes: ['c', 'o', 't'], stage: 1 },
  { id: 'pin', type: 'word', word: 'pin', phonemes: ['p', 'i', 'n'], stage: 1 },
  { id: 'yam', type: 'word', word: 'yam', phonemes: ['y', 'a', 'm'], stage: 1 },
  { id: 'ram', type: 'word', word: 'ram', phonemes: ['r', 'a', 'm'], stage: 1 },
  { id: 'cap', type: 'word', word: 'cap', phonemes: ['c', 'a', 'p'], stage: 1 },
  { id: 'van', type: 'word', word: 'van', phonemes: ['v', 'a', 'n'], stage: 1 },
  { id: 'pan', type: 'word', word: 'pan', phonemes: ['p', 'a', 'n'], stage: 1 },
  { id: 'ham', type: 'word', word: 'ham', phonemes: ['h', 'a', 'm'], stage: 1 },
  { id: 'bag', type: 'word', word: 'bag', phonemes: ['b', 'a', 'g'], stage: 1 },
  { id: 'tag', type: 'word', word: 'tag', phonemes: ['t', 'a', 'g'], stage: 1 },
  { id: 'rat', type: 'word', word: 'rat', phonemes: ['r', 'a', 't'], stage: 1 },
  { id: 'hen', type: 'word', word: 'hen', phonemes: ['h', 'e', 'n'], stage: 1 },
  { id: 'peg', type: 'word', word: 'peg', phonemes: ['p', 'e', 'g'], stage: 1 },
  { id: 'gem', type: 'word', word: 'gem', phonemes: ['g', 'e', 'm'], stage: 1 },
  { id: 'rod', type: 'word', word: 'rod', phonemes: ['r', 'o', 'd'], stage: 1 },
  { id: 'pod', type: 'word', word: 'pod', phonemes: ['p', 'o', 'd'], stage: 1 },
  { id: 'cab', type: 'word', word: 'cab', phonemes: ['c', 'a', 'b'], stage: 1 },
  { id: 'pup', type: 'word', word: 'pup', phonemes: ['p', 'u', 'p'], stage: 1 },
  { id: 'sub', type: 'word', word: 'sub', phonemes: ['s', 'u', 'b'], stage: 1 },
  { id: 'mat', type: 'word', word: 'mat', phonemes: ['m', 'a', 't'], stage: 1 },
  { id: 'top', type: 'word', word: 'top', phonemes: ['t', 'o', 'p'], stage: 1 },
  { id: 'zip', type: 'word', word: 'zip', phonemes: ['z', 'i', 'p'], stage: 1 },
  { id: 'egg', type: 'word', word: 'egg', phonemes: ['e', 'g'], stage: 1 },
];

// --- Stage 2: Initial Digraphs (25 words — all imageable nouns) ---
// Digraphs at the start: sh-, ch-, th-, wh-
// Note: th-/wh- have very few imageable nouns, so sh-/ch- are padded

const STAGE_2_WORDS: WordEntry[] = [
  // sh- words
  { id: 'ship', type: 'word', word: 'ship', phonemes: ['sh', 'i', 'p'], stage: 2 },
  { id: 'shop', type: 'word', word: 'shop', phonemes: ['sh', 'o', 'p'], stage: 2 },
  { id: 'shed', type: 'word', word: 'shed', phonemes: ['sh', 'e', 'd'], stage: 2 },
  { id: 'shell', type: 'word', word: 'shell', phonemes: ['sh', 'e', 'l'], stage: 2 },
  { id: 'shack', type: 'word', word: 'shack', phonemes: ['sh', 'a', 'ck'], stage: 2 },
  { id: 'shark', type: 'word', word: 'shark', phonemes: ['sh', 'ar', 'k'], stage: 2 },
  { id: 'shelf', type: 'word', word: 'shelf', phonemes: ['sh', 'e', 'l', 'f'], stage: 2 },
  // ch- words
  { id: 'chin', type: 'word', word: 'chin', phonemes: ['ch', 'i', 'n'], stage: 2 },
  { id: 'chip', type: 'word', word: 'chip', phonemes: ['ch', 'i', 'p'], stage: 2 },
  { id: 'chess', type: 'word', word: 'chess', phonemes: ['ch', 'e', 's'], stage: 2 },
  { id: 'chick', type: 'word', word: 'chick', phonemes: ['ch', 'i', 'ck'], stage: 2 },
  { id: 'chef', type: 'word', word: 'chef', phonemes: ['ch', 'e', 'f'], stage: 2 },
  { id: 'chest', type: 'word', word: 'chest', phonemes: ['ch', 'e', 's', 't'], stage: 2 },
  { id: 'chimp', type: 'word', word: 'chimp', phonemes: ['ch', 'i', 'm', 'p'], stage: 2 },
  { id: 'chunk', type: 'word', word: 'chunk', phonemes: ['ch', 'u', 'nk'], stage: 2 },
  // th- words (very few imageable nouns with this digraph)
  { id: 'thumb', type: 'word', word: 'thumb', phonemes: ['th', 'u', 'm'], stage: 2 },
  { id: 'thorn', type: 'word', word: 'thorn', phonemes: ['th', 'or', 'n'], stage: 2 },
  // wh- words
  { id: 'whip', type: 'word', word: 'whip', phonemes: ['wh', 'i', 'p'], stage: 2 },
  { id: 'wheat', type: 'word', word: 'wheat', phonemes: ['wh', 'ee', 't'], stage: 2 },
  { id: 'whisk', type: 'word', word: 'whisk', phonemes: ['wh', 'i', 'sk'], stage: 2 },
  { id: 'wheel', type: 'word', word: 'wheel', phonemes: ['wh', 'ee', 'l'], stage: 2 },
  { id: 'whale', type: 'word', word: 'whale', phonemes: ['wh', 'ai', 'l'], stage: 2 },
];

// --- Stage 3: Final Digraphs (35 words — all imageable nouns) ---
// Digraphs at the end: -ck, -ng, -sh, -th, -tch

const STAGE_3_WORDS: WordEntry[] = [
  // -ck words
  { id: 'duck', type: 'word', word: 'duck', phonemes: ['d', 'u', 'ck'], stage: 3 },
  { id: 'lock', type: 'word', word: 'lock', phonemes: ['l', 'o', 'ck'], stage: 3 },
  { id: 'rock', type: 'word', word: 'rock', phonemes: ['r', 'o', 'ck'], stage: 3 },
  { id: 'sock', type: 'word', word: 'sock', phonemes: ['s', 'o', 'ck'], stage: 3 },
  { id: 'pack', type: 'word', word: 'pack', phonemes: ['p', 'a', 'ck'], stage: 3 },
  { id: 'neck', type: 'word', word: 'neck', phonemes: ['n', 'e', 'ck'], stage: 3 },
  { id: 'wick', type: 'word', word: 'wick', phonemes: ['w', 'i', 'ck'], stage: 3 },
  { id: 'dock', type: 'word', word: 'dock', phonemes: ['d', 'o', 'ck'], stage: 3 },
  { id: 'deck', type: 'word', word: 'deck', phonemes: ['d', 'e', 'ck'], stage: 3 },
  { id: 'puck', type: 'word', word: 'puck', phonemes: ['p', 'u', 'ck'], stage: 3 },
  { id: 'sack', type: 'word', word: 'sack', phonemes: ['s', 'a', 'ck'], stage: 3 },
  { id: 'buck', type: 'word', word: 'buck', phonemes: ['b', 'u', 'ck'], stage: 3 },
  { id: 'rack', type: 'word', word: 'rack', phonemes: ['r', 'a', 'ck'], stage: 3 },
  // -ng words
  { id: 'ring', type: 'word', word: 'ring', phonemes: ['r', 'i', 'ng'], stage: 3 },
  { id: 'king', type: 'word', word: 'king', phonemes: ['k', 'i', 'ng'], stage: 3 },
  { id: 'wing', type: 'word', word: 'wing', phonemes: ['w', 'i', 'ng'], stage: 3 },
  { id: 'fang', type: 'word', word: 'fang', phonemes: ['f', 'a', 'ng'], stage: 3 },
  { id: 'gong', type: 'word', word: 'gong', phonemes: ['g', 'o', 'ng'], stage: 3 },
  // -sh words
  { id: 'fish', type: 'word', word: 'fish', phonemes: ['f', 'i', 'sh'], stage: 3 },
  { id: 'dish', type: 'word', word: 'dish', phonemes: ['d', 'i', 'sh'], stage: 3 },
  { id: 'bush', type: 'word', word: 'bush', phonemes: ['b', 'u', 'sh'], stage: 3 },
  { id: 'cash', type: 'word', word: 'cash', phonemes: ['c', 'a', 'sh'], stage: 3 },
  { id: 'mash', type: 'word', word: 'mash', phonemes: ['m', 'a', 'sh'], stage: 3 },
  { id: 'sash', type: 'word', word: 'sash', phonemes: ['s', 'a', 'sh'], stage: 3 },
  // -th words
  { id: 'bath', type: 'word', word: 'bath', phonemes: ['b', 'a', 'th'], stage: 3 },
  { id: 'path', type: 'word', word: 'path', phonemes: ['p', 'a', 'th'], stage: 3 },
  { id: 'moth', type: 'word', word: 'moth', phonemes: ['m', 'o', 'th'], stage: 3 },
  // -tch words
  { id: 'hutch', type: 'word', word: 'hutch', phonemes: ['h', 'u', 'tch'], stage: 3 },
  { id: 'patch', type: 'word', word: 'patch', phonemes: ['p', 'a', 'tch'], stage: 3 },
  { id: 'witch', type: 'word', word: 'witch', phonemes: ['w', 'i', 'tch'], stage: 3 },
  { id: 'watch', type: 'word', word: 'watch', phonemes: ['w', 'o', 'tch'], stage: 3 },
  { id: 'match', type: 'word', word: 'match', phonemes: ['m', 'a', 'tch'], stage: 3 },
  { id: 'hatch', type: 'word', word: 'hatch', phonemes: ['h', 'a', 'tch'], stage: 3 },
];

// --- Stage 4: Consonant Blends (28 words — all imageable nouns) ---
// Blends remain separate phonemes per PRD

const STAGE_4_WORDS: WordEntry[] = [
  // fr- / fl- blends
  { id: 'frog', type: 'word', word: 'frog', phonemes: ['f', 'r', 'o', 'g'], stage: 4 },
  { id: 'flag', type: 'word', word: 'flag', phonemes: ['f', 'l', 'a', 'g'], stage: 4 },
  // tr- blends
  { id: 'trap', type: 'word', word: 'trap', phonemes: ['t', 'r', 'a', 'p'], stage: 4 },
  { id: 'tram', type: 'word', word: 'tram', phonemes: ['t', 'r', 'a', 'm'], stage: 4 },
  // pl- blends
  { id: 'plug', type: 'word', word: 'plug', phonemes: ['p', 'l', 'u', 'g'], stage: 4 },
  { id: 'plum', type: 'word', word: 'plum', phonemes: ['p', 'l', 'u', 'm'], stage: 4 },
  // dr- blends
  { id: 'drop', type: 'word', word: 'drop', phonemes: ['d', 'r', 'o', 'p'], stage: 4 },
  { id: 'drum', type: 'word', word: 'drum', phonemes: ['d', 'r', 'u', 'm'], stage: 4 },
  { id: 'dress', type: 'word', word: 'dress', phonemes: ['d', 'r', 'e', 's'], stage: 4 },
  // cl- blends
  { id: 'clam', type: 'word', word: 'clam', phonemes: ['c', 'l', 'a', 'm'], stage: 4 },
  { id: 'clip', type: 'word', word: 'clip', phonemes: ['c', 'l', 'i', 'p'], stage: 4 },
  { id: 'clog', type: 'word', word: 'clog', phonemes: ['c', 'l', 'o', 'g'], stage: 4 },
  // cr- blends
  { id: 'crab', type: 'word', word: 'crab', phonemes: ['c', 'r', 'a', 'b'], stage: 4 },
  { id: 'crib', type: 'word', word: 'crib', phonemes: ['c', 'r', 'i', 'b'], stage: 4 },
  // pr- blends
  { id: 'pram', type: 'word', word: 'pram', phonemes: ['p', 'r', 'a', 'm'], stage: 4 },
  // gr- blends
  { id: 'grill', type: 'word', word: 'grill', phonemes: ['g', 'r', 'i', 'l'], stage: 4 },
  { id: 'grass', type: 'word', word: 'grass', phonemes: ['g', 'r', 'a', 's'], stage: 4 },
  // sl- blends
  { id: 'slug', type: 'word', word: 'slug', phonemes: ['s', 'l', 'u', 'g'], stage: 4 },
  { id: 'sled', type: 'word', word: 'sled', phonemes: ['s', 'l', 'e', 'd'], stage: 4 },
  // sp- blends
  { id: 'spot', type: 'word', word: 'spot', phonemes: ['s', 'p', 'o', 't'], stage: 4 },
  { id: 'spud', type: 'word', word: 'spud', phonemes: ['s', 'p', 'u', 'd'], stage: 4 },
  // st- blends
  { id: 'step', type: 'word', word: 'step', phonemes: ['s', 't', 'e', 'p'], stage: 4 },
  { id: 'stem', type: 'word', word: 'stem', phonemes: ['s', 't', 'e', 'm'], stage: 4 },
  { id: 'stag', type: 'word', word: 'stag', phonemes: ['s', 't', 'a', 'g'], stage: 4 },
  // sn- blends
  { id: 'snack', type: 'word', word: 'snack', phonemes: ['s', 'n', 'a', 'ck'], stage: 4 },
  // sw- blends
  { id: 'swan', type: 'word', word: 'swan', phonemes: ['s', 'w', 'a', 'n'], stage: 4 },
  // bl- blends
  { id: 'blob', type: 'word', word: 'blob', phonemes: ['b', 'l', 'o', 'b'], stage: 4 },
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
  { word: 'cat', remove: 'c', result: 'at', level: 1 },
  { word: 'dog', remove: 'd', result: 'og', level: 1 },
  { word: 'sun', remove: 's', result: 'un', level: 1 },
  { word: 'map', remove: 'm', result: 'ap', level: 1 },
  { word: 'tap', remove: 't', result: 'ap', level: 1 },
  { word: 'hat', remove: 'h', result: 'at', level: 1 },
  { word: 'cup', remove: 'c', result: 'up', level: 1 },
  { word: 'bed', remove: 'b', result: 'ed', level: 1 },
  { word: 'pen', remove: 'p', result: 'en', level: 1 },
  { word: 'pig', remove: 'p', result: 'ig', level: 1 },
  { word: 'log', remove: 'l', result: 'og', level: 1 },
  { word: 'jam', remove: 'j', result: 'am', level: 1 },
  { word: 'bat', remove: 'b', result: 'at', level: 1 },
  { word: 'fox', remove: 'f', result: 'ox', level: 1 },
  { word: 'box', remove: 'b', result: 'ox', level: 1 },
  { word: 'bus', remove: 'b', result: 'us', level: 1 },
  { word: 'nut', remove: 'n', result: 'ut', level: 1 },
  { word: 'bun', remove: 'b', result: 'un', level: 1 },
  { word: 'rug', remove: 'r', result: 'ug', level: 1 },
  { word: 'mop', remove: 'm', result: 'op', level: 1 },
  { word: 'lip', remove: 'l', result: 'ip', level: 1 },
  { word: 'kit', remove: 'k', result: 'it', level: 1 },
  { word: 'fin', remove: 'f', result: 'in', level: 1 },
  { word: 'bin', remove: 'b', result: 'in', level: 1 },
  { word: 'tin', remove: 't', result: 'in', level: 1 },
  { word: 'cob', remove: 'c', result: 'ob', level: 1 },
  { word: 'mud', remove: 'm', result: 'ud', level: 1 },
  { word: 'gum', remove: 'g', result: 'um', level: 1 },
  { word: 'web', remove: 'w', result: 'eb', level: 1 },
  { word: 'pot', remove: 'p', result: 'ot', level: 1 },
  { word: 'net', remove: 'n', result: 'et', level: 1 },
  { word: 'wig', remove: 'w', result: 'ig', level: 1 },
  { word: 'bug', remove: 'b', result: 'ug', level: 1 },
  { word: 'hut', remove: 'h', result: 'ut', level: 1 },
  { word: 'fan', remove: 'f', result: 'an', level: 1 },
  { word: 'jug', remove: 'j', result: 'ug', level: 1 },
  { word: 'mug', remove: 'm', result: 'ug', level: 1 },
  { word: 'cot', remove: 'c', result: 'ot', level: 1 },
  { word: 'pin', remove: 'p', result: 'in', level: 1 },
  { word: 'yam', remove: 'y', result: 'am', level: 1 },
  { word: 'ram', remove: 'r', result: 'am', level: 1 },
  { word: 'cap', remove: 'c', result: 'ap', level: 1 },
  { word: 'van', remove: 'v', result: 'an', level: 1 },
  { word: 'pan', remove: 'p', result: 'an', level: 1 },
  { word: 'ham', remove: 'h', result: 'am', level: 1 },
  { word: 'bag', remove: 'b', result: 'ag', level: 1 },
  { word: 'tag', remove: 't', result: 'ag', level: 1 },
  { word: 'rat', remove: 'r', result: 'at', level: 1 },
  { word: 'hen', remove: 'h', result: 'en', level: 1 },
  { word: 'peg', remove: 'p', result: 'eg', level: 1 },
  { word: 'gem', remove: 'g', result: 'em', level: 1 },
  { word: 'rod', remove: 'r', result: 'od', level: 1 },
  { word: 'pod', remove: 'p', result: 'od', level: 1 },
  { word: 'cab', remove: 'c', result: 'ab', level: 1 },
  { word: 'pup', remove: 'p', result: 'up', level: 1 },
  { word: 'sub', remove: 's', result: 'ub', level: 1 },
  { word: 'mat', remove: 'm', result: 'at', level: 1 },
  { word: 'top', remove: 't', result: 'op', level: 1 },
  { word: 'zip', remove: 'z', result: 'ip', level: 1 },

  // Stage 2 - Initial digraphs: remove initial digraph
  { word: 'ship', remove: 'sh', result: 'ip', level: 2 },
  { word: 'shop', remove: 'sh', result: 'op', level: 2 },
  { word: 'shed', remove: 'sh', result: 'ed', level: 2 },
  { word: 'shell', remove: 'sh', result: 'ell', level: 2 },
  { word: 'shack', remove: 'sh', result: 'ack', level: 2 },
  { word: 'chin', remove: 'ch', result: 'in', level: 2 },
  { word: 'chip', remove: 'ch', result: 'ip', level: 2 },
  { word: 'chess', remove: 'ch', result: 'ess', level: 2 },
  { word: 'chick', remove: 'ch', result: 'ick', level: 2 },
  { word: 'chest', remove: 'ch', result: 'est', level: 2 },
  { word: 'chimp', remove: 'ch', result: 'imp', level: 2 },
  { word: 'thumb', remove: 'th', result: 'umb', level: 2 },
  { word: 'whip', remove: 'wh', result: 'ip', level: 2 },
  { word: 'whisk', remove: 'wh', result: 'isk', level: 2 },

  // Stage 3 - Final digraphs: remove initial consonant
  { word: 'duck', remove: 'd', result: 'uck', level: 3 },
  { word: 'lock', remove: 'l', result: 'ock', level: 3 },
  { word: 'rock', remove: 'r', result: 'ock', level: 3 },
  { word: 'sock', remove: 's', result: 'ock', level: 3 },
  { word: 'pack', remove: 'p', result: 'ack', level: 3 },
  { word: 'neck', remove: 'n', result: 'eck', level: 3 },
  { word: 'wick', remove: 'w', result: 'ick', level: 3 },
  { word: 'dock', remove: 'd', result: 'ock', level: 3 },
  { word: 'deck', remove: 'd', result: 'eck', level: 3 },
  { word: 'puck', remove: 'p', result: 'uck', level: 3 },
  { word: 'sack', remove: 's', result: 'ack', level: 3 },
  { word: 'buck', remove: 'b', result: 'uck', level: 3 },
  { word: 'rack', remove: 'r', result: 'ack', level: 3 },
  { word: 'ring', remove: 'r', result: 'ing', level: 3 },
  { word: 'king', remove: 'k', result: 'ing', level: 3 },
  { word: 'wing', remove: 'w', result: 'ing', level: 3 },
  { word: 'fang', remove: 'f', result: 'ang', level: 3 },
  { word: 'gong', remove: 'g', result: 'ong', level: 3 },
  { word: 'fish', remove: 'f', result: 'ish', level: 3 },
  { word: 'dish', remove: 'd', result: 'ish', level: 3 },
  { word: 'bush', remove: 'b', result: 'ush', level: 3 },
  { word: 'cash', remove: 'c', result: 'ash', level: 3 },
  { word: 'mash', remove: 'm', result: 'ash', level: 3 },
  { word: 'sash', remove: 's', result: 'ash', level: 3 },
  { word: 'bath', remove: 'b', result: 'ath', level: 3 },
  { word: 'path', remove: 'p', result: 'ath', level: 3 },
  { word: 'moth', remove: 'm', result: 'oth', level: 3 },
  { word: 'patch', remove: 'p', result: 'atch', level: 3 },
  { word: 'match', remove: 'm', result: 'atch', level: 3 },
  { word: 'hatch', remove: 'h', result: 'atch', level: 3 },

  // Stage 4 - Consonant blends: remove initial consonant from blend
  { word: 'frog', remove: 'f', result: 'rog', level: 4 },
  { word: 'flag', remove: 'f', result: 'lag', level: 4 },
  { word: 'trap', remove: 't', result: 'rap', level: 4 },
  { word: 'tram', remove: 't', result: 'ram', level: 4 },
  { word: 'plug', remove: 'p', result: 'lug', level: 4 },
  { word: 'plum', remove: 'p', result: 'lum', level: 4 },
  { word: 'drop', remove: 'd', result: 'rop', level: 4 },
  { word: 'drum', remove: 'd', result: 'rum', level: 4 },
  { word: 'dress', remove: 'd', result: 'ress', level: 4 },
  { word: 'clam', remove: 'c', result: 'lam', level: 4 },
  { word: 'clip', remove: 'c', result: 'lip', level: 4 },
  { word: 'clog', remove: 'c', result: 'log', level: 4 },
  { word: 'crab', remove: 'c', result: 'rab', level: 4 },
  { word: 'crib', remove: 'c', result: 'rib', level: 4 },
  { word: 'pram', remove: 'p', result: 'ram', level: 4 },
  { word: 'grill', remove: 'g', result: 'rill', level: 4 },
  { word: 'grass', remove: 'g', result: 'rass', level: 4 },
  { word: 'slug', remove: 's', result: 'lug', level: 4 },
  { word: 'sled', remove: 's', result: 'led', level: 4 },
  { word: 'spot', remove: 's', result: 'pot', level: 4 },
  { word: 'spud', remove: 's', result: 'pud', level: 4 },
  { word: 'step', remove: 's', result: 'tep', level: 4 },
  { word: 'stem', remove: 's', result: 'tem', level: 4 },
  { word: 'stag', remove: 's', result: 'tag', level: 4 },
  { word: 'snack', remove: 's', result: 'nack', level: 4 },
  { word: 'swan', remove: 's', result: 'wan', level: 4 },
  { word: 'blob', remove: 'b', result: 'lob', level: 4 },
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
// Word image path helper — resolves to Noto Emoji SVGs
// ============================================================

/** Get the image path for a word's illustration in /images/words/ */
export function getWordImagePath(word: string): string {
  return `/images/words/${word}.svg`;
}

/** Set of all real words in the dataset for robot word validation */
const ALL_REAL_WORDS = new Set(
  [...STAGE_1_WORDS, ...STAGE_2_WORDS, ...STAGE_3_WORDS, ...STAGE_4_WORDS].map((w) => w.word)
);

/** Check if a result string is a known real word */
export function isRealWord(word: string): boolean {
  return ALL_REAL_WORDS.has(word.toLowerCase());
}
