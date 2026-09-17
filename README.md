# JobShop AI Recruiter

A lightweight browser voice screening workspace. The recruiter opens a screening room in a new window, speaks with the candidate through the browser microphone, and sees the transcript, screening stages, and extracted candidate profile in one place.

## How it works

- `/call` opens a new screening room window.
- Gemini Live API streams microphone audio and native audio responses in real time.
- Live input and output transcriptions populate the conversation transcript.
- Gemini generates the recruiter conversation and extracts candidate details.
- No phone number, telephony account, database, or persistent backend is required.

This is an in-browser conversation, not a phone call to a mobile number. Microphone permission is required. Chrome and Edge provide the best Speech Recognition support.

## Environment variables

Set these in Vercel:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_LIVE_MODEL=gemini-3.8-live
```

`GEMINI_API_KEY` is server-side only. Do not add it to client-exposed variables.

Get a key from [Google AI Studio](https://aistudio.google.com/apikey). Gemini API availability and free-tier quotas depend on the model, account, region, and current Google AI Studio terms. `GEMINI_LIVE_MODEL` controls the low-latency audio model. The default is the current `gemini-3.8-live` model.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/call`, open the screening room, allow microphone access, and click **Start live voice**. The browser may require a secure context for microphone access in deployed environments; Vercel provides HTTPS.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Add `GEMINI_API_KEY`, `GEMINI_MODEL`, and `GEMINI_LIVE_MODEL` under Project Settings > Environment Variables.
3. Enable the variables for Production.
4. Redeploy.
5. Open `/call` in Chrome or Edge and allow microphone access.

## Limitations

Gemini Live is a preview API with model-specific quotas and session limits. The current POC keeps call sessions in temporary server memory while also saving a local browser copy. For a production recruiter product, add authenticated users, persistent session storage, consent notices, recording policy controls, and session resumption.

The communication analysis remains transcript-based and must not be used to assess accent, nationality, age, gender, health, disability, appearance, or personality.
