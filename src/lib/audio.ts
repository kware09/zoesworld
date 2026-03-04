import { getCachedAudio, setCachedAudio } from './audio-cache';

// Currently playing audio element (for cancellation)
let currentAudio: HTMLAudioElement | null = null;

// Abort controller for cancelling an in-progress phoneme sequence
let sequenceAbort: AbortController | null = null;

// --- Web Speech API fallback implementations ---

function isWebSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function speakWithWebSpeech(text: string, rate: number, pitch: number): Promise<void> {
  return new Promise((resolve) => {
    if (!isWebSpeechAvailable()) { resolve(); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = 'en-GB';
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

// --- Static phoneme audio playback ---

function playStaticAudio(url: string, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }

    const audio = new Audio(url);
    currentAudio = audio;

    const cleanup = () => {
      if (currentAudio === audio) currentAudio = null;
      signal?.removeEventListener('abort', onAbort);
    };

    const onAbort = () => {
      audio.pause();
      cleanup();
      reject(new DOMException('Aborted', 'AbortError'));
    };

    signal?.addEventListener('abort', onAbort, { once: true });

    audio.onended = () => { cleanup(); resolve(); };
    audio.onerror = () => { cleanup(); reject(new Error('Static audio playback failed')); };
    audio.play().catch((err) => { cleanup(); reject(err); });
  });
}

// --- Audio blob playback ---

function playBlob(blob: Blob, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }

    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;

    const cleanup = () => {
      URL.revokeObjectURL(url);
      if (currentAudio === audio) currentAudio = null;
      signal?.removeEventListener('abort', onAbort);
    };

    const onAbort = () => {
      audio.pause();
      cleanup();
      reject(new DOMException('Aborted', 'AbortError'));
    };

    signal?.addEventListener('abort', onAbort, { once: true });

    audio.onended = () => { cleanup(); resolve(); };
    audio.onerror = () => { cleanup(); reject(new Error('Audio playback failed')); };
    audio.play().catch((err) => { cleanup(); reject(err); });
  });
}

// --- ElevenLabs TTS fetch with caching ---

async function fetchAndPlayAudio(
  text: string,
  type: 'phoneme' | 'word' | 'prompt',
  signal?: AbortSignal
): Promise<void> {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

  const cacheKey = `${type}:${text}`;

  // Check cache first
  let blob = await getCachedAudio(cacheKey);

  if (!blob) {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, type }),
      signal,
    });

    if (!res.ok) {
      throw new Error(`TTS API returned ${res.status}`);
    }

    blob = await res.blob();
    await setCachedAudio(cacheKey, blob);
  }

  return playBlob(blob, signal);
}

// --- Public API ---

export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined';
}

export async function speakPhoneme(phoneme: string, signal?: AbortSignal): Promise<void> {
  // 1. Try pre-recorded static file (instant, consistent)
  try {
    const staticUrl = `/audio/phonemes/${encodeURIComponent(phoneme.toLowerCase())}.mp3`;
    await playStaticAudio(staticUrl, signal);
    return;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    // Static file not found or failed — fall through to API
  }

  // 2. Fall back to ElevenLabs TTS API
  try {
    await fetchAndPlayAudio(phoneme, 'phoneme', signal);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    // 3. Last resort: Web Speech API
    await speakWithWebSpeech(phoneme, 0.7, 1.0);
  }
}

export async function speakWord(word: string): Promise<void> {
  try {
    await fetchAndPlayAudio(word, 'word');
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    await speakWithWebSpeech(word, 0.8, 1.0);
  }
}

export async function speakPhonemeSequence(phonemes: string[], delayMs = 500): Promise<void> {
  // Cancel any previous sequence
  if (sequenceAbort) sequenceAbort.abort();
  const abort = new AbortController();
  sequenceAbort = abort;

  try {
    for (let i = 0; i < phonemes.length; i++) {
      if (abort.signal.aborted) return;
      await speakPhoneme(phonemes[i], abort.signal);
      if (i < phonemes.length - 1) {
        await new Promise<void>((resolve, reject) => {
          const timer = setTimeout(resolve, delayMs);
          const onAbort = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
          abort.signal.addEventListener('abort', onAbort, { once: true });
        });
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    throw err;
  } finally {
    if (sequenceAbort === abort) sequenceAbort = null;
  }
}

export async function speakNinjaPrompt(word: string, removePhoneme: string): Promise<void> {
  // Cancel any previous sequence
  if (sequenceAbort) sequenceAbort.abort();
  cancelSpeech();
  const abort = new AbortController();
  sequenceAbort = abort;

  try {
    // 1. Say "Say {word} without the" via TTS
    const promptText = `Say ${word} without the`;
    await fetchAndPlayAudio(promptText, 'prompt', abort.signal);

    // 2. Small pause
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, 400);
      const onAbort = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
      abort.signal.addEventListener('abort', onAbort, { once: true });
    });

    // 3. Play the phoneme sound (pre-recorded static file)
    await speakPhoneme(removePhoneme, abort.signal);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    // Fallback: try Web Speech for the full sentence
    await speakWithWebSpeech(`Say ${word} without the ${removePhoneme}`, 0.85, 1.1);
  } finally {
    if (sequenceAbort === abort) sequenceAbort = null;
  }
}

export async function speakPrompt(text: string): Promise<void> {
  try {
    await fetchAndPlayAudio(text, 'prompt');
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    await speakWithWebSpeech(text, 0.85, 1.1);
  }
}

export function cancelSpeech(): void {
  // Abort any in-progress sequence first
  if (sequenceAbort) {
    sequenceAbort.abort();
    sequenceAbort = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (isWebSpeechAvailable()) {
    window.speechSynthesis.cancel();
  }
}
