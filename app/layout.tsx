import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "JobShop AI Recruiter", description: "Real AI-powered candidate screening calls" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="app-shell"><nav className="nav"><Link href="/" className="brand"><span className="brand-mark">JS</span> JOBSHOP AI</Link><div className="nav-links"><Link className="nav-link" href="/">Dashboard</Link><Link className="nav-link" href="/call">AI Calling</Link><Link className="nav-link" href="/calls">Calls</Link></div></nav>{children}</div></body></html>;
}
