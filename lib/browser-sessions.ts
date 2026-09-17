import { CallSession } from "@/lib/types";

const key = "jobshop-screening-sessions";

export function readBrowserSessions(): CallSession[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]") as CallSession[]; } catch { return []; }
}

export function saveBrowserSession(session: CallSession) {
  if (typeof window === "undefined") return;
  const sessions = readBrowserSessions().filter(item => item.callId !== session.callId);
  localStorage.setItem(key, JSON.stringify([session, ...sessions].slice(0, 30)));
}

export function getBrowserSession(callId: string) { return readBrowserSessions().find(session => session.callId === callId); }
