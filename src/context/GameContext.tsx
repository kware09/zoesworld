'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import type {
  PlayerState,
  ParentConfig,
  WordMastery,
  Session,
  GameResult,
  GameType,
  DifficultyLevel,
  AttemptRecord,
} from '@/lib/types';
import {
  GAMES_PER_SESSION,
  MASTERY_PRACTICED_THRESHOLD,
  MASTERY_MASTERED_THRESHOLD,
  DIFFICULTY_WINDOW,
  MAX_STAGE,
  STAGE_ADVANCE_WORD_THRESHOLD,
  STAGE_ADVANCE_SUCCESS_RATE,
} from '@/lib/constants';
import { getWordEntriesByStage, getSentenceEntries } from '@/lib/word-data';
import {
  loadState,
  saveState,
  clearProfileData,
  GLOBAL_KEYS,
  type ProfileKeys,
} from '@/lib/storage';

// --- Default values ---

const DEFAULT_PLAYER: PlayerState = {
  totalStars: 0,
  spentStars: 0,
  sessionsCompleted: 0,
  currentSessionId: null,
  currentDifficulty: 1,
  parentDifficultyOverride: null,
  recentAttempts: [],
};

const DEFAULT_PARENT_CONFIG: ParentConfig = {
  rewardSessionTarget: 5,
  rewardDescription: 'Special treat!',
  rewardClaimed: false,
  maxDailyStars: null,
};

// --- Context interface ---

interface GameContextValue {
  player: PlayerState;
  currentSession: Session | null;
  mastery: Record<string, WordMastery>;
  parentConfig: ParentConfig;

  // Session
  startSession: () => void;
  completeGame: (result: GameResult) => void;
  endSession: () => void;
  gamesRemainingInSession: number;

  // Stars
  availableStars: number;
  earnStar: () => void;
  spendStars: (amount: number) => boolean;

  // Mastery
  recordAttempt: (word: string, correct: boolean, gameType: GameType) => void;

  // Difficulty
  effectiveDifficulty: DifficultyLevel;

