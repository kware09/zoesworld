import { NextRequest, NextResponse } from 'next/server';

// Phoneme-to-text mapping so ElevenLabs says the sound, not the letter name
const PHONEME_TEXT_MAP: Record<string, string> = {
  'a': 'aah',
  'b': 'buh',
  'c': 'kuh',
  'd': 'duh',
  'e': 'eh',
  'f': 'fff',
  'g': 'guh',
  'h': 'huh',
  'i': 'ih',
  'j': 'juh',
  'k': 'kuh',
  'l': 'lll',
  'm': 'mmm',
  'n': 'nnn',
  'o': 'oh',
  'p': 'puh',
  'r': 'rrr',
  's': 'sss',
  't': 'tuh',
  'u': 'uh',
  'w': 'wuh',
  'x': 'ks',
  'z': 'zzz',
  'sh': 'shh',
  'ch': 'chuh',
  'th': 'thh',
  'wh': 'wh',
  'ck': 'kuh',
  'ng': 'nng',
  'ee': 'ee',
  'aw': 'aw',
};

const VOICE_SETTINGS = {
  phoneme: { stability: 0.85, similarity_boost: 0.80, style: 0.0, use_speaker_boost: true },
  word: { stability: 0.75, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
  prompt: { stability: 0.70, similarity_boost: 0.75, style: 0.2, use_speaker_boost: true },
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId || apiKey === 'your_api_key_here') {
    return NextResponse.json({ error: 'ElevenLabs not configured' }, { status: 503 });
  }

  let body: { text: string; type: 'phoneme' | 'word' | 'prompt' };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { text, type } = body;
  if (!text || !type) {
    return NextResponse.json({ error: 'Missing text or type' }, { status: 400 });
  }

  // For phonemes, use the mapped pronunciation text
  const speakText = type === 'phoneme'
    ? (PHONEME_TEXT_MAP[text.toLowerCase()] ?? text)
    : text;

  const settings = VOICE_SETTINGS[type] ?? VOICE_SETTINGS.word;

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: speakText,
          model_id: 'eleven_multilingual_v2',
          voice_settings: settings,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'TTS generation failed' },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('ElevenLabs request failed:', error);
    return NextResponse.json({ error: 'TTS request failed' }, { status: 500 });
  }
}
