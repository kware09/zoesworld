export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
export type WordMasteryStatus = 'new' | 'learning' | 'practiced' | 'mastered';
export type GameType = 'robot-talk' | 'sound-ninja' | 'word-explorer';
export type DecorationCategory = 'treehouse' | 'garden' | 'animals';

// Legacy interface kept for backward compatibility
export interface PhonemeBreakdown {
  word: string;
  phonemes: string[];
  level: DifficultyLevel;
}

// New dataset entry types per PRD
export interface WordEntry {
  id: string;
  type: 'word';
  word: string;
  phonemes: string[];
  stage: DifficultyLevel;
}

export interface SentenceEntry {
  id: string;
  type: 'sentence';
  text: string;
  tokens: string[];
  stage: DifficultyLevel;
}

export type PhonemeEntry = WordEntry | SentenceEntry;

export interface SoundManipulation {
  word: string;
  remove: string;
  result: string;
  isRobotWord?: boolean;
  level: DifficultyLevel;
}

export interface GameRound {
  targetWord: PhonemeBreakdown;
  options: string[];
  correctAnswer: string;
}

export interface SoundNinjaRound {
  manipulation: SoundManipulation;
  options: string[];
  correctAnswer: string;
}

export interface WordExplorerRound {
  targetWord: PhonemeBreakdown;
}

export interface SentenceRound {
  entry: SentenceEntry;
  options: string[];
  correctAnswer: string;
}

export interface GameResult {
  gameType: GameType;
  rounds: RoundResult[];
  starEarned: boolean;
  completedAt: string;
}

export interface RoundResult {
  word: string;
  correct: boolean;
  attempts: number;
}

export interface Session {
  id: string;
  startedAt: string;
  games: GameResult[];
  completed: boolean;
}

export interface PlayerState {
  totalStars: number;
  spentStars: number;
  sessionsCompleted: number;
  currentSessionId: string | null;
  currentDifficulty: DifficultyLevel;
  parentDifficultyOverride: DifficultyLevel | null;
  recentAttempts: AttemptRecord[];
}

export interface AttemptRecord {
  word: string;
  correct: boolean;
  timestamp: string;
  gameType: GameType;
}

export interface WordMastery {
  word: string;
  status: WordMasteryStatus;
  correctCount: number;
  totalAttempts: number;
  lastAttempted: string;
}

export interface Decoration {
  id: string;
  name: string;
  category: DecorationCategory;
  cost: number;
  unlocked: boolean;
  placed: boolean;
  emoji: string;
}

export interface ParentConfig {
  rewardSessionTarget: number;
  rewardDescription: string;
  rewardClaimed: boolean;
  maxDailyStars: number | null;
}

export interface Profile {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
}

export interface ProfileRegistry {
  profiles: Profile[];
  activeProfileId: string;
}
