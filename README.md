# JobShop AI Recruiter

A lightweight browser voice screening workspace. The recruiter opens a screening room in a new window, speaks with the candidate through the browser microphone, and sees the transcript, screening stages, and extracted candidate profile in one place.

## How it works

- `/call` opens a new screening room window.
- Browser Speech Recognition turns spoken answers into text.
- Browser Speech Synthesis reads the recruiter response aloud.
- Gemini generates the next concise question and extracts candidate details.
- No phone number, telephony account, database, or persistent backend is required.

This is an in-browser conversation, not a phone call to a mobile number. Microphone permission is required. Chrome and Edge provide the best Speech Recognition support.

## Environment variables

Set these in Vercel:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

`GEMINI_API_KEY` is server-side only. Do not add it to client-exposed variables.

Get a key from [Google AI Studio](https://aistudio.google.com/apikey). Gemini API availability and free-tier quotas depend on the model, account, region, and current Google AI Studio terms. `gemini-2.5-flash` is the default model and can be changed with `GEMINI_MODEL` if it is unavailable in your account.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/call`, allow microphone access, and click **Start screening**. The browser may require a secure context for microphone access in deployed environments; Vercel provides HTTPS.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Add `GEMINI_API_KEY` and `GEMINI_MODEL` under Project Settings > Environment Variables.
3. Enable the variables for Production.
4. Redeploy.
5. Open `/call` in Chrome or Edge and allow microphone access.

## Limitations

Browser Speech Recognition support varies by browser and operating system. The current POC keeps call sessions in temporary server memory and does not provide durable history. For a production recruiter product, add authenticated users, persistent session storage, consent notices, recording policy controls, and a more robust realtime audio transport.

The communication analysis remains transcript-based and must not be used to assess accent, nationality, age, gender, health, disability, appearance, or personality.
