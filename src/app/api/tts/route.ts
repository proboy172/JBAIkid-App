import { NextResponse } from 'next/server';
import { EdgeTTS } from '@seepine/edge-tts';

export async function POST(req: Request) {
  try {
    const { text, voice = 'vi-VN-HoaiMyNeural' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const tts = new EdgeTTS({
      voice: voice,
      lang: 'vi-VN',
      outputFormat: 'audio-24khz-48kbitrate-mono-mp3'
    });

    const res = await tts.call(text);
    
    // Return audio stream with aggressive caching for filler phrases
    // @ts-ignore
    return new NextResponse(res.data, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error: any) {
    console.error("TTS API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
