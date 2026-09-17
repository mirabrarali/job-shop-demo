import { NextResponse } from "next/server";
import { getSession } from "@/lib/calls/store";
export async function GET(_: Request, { params }: { params:Promise<{id:string}> }) { const { id } = await params; const session = getSession(id); return session ? NextResponse.json(session) : NextResponse.json({error:"Call not found in this temporary session."},{status:404}); }
