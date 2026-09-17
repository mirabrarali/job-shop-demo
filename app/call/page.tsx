"use client";
import { FormEvent, useState } from "react";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); setLoading(true); const result = await fetch("/api/calls/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone }) }); const data = await result.json(); setLoading(false); if (!result.ok) { const code = data.code ? ` (code ${data.code})` : ""; const info = data.moreInfo ? ` More info: ${data.moreInfo}` : ""; setError(`${data.error || "Unable to start the call."}${code}${info}`); return; } router.push(`/call/${data.callId}`); }
  return <main className="page"><div className="page-header"><div><p className="eyebrow">New screening call</p><h1 className="page-title">Call a candidate</h1><p className="page-subtitle">Enter a mobile number. The recruiter will collect the candidate and job details during the conversation.</p></div></div><form className="panel single-call-form" onSubmit={submit}><div className="field"><label htmlFor="phone">Indian mobile number</label><input id="phone" required value={phone} onChange={event => setPhone(event.target.value)} placeholder="9876543210" autoComplete="tel" /></div><div className="form-footer"><span className="form-note">Use a 10-digit number or include the +91 country code.</span><button className="button button-primary" disabled={loading} type="submit"><PhoneCall size={17} />{loading ? "Starting call…" : "Start call"}</button></div>{error && <p className="error">{error}</p>}</form></main>;
}
