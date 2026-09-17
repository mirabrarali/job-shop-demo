import { NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 503 });
    const model = process.env.GEMINI_LIVE_MODEL || "gemini-2.5-flash-native-audio-preview-12-2025";
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { apiVersion: "v1alpha" } });
    const token = await ai.authTokens.create({ config: { uses: 1, expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(), liveConnectConstraints: { model, config: { responseModalities: [Modality.AUDIO], inputAudioTranscription: {}, outputAudioTranscription: {} } } } });
    return NextResponse.json({ token: token.name, model });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create a Live voice session." }, { status: 502 });
  }
}
