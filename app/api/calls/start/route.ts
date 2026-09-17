import { NextResponse } from "next/server";
import { saveSession } from "@/lib/calls/store";
import { Candidate } from "@/lib/types";

export async function POST() {
  const callId = crypto.randomUUID();
  const candidate: Candidate = { name: "Candidate", phone: "", jobRole: "Unknown", skill: "Unknown", industry: "Unknown", qualification: "Unknown", shift: "Unknown", city: "Unknown" };
  const session = saveSession({ callId, candidate, stage: "WELCOME", questionsAsked: [], answers: {}, transcript: [], extractedData: {}, status: "READY", startedAt: new Date().toISOString() });
  return NextResponse.json({ callId, session });
}
