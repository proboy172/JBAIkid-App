import { NextResponse } from 'next/server';
import { EdgeTTS } from '@seepine/edge-tts';

export async function POST(req: Request) {
  try {
    const { text, voice = 'vi-VN-HoaiMyNeural', openAiKey, elevenLabsKey, xttsServerUrl } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // 0. XTTSv2 (Local, Free, Highest Emotion)
    if (xttsServerUrl) {
      try {
        const endpoint = xttsServerUrl.endsWith('/') ? `${xttsServerUrl}tts_to_audio/` : `${xttsServerUrl}/tts_to_audio/`;
        const xttsResponse = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: text,
            speaker_wav: "speaker", // generic speaker id inside the server's speakers folder
            language: "vi"
          })
        });

        if (xttsResponse.ok) {
          return new NextResponse(xttsResponse.body, {
            status: 200,
            headers: {
              'Content-Type': 'audio/wav',
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        }
        console.warn("XTTSv2 failed, falling back...");
      } catch (e) {
        console.warn("XTTSv2 fetch failed:", e);
      }
    }

    // 1. ElevenLabs TTS (Highest Quality & Emotion)
    if (elevenLabsKey) {
      const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel (Warm, female)
      const elResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsKey
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        })
      });
      
      if (elResponse.ok) {
        return new NextResponse(elResponse.body, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
      console.warn("ElevenLabs failed, falling back...");
    }

    // 2. OpenAI TTS (High Quality, Fast)
    if (openAiKey) {
      const oaResponse = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text,
          voice: "nova", // Nova is a very natural and warm female voice
          response_format: "mp3"
        })
      });

      if (oaResponse.ok) {
        return new NextResponse(oaResponse.body, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
      console.warn("OpenAI TTS failed, falling back...");
    }

    // 3. Fallback to Edge TTS (Free, decent but robotic)
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