  // Parent config
  updateParentConfig: (config: Partial<ParentConfig>) => void;
  setDifficultyOverride: (level: DifficultyLevel | null) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export function GameProvider({ children, profileKeys }: { children: React.ReactNode; profileKeys: ProfileKeys }) {
  const [player, setPlayer] = useState<PlayerState>(DEFAULT_PLAYER);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [mastery, setMastery] = useState<Record<string, WordMastery>>({});
  const [parentConfig, setParentConfig] = useState<ParentConfig>(DEFAULT_PARENT_CONFIG);
  const [hydrated, setHydrated] = useState(false);
  const masteryRef = useRef(mastery);

  // Keep mastery ref in sync for use inside setState callbacks
  useEffect(() => {
    masteryRef.current = mastery;
  }, [mastery]);

  // Load state from API/localStorage on mount
  useEffect(() => {
    async function hydrate() {
      const savedPlayer = await loadState<PlayerState>(profileKeys.PLAYER, DEFAULT_PLAYER);
      const savedSession = await loadState<Session | null>(profileKeys.CURRENT_SESSION, null);
      const savedMastery = await loadState<Record<string, WordMastery>>(profileKeys.MASTERY, {});
      const savedParentConfig = await loadState<ParentConfig>(GLOBAL_KEYS.PARENT_CONFIG, DEFAULT_PARENT_CONFIG);

      setPlayer(savedPlayer);
      setCurrentSession(savedSession);
      setMastery(savedMastery);
      setParentConfig(savedParentConfig);
      setHydrated(true);
    }
    hydrate();
  }, [profileKeys]);

  // Persist all state in a single effect to reduce render-cycle overhead
  useEffect(() => {
    if (!hydrated) return;
    saveState(profileKeys.PLAYER, player);
    saveState(profileKeys.CURRENT_SESSION, currentSession);
    saveState(profileKeys.MASTERY, mastery);
    saveState(GLOBAL_KEYS.PARENT_CONFIG, parentConfig);
  }, [player, currentSession, mastery, parentConfig, hydrated, profileKeys]);

  // --- Session ---

  const startSession = useCallback(() => {
    const id = Date.now().toString();
    const newSession: Session = {
      id,
      startedAt: new Date().toISOString(),
      games: [],
      completed: false,
    };
    setCurrentSession(newSession);
    setPlayer((prev) => ({ ...prev, currentSessionId: id }));
  }, []);

  const completeGame = useCallback((result: GameResult) => {
    setCurrentSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        games: [...prev.games, result],
      };
    });
    if (result.starEarned) {
      setPlayer((prev) => ({
        ...prev,
        totalStars: prev.totalStars + 1,
      }));
    }
  }, []);

  const endSession = useCallback(() => {
    setCurrentSession((prev) => {
      if (!prev) return prev;
      return { ...prev, completed: true };
    });
    setPlayer((prev) => ({
      ...prev,
      sessionsCompleted: prev.sessionsCompleted + 1,
      currentSessionId: null,
    }));
    // Clear the current session after marking it complete
    // Use a small delay so the completed flag persists first
    setTimeout(() => {
      setCurrentSession(null);
    }, 0);
  }, []);

  const gamesRemainingInSession = useMemo(() => {
    if (!currentSession) return GAMES_PER_SESSION;
    return GAMES_PER_SESSION - currentSession.games.length;
  }, [currentSession]);

  // --- Stars ---

  const availableStars = useMemo(
    () => player.totalStars - player.spentStars,
    [player.totalStars, player.spentStars]
  );

  const earnStar = useCallback(() => {
    setPlayer((prev) => ({
      ...prev,
      totalStars: prev.totalStars + 1,
    }));
  }, []);

  const spendStars = useCallback(
    (amount: number): boolean => {
      if (availableStars < amount) return false;
      setPlayer((prev) => ({
        ...prev,
        spentStars: prev.spentStars + amount,
      }));
      return true;
    },
    [availableStars]
  );

  // --- Mastery ---

  const recordAttempt = useCallback(
    (word: string, correct: boolean, gameType: GameType) => {
      // Update word mastery
      setMastery((prev) => {
        const existing = prev[word] ?? {
          word,
          status: 'new' as const,
          correctCount: 0,
          totalAttempts: 0,
          lastAttempted: new Date().toISOString(),
        };

        const newCorrectCount = existing.correctCount + (correct ? 1 : 0);
        const newTotalAttempts = existing.totalAttempts + 1;

        let status = existing.status;
        if (newCorrectCount >= MASTERY_MASTERED_THRESHOLD) {
          status = 'mastered';
        } else if (newCorrectCount >= MASTERY_PRACTICED_THRESHOLD) {
          status = 'practiced';
        } else if (newTotalAttempts > 0) {
          status = 'learning';
        }

        return {
          ...prev,
          [word]: {
            word,
            status,
            correctCount: newCorrectCount,
            totalAttempts: newTotalAttempts,
            lastAttempted: new Date().toISOString(),
          },
        };
      });

      // Add to recent attempts and check stage advancement
      const attempt: AttemptRecord = {
        word,
        correct,
        timestamp: new Date().toISOString(),
        gameType,
      };
      setPlayer((prev) => {
        const newAttempts = [...prev.recentAttempts, attempt].slice(-DIFFICULTY_WINDOW);

        // Stage advancement: check if player should move to next stage
        let newDifficulty = prev.currentDifficulty;
        if (prev.parentDifficultyOverride === null && newAttempts.length >= DIFFICULTY_WINDOW) {
          // Count practiced/mastered words in current stage
          const stageWords = prev.currentDifficulty <= 4
            ? getWordEntriesByStage(prev.currentDifficulty as 1 | 2 | 3 | 4 | 5)
            : getSentenceEntries();

          // We need current mastery state - use a callback to read latest
          // Note: masteryRef captures current mastery at time of recordAttempt call
          let qualifiedCount = 0;
          for (const entry of stageWords) {
            const wordId = 'word' in entry ? entry.word : entry.id;
            const m = masteryRef.current[wordId];
            if (m && (m.status === 'practiced' || m.status === 'mastered')) {
              qualifiedCount++;
            }
          }

          if (qualifiedCount >= STAGE_ADVANCE_WORD_THRESHOLD && prev.currentDifficulty < MAX_STAGE) {
            const successRate = newAttempts.filter((a) => a.correct).length / newAttempts.length;
            if (successRate >= STAGE_ADVANCE_SUCCESS_RATE) {
              newDifficulty = (prev.currentDifficulty + 1) as DifficultyLevel;
            }
          }
        }

        return {
          ...prev,
          recentAttempts: newAttempts,
          currentDifficulty: newDifficulty,
        };
      });
    },
    []
  );

  // --- Difficulty ---

  const effectiveDifficulty: DifficultyLevel = useMemo(() => {
    if (player.parentDifficultyOverride !== null) {
      return player.parentDifficultyOverride;
    }
    // Stage advancement is computed inside recordAttempt;
    // effectiveDifficulty simply reflects the current stored stage.
    return player.currentDifficulty;
  }, [player.parentDifficultyOverride, player.currentDifficulty]);

  // Sync computed difficulty back to player state (only when recording attempts)
  // Removed the useEffect that caused a render loop: effectiveDifficulty change
  // → setPlayer → player change → re-render → repeat. Instead, difficulty is
  // synced lazily inside recordAttempt.

  // --- Parent config ---

  const updateParentConfig = useCallback((config: Partial<ParentConfig>) => {
    setParentConfig((prev) => ({ ...prev, ...config }));
    // If parent sets a difficulty override, apply it to player state too
    if (config.rewardSessionTarget !== undefined || config.rewardDescription !== undefined) {
      // Only updating parent config fields, not difficulty
    }
  }, []);

  const setDifficultyOverride = useCallback((level: DifficultyLevel | null) => {
    setPlayer((prev) => ({
      ...prev,
      parentDifficultyOverride: level,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    // Extract profile ID from the namespaced key (e.g. "zw_zoe_player" -> "zoe")
    const match = profileKeys.PLAYER.match(/^zw_(.+)_player$/);
    if (match) {
      clearProfileData(match[1]);
    }
    setPlayer(DEFAULT_PLAYER);
    setCurrentSession(null);
    setMastery({});
    setParentConfig(DEFAULT_PARENT_CONFIG);
  }, [profileKeys]);

  // --- Context value ---

  const value: GameContextValue = useMemo(
    () => ({
      player,
      currentSession,
      mastery,
      parentConfig,
      startSession,
      completeGame,
      endSession,
      gamesRemainingInSession,
      availableStars,
      earnStar,
      spendStars,
      recordAttempt,
      effectiveDifficulty,
      updateParentConfig,
      setDifficultyOverride,
      resetProgress,
    }),
    [
      player,
      currentSession,
      mastery,
      parentConfig,
      startSession,
      completeGame,
      endSession,
      gamesRemainingInSession,
      availableStars,
      earnStar,
      spendStars,
      recordAttempt,
      effectiveDifficulty,
      updateParentConfig,
      setDifficultyOverride,
      resetProgress,
    ]
  );

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
