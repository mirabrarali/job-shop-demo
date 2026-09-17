"use client";
import { useState } from "react";
import { ArrowUpRight, Mic, MonitorUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function startScreening() {
    const screeningWindow = window.open("about:blank", "jobshop-screening", "popup,width=1440,height=960");
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/calls/start", { method: "POST" });
      const data = await response.json();
      if (!response.ok) { screeningWindow?.close(); setError(data.error || "Unable to start screening."); return; }
      if (screeningWindow) screeningWindow.location.href = `/call/${data.callId}`;
      else router.push(`/call/${data.callId}`);
    } catch {
      screeningWindow?.close();
      setError("Unable to open the screening room. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }
  return <main className="page"><div className="call-landing"><div className="call-landing-copy"><p className="eyebrow">Browser voice workspace</p><h1 className="page-title">A calmer way to screen.</h1><p className="page-subtitle">Open a focused candidate conversation in a separate window. The recruiter asks the questions, listens to spoken answers, and builds the profile as the conversation unfolds.</p><button className="button button-primary call-launch" onClick={startScreening} disabled={loading}><Mic size={18} /> {loading ? "Opening screening…" : "Start screening"} <ArrowUpRight size={17} /></button>{error && <p className="error">{error}</p>}<p className="form-note">Allow microphone access when the screening window opens.</p></div><div className="call-preview"><div className="preview-top"><span className="preview-live" /> SCREENING ROOM <span>00:00</span></div><div className="preview-orb"><Mic size={28} /></div><strong>Candidate conversation</strong><span>Voice and transcript in one place</span><div className="preview-lines"><i /><i /><i /><i /><i /></div></div></div><section className="screening-principles"><div><MonitorUp size={19} /><strong>Recruiter view</strong><span>Transcript, stages, and profile details stay visible.</span></div><div><Mic size={19} /><strong>Natural answers</strong><span>Speak normally. The browser turns responses into text.</span></div></section></main>;
}
