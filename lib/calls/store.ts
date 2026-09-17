import { CallSession } from "@/lib/types";
const sessions = globalThis as typeof globalThis & { __jobShopSessions?: Map<string, CallSession> };
const store = sessions.__jobShopSessions ?? new Map<string, CallSession>();
sessions.__jobShopSessions = store;
export function saveSession(session: CallSession) { store.set(session.callId, session); return session; }
export function getSession(callId: string) { return store.get(callId); }
export function updateSession(callId: string, patch: Partial<CallSession>) { const current = store.get(callId); if (!current) return; const next = { ...current, ...patch }; store.set(callId, next); return next; }
export function listSessions() { return [...store.values()].sort((a,b) => b.startedAt.localeCompare(a.startedAt)); }
