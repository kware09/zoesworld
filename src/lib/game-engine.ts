import { PhonemeBreakdown, SoundManipulation, DifficultyLevel, WordMastery, WordMasteryStatus, AttemptRecord, SentenceEntry } from '@/lib/types';
import { WORD_DATABASE, SOUND_MANIPULATIONS, getWordEntriesUpToStage, getWordEntriesByStage, getSentenceEntries, getManipulationsUpToLevel } from '@/lib/word-data';
import {
  DIFFICULTY_WINDOW,
  STAGE_ADVANCE_WORD_THRESHOLD,
  STAGE_ADVANCE_SUCCESS_RATE,
  MAX_STAGE,
} from '@/lib/constants';

// ============================================================
// Word Selection — 70/20/10 Bucket Strategy (per PRD)
// ============================================================

/**
 * Select a word using the PRD's bucket strategy:
 *  70% familiar (practiced/mastered)
 *  20% learning (1+ attempts, not yet practiced)
 *  10% challenge (new/unseen from current stage)
 *
 * Falls back gracefully when buckets are empty.
 */
export function selectWord(
  level: DifficultyLevel,
  mastery: Record<string, WordMastery>,
  recentlyUsed: string[]
): PhonemeBreakdown {
  // For stage 5 (sentences), fall back to stage 4 words
  const wordStage = Math.min(level, 4) as 1 | 2 | 3 | 4;

  // Pool all words up to and including current stage
  const allWords = WORD_DATABASE.filter(w => w.level <= wordStage);

  // Categorize into buckets based on mastery
  const familiar: PhonemeBreakdown[] = [];
  const learning: PhonemeBreakdown[] = [];
  const challenge: PhonemeBreakdown[] = [];

  for (const word of allWords) {
    const m = mastery[word.word];
    if (!m || m.status === 'new') {
      // New words from current stage are "challenge", from previous stages also count
      challenge.push(word);
    } else if (m.status === 'learning') {
      learning.push(word);
    } else {
      // practiced or mastered
      familiar.push(word);
    }
  }

  // Filter out recently used from each bucket
  const filterRecent = (pool: PhonemeBreakdown[]) =>
    pool.filter(w => !recentlyUsed.includes(w.word));

  const familiarFiltered = filterRecent(familiar);
  const learningFiltered = filterRecent(learning);
  const challengeFiltered = filterRecent(challenge);

  // Pick a bucket using 70/20/10 distribution, with fallbacks
  const roll = Math.random();
  let pool: PhonemeBreakdown[];

  if (roll < 0.70) {
    pool = familiarFiltered.length > 0 ? familiarFiltered :
           learningFiltered.length > 0 ? learningFiltered :
           challengeFiltered;
  } else if (roll < 0.90) {
    pool = learningFiltered.length > 0 ? learningFiltered :
           challengeFiltered.length > 0 ? challengeFiltered :
           familiarFiltered;
  } else {
    pool = challengeFiltered.length > 0 ? challengeFiltered :
           learningFiltered.length > 0 ? learningFiltered :
           familiarFiltered;
  }

  // If all filtered pools empty (all recently used), use unfiltered
  if (pool.length === 0) {
    pool = allWords;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

// ============================================================
// Sound Manipulation Selection (same bucket strategy)
// ============================================================

export function selectManipulation(
  level: DifficultyLevel,
  mastery: Record<string, WordMastery>,
  recentlyUsed: string[]
): SoundManipulation {
  // Sound Ninja only goes up to stage 4 (no sentences)
  const manipLevel = Math.min(level, 4) as 1 | 2 | 3 | 4;
  const allManips = getManipulationsUpToLevel(manipLevel);

  const familiar: SoundManipulation[] = [];
  const learning: SoundManipulation[] = [];
  const challenge: SoundManipulation[] = [];

  for (const manip of allManips) {
    const m = mastery[manip.word];
    if (!m || m.status === 'new') {
      challenge.push(manip);
    } else if (m.status === 'learning') {
      learning.push(manip);
    } else {
      familiar.push(manip);
    }
  }

  const filterRecent = (pool: SoundManipulation[]) =>
    pool.filter(m => !recentlyUsed.includes(m.word));

  const familiarFiltered = filterRecent(familiar);
  const learningFiltered = filterRecent(learning);
  const challengeFiltered = filterRecent(challenge);

  const roll = Math.random();
  let pool: SoundManipulation[];

  if (roll < 0.70) {
    pool = familiarFiltered.length > 0 ? familiarFiltered :
           learningFiltered.length > 0 ? learningFiltered :
           challengeFiltered;
  } else if (roll < 0.90) {
    pool = learningFiltered.length > 0 ? learningFiltered :
           challengeFiltered.length > 0 ? challengeFiltered :
           familiarFiltered;
  } else {
    pool = challengeFiltered.length > 0 ? challengeFiltered :
           learningFiltered.length > 0 ? learningFiltered :
           familiarFiltered;
  }

  if (pool.length === 0) {
    pool = allManips;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

// ============================================================
// Sentence Selection (Stage 5)
// ============================================================

export function selectSentence(
  recentlyUsed: string[]
): SentenceEntry {
  const sentences = getSentenceEntries();
  const filtered = sentences.filter(s => !recentlyUsed.includes(s.id));
  const pool = filtered.length > 0 ? filtered : sentences;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ============================================================
// Distractor Generation
// ============================================================

/** Generate distractor options for Robot Talk (phoneme blending) */
export function generateBlendingOptions(
  target: PhonemeBreakdown,
  level: DifficultyLevel
): string[] {
  const others = WORD_DATABASE.filter(w => w.level <= level && w.word !== target.word);
  // Prefer words sharing phonemes with target for plausible distractors
  const sorted = others.sort((a, b) => {
    const aShared = a.phonemes.filter(p => target.phonemes.includes(p)).length;
    const bShared = b.phonemes.filter(p => target.phonemes.includes(p)).length;
    return bShared - aShared;
  });
  const distractors = sorted.slice(0, 2).map(w => w.word);
  while (distractors.length < 2) {
    const fallback = others[Math.floor(Math.random() * others.length)];
    if (fallback && !distractors.includes(fallback.word)) distractors.push(fallback.word);
  }
  return shuffleArray([target.word, ...distractors]);
}

/** Generate distractor options for sentence blending (Stage 5 Robot Talk) */
export function generateSentenceBlendingOptions(
  target: SentenceEntry
): string[] {
  const others = getSentenceEntries().filter(s => s.id !== target.id);
  const shuffled = shuffleArray(others);
  const distractors = shuffled.slice(0, 2).map(s => s.text);
  return shuffleArray([target.text, ...distractors]);
}

/** Generate options for Sound Ninja */
export function generateDeletionOptions(
  manipulation: SoundManipulation
): string[] {
  const correct = manipulation.result;
  const original = manipulation.word;
  // Generate a wrong answer: remove from the end instead
  const wrongRemoval = manipulation.word.slice(0, Math.max(1, manipulation.word.length - manipulation.remove.length));

  const options = [correct, original];
  if (wrongRemoval !== correct && wrongRemoval !== original) {
    options.push(wrongRemoval);
  } else {
    const other = SOUND_MANIPULATIONS.find(m => m.result !== correct && m.word !== original);
    options.push(other?.result ?? 'xx');
  }
  return shuffleArray(options);
}

// ============================================================
// Stage Advancement (replaces old evaluateDifficulty)
// ============================================================

/**
 * Determine if the player should advance to the next stage.
 * Criteria (per PRD):
 *  - 12+ words in current stage are practiced or mastered
 *  - ≥75% success rate across recent attempts
 */
export function shouldAdvanceStage(
  currentStage: DifficultyLevel,
  mastery: Record<string, WordMastery>,
  recentAttempts: AttemptRecord[]
): boolean {
  if (currentStage >= MAX_STAGE) return false;

  // Count practiced/mastered words in current stage
  const stageWords = currentStage <= 4
    ? getWordEntriesByStage(currentStage as 1 | 2 | 3 | 4 | 5)
    : getSentenceEntries();

  let qualifiedCount = 0;
  for (const entry of stageWords) {
    const wordId = 'word' in entry ? entry.word : entry.id;
    const m = mastery[wordId];
    if (m && (m.status === 'practiced' || m.status === 'mastered')) {
      qualifiedCount++;
    }
  }

  if (qualifiedCount < STAGE_ADVANCE_WORD_THRESHOLD) return false;

  // Check recent success rate
  const recent = recentAttempts.slice(-DIFFICULTY_WINDOW);
  if (recent.length < DIFFICULTY_WINDOW) return false;

  const successRate = recent.filter(a => a.correct).length / recent.length;
  return successRate >= STAGE_ADVANCE_SUCCESS_RATE;
}

/**
 * Legacy evaluateDifficulty — now wraps shouldAdvanceStage.
 * Kept for backward compatibility with GameContext.
 */
export function evaluateDifficulty(
  recentAttempts: AttemptRecord[],
  currentLevel: DifficultyLevel,
  parentOverride: DifficultyLevel | null,
  mastery?: Record<string, WordMastery>
): DifficultyLevel {
  if (parentOverride !== null) return parentOverride;

  // If mastery data provided, use new stage advancement
  if (mastery && shouldAdvanceStage(currentLevel, mastery, recentAttempts)) {
    return Math.min(currentLevel + 1, MAX_STAGE) as DifficultyLevel;
  }

  return currentLevel;
}

// ============================================================
// Utility
// ============================================================

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
