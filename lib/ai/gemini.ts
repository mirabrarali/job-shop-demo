import { GoogleGenAI } from "@google/genai";
import { CallAnalysis, Candidate } from "@/lib/types";

function getClient() {
  if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured.");
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

async function json<T>(system: string, prompt: string): Promise<T> {
  const response = await getClient().models.generateContent({ model: process.env.GEMINI_MODEL || "gemini-2.5-flash", contents: prompt, config: { systemInstruction: system, responseMimeType: "application/json", temperature: 0.25 } });
  return JSON.parse(response.text || "{}");
}

export async function generateScreeningTurn(candidate: Candidate, transcript: string) {
  return json<{ response: string; stage: string; done: boolean; extracted: Record<string, string | number | null> }>(
    "You are JobShop AI Recruiter. Speak naturally and briefly. Ask one question at a time. Use Indian English comfortably. Never invent candidate facts. Return JSON with response, stage, done, and extracted. Extract only facts explicitly stated in the transcript. The stages are WELCOME, JOB_ROLE, SKILLS, QUALIFICATION, INDUSTRY, SHIFT, EXPERIENCE, CURRENT_COMPANY, NOTICE_PERIOD, SALARY, CITY, INTEREST, COMPLETE.",
    `Candidate profile so far: ${JSON.stringify(candidate)}\nTranscript:\n${transcript}\nContinue the screening. If this is the first turn, introduce yourself and ask for the candidate's name. Ask for missing job and candidate details in a sensible order. End only after interest and questions are covered.`
  );
}

export async function analyzeTranscript(transcript: string): Promise<CallAnalysis> {
  return json<CallAnalysis>("Analyze only observable job-relevant communication in this transcript. Do not assess accent, nationality, age, gender, health, disability, appearance, or personality. Return valid JSON with scores from 0 to 100 and concise arrays.", transcript);
}

export async function finalizeScreening(candidate: Candidate, transcript: string) {
  return json<{ candidate: Partial<Candidate>; analysis: CallAnalysis }>(
    "You are finalizing a recruitment screening. Extract only facts explicitly present in the transcript and analyze only observable job-relevant communication. Do not assess accent, nationality, age, gender, health, disability, appearance, or personality. Return JSON with candidate and analysis. Use null for unknown candidate fields. The analysis must include grammarRating, grammarScore, grammarObservations, communicationRating, communicationScore, fluencyRating, clarityRating, fillerWords, strengths, concerns, interest, disposition, and summary.",
    `Candidate profile before finalization: ${JSON.stringify(candidate)}\nComplete transcript:\n${transcript}`
  );
}
