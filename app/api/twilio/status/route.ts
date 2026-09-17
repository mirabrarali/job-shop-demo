import { NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/calls/store";
export async function POST(request:Request){const url=new URL(request.url);const id=url.searchParams.get("callId")||"";const status=String((await request.formData()).get("CallStatus")||"UNKNOWN");if(getSession(id))updateSession(id,{status:status.toUpperCase()});return NextResponse.json({ok:true});}
