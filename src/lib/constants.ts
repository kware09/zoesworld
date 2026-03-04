export const ROUNDS_PER_GAME = 5;
export const GAMES_PER_SESSION = 3;
export const STAR_COST_DECORATION = 3;
export const STAR_COST_ANIMAL = 10;
export const MASTERY_PRACTICED_THRESHOLD = 3;
export const MASTERY_MASTERED_THRESHOLD = 5;
export const DIFFICULTY_WINDOW = 10;
export const DIFFICULTY_UP_THRESHOLD = 0.8;
export const DIFFICULTY_DOWN_THRESHOLD = 0.5;

// Stage advancement thresholds (per PRD)
export const STAGE_ADVANCE_WORD_THRESHOLD = 12; // 12+ words practiced/mastered to advance
export const STAGE_ADVANCE_SUCCESS_RATE = 0.75; // ≥75% success rate across recent attempts
export const MAX_STAGE = 5;
export const DEFAULT_REWARD_SESSION_TARGET = 5;

export const ENCOURAGEMENT_MESSAGES = [
  "Great job!",
  "Amazing!",
  "You did it!",
  "Wonderful!",
  "Super star!",
  "Well done!",
  "Brilliant!",
  "Fantastic!",
];

export const GAME_INFO = {
  'robot-talk': {
    title: 'Robot Talk',
    description: 'Blend the sounds',
    emoji: '🤖',
    color: 'sky',
  },
  'sound-ninja': {
    title: 'Sound Ninja',
    description: 'Chop off the first sound',
    emoji: '🥷',
    color: 'lavender',
  },
  'word-explorer': {
    title: 'Word Explorer',
    description: 'Read the word to explore',
    emoji: '🗺️',
    color: 'meadow',
  },
} as const;

// Default decorations available for purchase
export const DEFAULT_DECORATIONS: Array<{
  id: string;
  name: string;
  category: 'treehouse' | 'garden' | 'animals';
  cost: number;
  emoji: string;
}> = [
  // Treehouse (cost: 3 stars each)
  { id: 'curtains', name: 'Pretty Curtains', category: 'treehouse', cost: 3, emoji: '🪟' },
  { id: 'lamp', name: 'Cozy Lamp', category: 'treehouse', cost: 3, emoji: '💡' },
  { id: 'bookshelf', name: 'Bookshelf', category: 'treehouse', cost: 3, emoji: '📚' },
  { id: 'rug', name: 'Soft Rug', category: 'treehouse', cost: 3, emoji: '🟫' },
  { id: 'painting', name: 'Wall Painting', category: 'treehouse', cost: 3, emoji: '🖼️' },
  // Garden (cost: 3 stars each)
  { id: 'sunflower', name: 'Sunflower', category: 'garden', cost: 3, emoji: '🌻' },
  { id: 'tulip', name: 'Tulips', category: 'garden', cost: 3, emoji: '🌷' },
  { id: 'butterfly', name: 'Butterfly', category: 'garden', cost: 3, emoji: '🦋' },
  { id: 'mushroom', name: 'Mushroom', category: 'garden', cost: 3, emoji: '🍄' },
  { id: 'rainbow', name: 'Rainbow', category: 'garden', cost: 3, emoji: '🌈' },
  // Animals (cost: 10 stars each)
  { id: 'fox', name: 'Friendly Fox', category: 'animals', cost: 10, emoji: '🦊' },
  { id: 'owl', name: 'Wise Owl', category: 'animals', cost: 10, emoji: '🦉' },
  { id: 'rabbit', name: 'Bunny', category: 'animals', cost: 10, emoji: '🐰' },
  { id: 'deer', name: 'Gentle Deer', category: 'animals', cost: 10, emoji: '🦌' },
];
