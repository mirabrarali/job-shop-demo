import { NextResponse } from "next/server";
import { finalizeScreening } from "@/lib/ai/gemini";
import { Candidate, TranscriptEntry } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { candidate?: Candidate; transcript?: TranscriptEntry[] };
    if (!body.candidate || !body.transcript?.length) return NextResponse.json({ error: "A candidate and transcript are required." }, { status: 400 });
    const result = await finalizeScreening(body.candidate, body.transcript.map(entry => `${entry.speaker}: ${entry.text}`).join("\n"));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to finalize the screening." }, { status: 500 });
  }
}