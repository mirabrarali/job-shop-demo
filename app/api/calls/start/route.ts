import { NextResponse } from "next/server";
import { saveSession } from "@/lib/calls/store";
import { startTwilioCall } from "@/lib/twilio/client";
import { normalizeIndianPhone } from "@/lib/twilio/validation";
import { Candidate } from "@/lib/types";
export async function POST(request: Request) { try { const body = await request.json() as Candidate; const candidate = { ...body, phone:normalizeIndianPhone(body.phone) }; if (!candidate.name || !candidate.jobRole) return NextResponse.json({ error:"Candidate name and job role are required." }, { status:400 }); const callId = crypto.randomUUID(); saveSession({ callId, candidate, stage:"INTRO", questionsAsked:[], answers:{}, transcript:[], extractedData:{}, status:"QUEUED", startedAt:new Date().toISOString() }); const call = await startTwilioCall(candidate.phone, callId); const session = saveSession({ ...((await import("@/lib/calls/store")).getSession(callId)!), twilioCallSid:call.sid, status:"CALLING" }); return NextResponse.json({ callId, session }); } catch (error) { return NextResponse.json({ error:error instanceof Error ? error.message : "Unable to start the real call." }, { status:500 }); } }
