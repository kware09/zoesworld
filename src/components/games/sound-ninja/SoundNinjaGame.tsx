'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { selectManipulation, generateDeletionOptions } from '@/lib/game-engine';
import { ROUNDS_PER_GAME, ENCOURAGEMENT_MESSAGES } from '@/lib/constants';
import type { GameResult, RoundResult, SoundNinjaRound } from '@/lib/types';
import GameShell from '@/components/games/GameShell';
import AnswerOption from '@/components/games/AnswerOption';
import FeedbackOverlay from '@/components/games/FeedbackOverlay';

export default function SoundNinjaGame() {
  const router = useRouter();
  const { effectiveDifficulty, mastery, recordAttempt, completeGame } = useGame();
  const { playNinjaPrompt, stop } = useAudio();

  const [currentRound, setCurrentRound] = useState(0);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [currentNinjaRound, setCurrentNinjaRound] = useState<SoundNinjaRound | null>(null);
  const [answerStates, setAnswerStates] = useState<Record<string, 'default' | 'correct' | 'incorrect'>>({});
  const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const recentlyUsedWords = useRef<string[]>([]);
  const isGameComplete = useRef(false);
  const setupRoundRef = useRef<() => void>(() => {});

  // Set up a new round
  const setupRound = useCallback(() => {
    const manipulation = selectManipulation(effectiveDifficulty, mastery, recentlyUsedWords.current);
    recentlyUsedWords.current = [...recentlyUsedWords.current.slice(-4), manipulation.word];
    const options = generateDeletionOptions(manipulation);

    setCurrentNinjaRound({
      manipulation,
      options,
      correctAnswer: manipulation.result,
    });
    setAnswerStates(Object.fromEntries(options.map((o) => [o, 'default'])));
    setAttempts(0);

    // Auto-play: "Say {word} without the {phoneme sound}"
    playNinjaPrompt(manipulation.word, manipulation.remove);
  }, [effectiveDifficulty, mastery, playNinjaPrompt]);

  // Keep ref in sync so the effect below always calls the latest version
  setupRoundRef.current = setupRound;

  // Initialize first round on mount
  useEffect(() => {
    setupRoundRef.current();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = useCallback(
    (selectedWord: string) => {
      if (!currentNinjaRound || showFeedback) return;

      const isCorrect = selectedWord === currentNinjaRound.correctAnswer;
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      recordAttempt(currentNinjaRound.manipulation.word, isCorrect, 'sound-ninja');

      if (isCorrect) {
        setAnswerStates((prev) => ({ ...prev, [selectedWord]: 'correct' }));
        const message = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
        setShowFeedback({ type: 'correct', message });
      } else {
        setAnswerStates((prev) => ({ ...prev, [selectedWord]: 'incorrect' }));
        setShowFeedback({ type: 'incorrect', message: 'Try again!' });
      }
    },
    [currentNinjaRound, showFeedback, attempts, recordAttempt],
  );

  const handleDismissFeedback = useCallback(() => {
    if (!currentNinjaRound || !showFeedback) return;

    const wasCorrect = showFeedback.type === 'correct';
    setShowFeedback(null);

    if (wasCorrect) {
      const roundResult: RoundResult = {
        word: currentNinjaRound.manipulation.word,
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
            gameType: 'sound-ninja',
            rounds: newRounds,
            starEarned: true,
            completedAt: new Date().toISOString(),
          };
          completeGame(gameResult);
          router.push('/games/result?game=sound-ninja');
        }
      } else {
        setCurrentRound(nextRound);
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
  }, [currentNinjaRound, showFeedback, attempts, rounds, currentRound, completeGame, router]);

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
    if (currentNinjaRound) {
      playNinjaPrompt(currentNinjaRound.manipulation.word, currentNinjaRound.manipulation.remove);
    }
  }, [currentNinjaRound, playNinjaPrompt]);

  if (!currentNinjaRound) return null;

  const { word, remove, isRobotWord } = currentNinjaRound.manipulation;

  return (
    <>
      <GameShell
        character="ninja"
        currentRound={currentRound + 1}
        totalRounds={ROUNDS_PER_GAME}
        onPlaySound={handlePlaySound}
        promptArea={
          <div className="flex flex-col items-center gap-2">
            <p className="text-center font-display text-2xl sm:text-3xl font-semibold text-bark">
              Say{' '}
              <span className="text-sky">{word}</span>
              {' '}without the{' '}
              <span className="text-sunset">/{remove}/</span>
            </p>
            {isRobotWord && (
              <span className="inline-block rounded-full bg-lavender/30 px-3 py-1 text-xs font-display text-bark-light">
                🤖 The answer is a robot word!
              </span>
            )}
          </div>
        }
        answerArea={
          <div className="flex w-full max-w-md flex-col gap-3">
            {currentNinjaRound.options.map((option) => (
              <AnswerOption
                key={option}
                word={option}
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
