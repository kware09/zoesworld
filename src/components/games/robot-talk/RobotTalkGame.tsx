'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { selectWord, generateBlendingOptions, selectSentence, generateSentenceBlendingOptions } from '@/lib/game-engine';
import { ROUNDS_PER_GAME, ENCOURAGEMENT_MESSAGES } from '@/lib/constants';
import { WORD_EMOJI_MAP } from '@/lib/word-data';
import type { GameResult, RoundResult, GameRound, SentenceEntry } from '@/lib/types';
import GameShell from '@/components/games/GameShell';
import AnswerOption from '@/components/games/AnswerOption';
import PhonemeDisplay from '@/components/games/PhonemeDisplay';
import FeedbackOverlay from '@/components/games/FeedbackOverlay';

export default function RobotTalkGame() {
  const router = useRouter();
  const { effectiveDifficulty, mastery, recordAttempt, completeGame } = useGame();
  const { playPhonemes, stop } = useAudio();

  const [currentRound, setCurrentRound] = useState(0);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [currentGameRound, setCurrentGameRound] = useState<GameRound | null>(null);
  const [currentSentenceRound, setCurrentSentenceRound] = useState<{ entry: SentenceEntry; options: string[]; correctAnswer: string } | null>(null);
  const [answerStates, setAnswerStates] = useState<Record<string, 'default' | 'correct' | 'incorrect'>>({});
  const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const recentlyUsedWords = useRef<string[]>([]);
  const isGameComplete = useRef(false);
  const setupRoundRef = useRef<() => void>(() => {});
  const isSentenceMode = effectiveDifficulty === 5;

  // Set up a new round
  const setupRound = useCallback(() => {
    if (isSentenceMode) {
      // Stage 5: sentence blending
      const sentence = selectSentence(recentlyUsedWords.current);
      recentlyUsedWords.current = [...recentlyUsedWords.current.slice(-4), sentence.id];
      const options = generateSentenceBlendingOptions(sentence);

      setCurrentSentenceRound({ entry: sentence, options, correctAnswer: sentence.text });
      setCurrentGameRound(null);
      setAnswerStates(Object.fromEntries(options.map((o) => [o, 'default'])));
      setAttempts(0);

      // Play the token sequence like phonemes — slow and deliberate
      playPhonemes(sentence.tokens, 1000);
    } else {
      // Stages 1-4: word blending
      const targetWord = selectWord(effectiveDifficulty, mastery, recentlyUsedWords.current);
      recentlyUsedWords.current = [...recentlyUsedWords.current.slice(-4), targetWord.word];
      const options = generateBlendingOptions(targetWord, effectiveDifficulty);

      setCurrentGameRound({
        targetWord,
        options,
        correctAnswer: targetWord.word,
      });
      setCurrentSentenceRound(null);
      setAnswerStates(Object.fromEntries(options.map((o) => [o, 'default'])));
      setAttempts(0);

      // Auto-play the phoneme sequence — slow and deliberate for Robot Talk
      playPhonemes(targetWord.phonemes, 1000);
    }
  }, [effectiveDifficulty, mastery, playPhonemes, isSentenceMode]);

  // Keep ref in sync so the effect below always calls the latest version
  setupRoundRef.current = setupRound;

  // Initialize first round on mount
  useEffect(() => {
    setupRoundRef.current();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRound = currentGameRound || currentSentenceRound;
  const activeCorrectAnswer = currentGameRound?.correctAnswer ?? currentSentenceRound?.correctAnswer ?? '';
  const activeWordId = currentGameRound?.correctAnswer ?? currentSentenceRound?.entry.id ?? '';

  const handleAnswer = useCallback(
    (selectedWord: string) => {
      if (!activeRound || showFeedback) return;

      const isCorrect = selectedWord === activeCorrectAnswer;
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      recordAttempt(activeWordId, isCorrect, 'robot-talk');

      if (isCorrect) {
        setAnswerStates((prev) => ({ ...prev, [selectedWord]: 'correct' }));
        const message = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
        setShowFeedback({ type: 'correct', message });
      } else {
        setAnswerStates((prev) => ({ ...prev, [selectedWord]: 'incorrect' }));
        setShowFeedback({ type: 'incorrect', message: 'Try again!' });
      }
    },
    [activeRound, activeCorrectAnswer, activeWordId, showFeedback, attempts, recordAttempt],
  );

  const handleDismissFeedback = useCallback(() => {
    if (!activeRound || !showFeedback) return;

    const wasCorrect = showFeedback.type === 'correct';
    setShowFeedback(null);

    if (wasCorrect) {
      const roundResult: RoundResult = {
        word: activeWordId,
        correct: true,
        attempts: attempts,
      };

      const newRounds = [...rounds, roundResult];
      setRounds(newRounds);

      const nextRound = currentRound + 1;

      if (nextRound >= ROUNDS_PER_GAME) {
        // Game complete
        if (!isGameComplete.current) {
          isGameComplete.current = true;
          const gameResult: GameResult = {
            gameType: 'robot-talk',
            rounds: newRounds,
            starEarned: true,
            completedAt: new Date().toISOString(),
          };
          completeGame(gameResult);
          router.push('/games/result?game=robot-talk');
        }
      } else {
        setCurrentRound(nextRound);
        // setupRound will be triggered by the effect below
      }
    } else {
      // Incorrect: reset that option's state so child can try again
      setAnswerStates((prev) => {
        const reset = { ...prev };
        for (const key of Object.keys(reset)) {
          if (reset[key] === 'incorrect') {
            reset[key] = 'default';
          }
        }
        return reset;
      });
    }
  }, [activeRound, activeWordId, showFeedback, attempts, rounds, currentRound, completeGame, router]);

  // Set up new round ONLY when currentRound changes (not when setupRound ref updates)
  const isFirstRound = useRef(true);
  useEffect(() => {
    if (isFirstRound.current) {
      isFirstRound.current = false;
      return;
    }
    setupRoundRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound]);

  const handlePlaySound = useCallback(() => {
    if (currentGameRound) {
      playPhonemes(currentGameRound.targetWord.phonemes, 1000);
    } else if (currentSentenceRound) {
      playPhonemes(currentSentenceRound.entry.tokens, 1000);
    }
  }, [currentGameRound, currentSentenceRound, playPhonemes]);

  if (!currentGameRound && !currentSentenceRound) return null;

  const displayPhonemes = currentGameRound
    ? currentGameRound.targetWord.phonemes
    : currentSentenceRound!.entry.tokens;
  const displayOptions = currentGameRound
    ? currentGameRound.options
    : currentSentenceRound!.options;

  return (
    <>
      <GameShell
        character="robot"
        currentRound={currentRound + 1}
        totalRounds={ROUNDS_PER_GAME}
        onPlaySound={handlePlaySound}
        promptArea={
          <PhonemeDisplay phonemes={displayPhonemes} />
        }
        answerArea={
          <div className={`flex w-full max-w-lg gap-3 ${isSentenceMode ? 'flex-col' : 'flex-row justify-center'}`}>
            {displayOptions.map((option) => (
              <AnswerOption
                key={option}
                word={option}
                emoji={isSentenceMode ? undefined : WORD_EMOJI_MAP[option]}
                state={answerStates[option] ?? 'default'}
                onClick={() => handleAnswer(option)}
              />
            ))}
          </div>
        }
      />
      {showFeedback && (
        <FeedbackOverlay
          type={showFeedback.type}
          message={showFeedback.message}
          onDismiss={handleDismissFeedback}
        />
      )}
    </>
  );
}
