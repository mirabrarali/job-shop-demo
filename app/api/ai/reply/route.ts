import { NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/calls/store";
import { generateScreeningTurn } from "@/lib/ai/gemini";

export async function POST(request: Request) {
  try {
    const { callId, speech } = await request.json() as { callId?: string; speech?: string };
    if (!callId || !speech?.trim()) return NextResponse.json({ error: "A call id and spoken response are required." }, { status: 400 });
    const session = getSession(callId);
    if (!session) return NextResponse.json({ error: "This screening session is no longer available." }, { status: 404 });
    const candidateLine = `CANDIDATE: ${speech.trim()}`;
    const transcript = [...session.transcript, { speaker: "CANDIDATE" as const, text: speech.trim(), at: new Date().toISOString() }];
    const turn = await generateScreeningTurn(session.candidate, [...session.transcript.map(entry => `${entry.speaker}: ${entry.text}`), candidateLine].join("\n"));
    const aiEntry = { speaker: "AI" as const, text: turn.response, at: new Date().toISOString() };
    const updated = updateSession(callId, { transcript: [...transcript, aiEntry], candidate: { ...session.candidate, ...turn.extracted }, extractedData: { ...session.extractedData, ...turn.extracted }, stage: turn.stage, status: turn.done ? "COMPLETED" : "LISTENING" });
    return NextResponse.json({ session: updated, response: turn.response, done: turn.done });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to generate the next screening response." }, { status: 500 });
  }
}
