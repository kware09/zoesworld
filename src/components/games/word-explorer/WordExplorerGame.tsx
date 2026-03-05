'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { useAudio } from '@/hooks/useAudio';
import { selectWord, selectSentence } from '@/lib/game-engine';
import { ROUNDS_PER_GAME, ENCOURAGEMENT_MESSAGES } from '@/lib/constants';
import type { PhonemeBreakdown, RoundResult, GameResult, SentenceEntry } from '@/lib/types';
import GameShell from '@/components/games/GameShell';
import FeedbackOverlay from '@/components/games/FeedbackOverlay';

export default function WordExplorerGame() {
  const router = useRouter();
  const { effectiveDifficulty, mastery, recordAttempt, completeGame } = useGame();
  const { playPhonemes, playWord } = useAudio();

  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState<RoundResult[]>([]);
  const [currentWord, setCurrentWord] = useState<PhonemeBreakdown | null>(null);
  const [currentSentence, setCurrentSentence] = useState<SentenceEntry | null>(null);
  const [activatedPhonemes, setActivatedPhonemes] = useState<number[]>([]);
  const [showBlendResult, setShowBlendResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const recentlyUsedWords = useRef<string[]>([]);
  const isAdvancing = useRef(false);
  const masteryRef = useRef(mastery);
  masteryRef.current = mastery;
  const isSentenceMode = effectiveDifficulty === 5;

  // Pick a new word/sentence for the current round
  const pickWord = useCallback(() => {
    if (isSentenceMode) {
      const sentence = selectSentence(recentlyUsedWords.current);
      recentlyUsedWords.current = [...recentlyUsedWords.current.slice(-9), sentence.id];
      setCurrentSentence(sentence);
      setCurrentWord(null);
    } else {
      const word = selectWord(effectiveDifficulty, masteryRef.current, recentlyUsedWords.current);
      recentlyUsedWords.current = [...recentlyUsedWords.current.slice(-9), word.word];
      setCurrentWord(word);
      setCurrentSentence(null);
    }
    setActivatedPhonemes([]);
    setShowBlendResult(false);
    setShowFeedback(false);
    isAdvancing.current = false;
  }, [effectiveDifficulty, isSentenceMode]);

  // Pick word on mount and when round changes
  useEffect(() => {
    pickWord();
  }, [currentRound, pickWord]);

  // Derive tiles and display text for both modes
  const tiles = currentWord ? currentWord.phonemes : currentSentence ? currentSentence.tokens : [];
  const blendedText = currentWord ? currentWord.word : currentSentence ? currentSentence.text : '';
  const wordId = currentWord ? currentWord.word : currentSentence ? currentSentence.id : '';

  // Handle phoneme/token tap
  const handlePhonemeTap = useCallback(
    (index: number) => {
      if ((!currentWord && !currentSentence) || showBlendResult || isAdvancing.current) return;

      const nextExpected = activatedPhonemes.length;

      if (index === nextExpected) {
        // Correct next tile
        const newActivated = [...activatedPhonemes, index];
        setActivatedPhonemes(newActivated);
        playPhonemes([tiles[index]]);

        // Check if all tiles are tapped
        if (newActivated.length === tiles.length) {
          isAdvancing.current = true;
          // Delay then play the blended word/sentence
          setTimeout(() => {
            setShowBlendResult(true);
            playWord(blendedText);
          }, 800);
        }
      } else {
        // Wrong tile - gentle shake
        setShakeIndex(index);
        setTimeout(() => setShakeIndex(null), 500);
      }
    },
    [currentWord, currentSentence, activatedPhonemes, showBlendResult, playPhonemes, playWord, tiles, blendedText]
  );

  // Handle "I read it!" / auto-advance after blend
  const handleAdvance = useCallback(() => {
    if (!currentWord && !currentSentence) return;

    // Record attempt (always correct for self-guided game)
    recordAttempt(wordId, true, 'word-explorer');

    const roundResult: RoundResult = {
      word: wordId,
      correct: true,
      attempts: 1,
    };

    const newRounds = [...rounds, roundResult];
    setRounds(newRounds);

    // Show feedback
    setShowFeedback(true);
  }, [currentWord, currentSentence, wordId, rounds, recordAttempt]);

  // Skip ahead: activate all tiles and show the blended word
  const handleSkip = useCallback(() => {
    if ((!currentWord && !currentSentence) || showBlendResult || isAdvancing.current) return;
    isAdvancing.current = true;
    setActivatedPhonemes(tiles.map((_, i) => i));
    setTimeout(() => {
      setShowBlendResult(true);
      playWord(blendedText);
    }, 400);
  }, [currentWord, currentSentence, showBlendResult, tiles, playWord, blendedText]);

  // Handle feedback dismiss
  const handleFeedbackDismiss = useCallback(() => {
    setShowFeedback(false);

    if (currentRound >= ROUNDS_PER_GAME) {
      // Game complete
      const allRounds = [
        ...rounds,
        wordId
          ? { word: wordId, correct: true, attempts: 1 }
          : rounds[rounds.length - 1],
      ].slice(0, ROUNDS_PER_GAME);

      const result: GameResult = {
        gameType: 'word-explorer',
        rounds: allRounds,
        starEarned: true,
        completedAt: new Date().toISOString(),
      };
      completeGame(result);
      router.push('/games/result?game=word-explorer');
    } else {
      setCurrentRound((prev) => prev + 1);
    }
  }, [currentRound, rounds, wordId, completeGame, router]);

  if (!currentWord && !currentSentence) {
    return null;
  }

  const nextExpectedIndex = activatedPhonemes.length;

  const promptArea = (
    <p className="font-display text-2xl text-bark text-center">
      {isSentenceMode ? 'Tap each word in order!' : 'Tap each sound in order!'}
    </p>
  );

  const answerArea = (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Phoneme/token buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {tiles.map((tile, index) => {
          const isActivated = activatedPhonemes.includes(index);
          const isNextExpected = index === nextExpectedIndex && !showBlendResult;
          const isShaking = shakeIndex === index;

          return (
            <button
              key={`${wordId}-${index}`}
              type="button"
              onClick={() => handlePhonemeTap(index)}
              disabled={showBlendResult}
              className={`
                min-w-[80px] min-h-[80px] rounded-2xl font-display text-2xl font-bold
                transition-all duration-200 select-none
                ${
                  isActivated
                    ? 'bg-sky border-2 border-sky-dark text-white scale-110 shadow-soft'
                    : isNextExpected
                    ? 'bg-white/80 border-2 border-sky text-bark/40 animate-pulse'
                    : 'bg-white/80 border-2 border-bark/20 text-bark/40'
                }
                ${isShaking ? 'animate-shake' : ''}
                ${!showBlendResult ? 'hover:scale-105 active:scale-95' : ''}
              `}
            >
              {tile}
            </button>
          );
        })}
      </div>

      {/* Skip button - shown while tapping letters */}
      {!showBlendResult && !showFeedback && tiles.length > 0 && (
        <button
          type="button"
          onClick={handleSkip}
          className="rounded-2xl bg-lavender/60 px-6 py-3 font-display text-lg text-bark/70 shadow-soft transition-transform hover:scale-105 active:scale-95"
        >
          I know this word!
        </button>
      )}

      {/* Blended word/sentence display */}
      {showBlendResult && (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <p className={`font-display font-bold text-meadow ${isSentenceMode ? 'text-3xl' : 'text-5xl'}`}>
            {blendedText}
          </p>
          {!showFeedback && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => playWord(blendedText)}
                className="touch-target rounded-2xl bg-sky/30 px-6 py-4 font-display text-xl text-bark/70 shadow-soft transition-transform hover:scale-105 active:scale-95"
              >
                Hear again
              </button>
              <button
                type="button"
                onClick={handleAdvance}
                className="touch-target rounded-2xl bg-meadow px-8 py-4 font-display text-xl text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
              >
                I read it!
              </button>
            </div>
          )}
        </div>
      )}

      {/* Feedback overlay */}
      {showFeedback && (
        <FeedbackOverlay
          type="correct"
          message={ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)]}
          onDismiss={handleFeedbackDismiss}
        />
      )}
    </div>
  );

  return (
    <GameShell
      character="explorer"
      currentRound={currentRound}
      totalRounds={ROUNDS_PER_GAME}
      promptArea={promptArea}
      answerArea={answerArea}
    />
  );
}
