'use client';

import { useCallback, useRef } from 'react';
import { speakPhoneme, speakWord, speakPhonemeSequence, speakPrompt, speakNinjaPrompt, cancelSpeech } from '@/lib/audio';

export function useAudio() {
  const isSpeaking = useRef(false);

  const playPhonemes = useCallback(async (phonemes: string[], delayMs?: number) => {
    // Cancel any existing playback before starting new sequence
    cancelSpeech();
    isSpeaking.current = true;
    try {
      await speakPhonemeSequence(phonemes, delayMs);
    } finally {
      isSpeaking.current = false;
    }
  }, []);

  const playWord = useCallback(async (word: string) => {
    if (isSpeaking.current) return;
    isSpeaking.current = true;
    cancelSpeech();
    await speakWord(word);
    isSpeaking.current = false;
  }, []);

  const playPrompt = useCallback(async (text: string) => {
    if (isSpeaking.current) return;
    isSpeaking.current = true;
    cancelSpeech();
    await speakPrompt(text);
    isSpeaking.current = false;
  }, []);

  const playNinjaPrompt = useCallback(async (word: string, removePhoneme: string) => {
    cancelSpeech();
    isSpeaking.current = true;
    try {
      await speakNinjaPrompt(word, removePhoneme);
    } finally {
      isSpeaking.current = false;
    }
  }, []);

  const stop = useCallback(() => {
    cancelSpeech();
    isSpeaking.current = false;
  }, []);

  return { playPhonemes, playWord, playPrompt, playNinjaPrompt, stop };
}
