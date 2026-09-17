import Link from "next/link";
import { ArrowUpRight, PhoneCall, Radio, Sparkles, Users } from "lucide-react";

export default function Home() {
  return <main className="shell">
    <section className="hero-band"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> JobShop AI / Recruiter workspace</p><h1>Screen the right people, <em>by voice.</em></h1><p className="hero-lede">A real AI recruiter that calls candidates on their mobile, asks focused questions, and returns a hiring-ready conversation record.</p><div className="hero-actions"><Link className="button button-primary" href="/call"><PhoneCall size={17} /> Start an AI call <ArrowUpRight size={17} /></Link><Link className="button button-quiet" href="/calls">View call history</Link></div></div><div className="hero-stamp"><Radio size={20} /><span>LIVE VOICE<br /><strong>Ready to screen</strong></span></div></section>
    <section className="stat-grid"><div className="stat-card"><span><PhoneCall size={16} /> Calls this session</span><strong>—</strong><small>Start your first screen</small></div><div className="stat-card accent"><span><Sparkles size={16} /> AI screening</span><strong>Ready</strong><small>Focused questions on demand</small></div><div className="stat-card"><span><Users size={16} /> Candidate records</span><strong>Live</strong><small>Details captured by voice</small></div></section>
    <section className="feature-strip"><div><p className="eyebrow">Built for the first conversation</p><h2>Every call becomes a clear next step.</h2></div><p>Short questions. Natural answers. Structured candidate details and communication analysis, generated from the actual transcript.</p></section>
  </main>;
}
