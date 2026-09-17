import { NextResponse } from "next/server";
import { saveSession } from "@/lib/calls/store";
import { startTwilioCall } from "@/lib/twilio/client";
import { normalizeIndianPhone } from "@/lib/twilio/validation";
import { Candidate } from "@/lib/types";

function errorDetails(error: unknown) {
	if (typeof error === "object" && error !== null) {
		const value = error as { message?: string; code?: number | string; status?: number; moreInfo?: string };
		return { message: value.message || "Unable to start the call.", code: value.code, status: value.status, moreInfo: value.moreInfo };
	}
	return { message: "Unable to start the call." };
}

export async function POST(request: Request) {
	try {
		const body = await request.json() as Partial<Candidate>;
		const candidate: Candidate = { name:"Candidate", phone:normalizeIndianPhone(body.phone || ""), jobRole:"Unknown", skill:"Unknown", industry:"Unknown", qualification:"Unknown", shift:"Unknown", city:"Unknown", email:body.email, currentCompany:body.currentCompany, experience:body.experience, noticePeriod:body.noticePeriod, expectedSalary:body.expectedSalary };
		const callId = crypto.randomUUID();
		saveSession({ callId, candidate, stage:"INTRO", questionsAsked:[], answers:{}, transcript:[], extractedData:{}, status:"QUEUED", startedAt:new Date().toISOString() });
		const call = await startTwilioCall(candidate.phone, callId);
		const session = saveSession({ ...((await import("@/lib/calls/store")).getSession(callId)!), twilioCallSid:call.sid, status:"CALLING" });
		return NextResponse.json({ callId, session });
	} catch (error) {
		const details = errorDetails(error);
		console.error("Unable to start outbound call", details);
		const status = details.message.startsWith("Enter a valid") ? 400 : details.message.includes("not configured") || details.message.includes("NEXT_PUBLIC_BASE_URL") ? 503 : 502;
		return NextResponse.json({ error: details.message, code: details.code, moreInfo: details.moreInfo }, { status });
	}
}
