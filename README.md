# JobShop AI Recruiter

Lightweight Next.js proof of concept for real AI-assisted recruitment calls. The recruiter enters a candidate and job brief, then Twilio calls the candidate's Indian mobile number. Twilio Gather performs turn-based speech recognition, Groq selects the next question and extracts facts, and the browser polls the temporary call session for the transcript.

## Stack and architecture

- Next.js 16 App Router, TypeScript, Tailwind CSS, Lucide React
- Twilio Voice API with `<Gather input="speech">` and `<Say>`
- Groq server-side JSON responses for recruiter reasoning, extraction, summary, and communication analysis
- No database, Redis, Docker, custom server, or mock calling mode

Twilio-specific code is isolated under `lib/twilio`. AI code is isolated under `lib/ai`. Temporary call state is kept in `lib/calls/store.ts`.

## Environment

Copy `.env.example` to `.env.local` and set:

```text
GROQ_API_KEY=
GROQ_MODEL=llama-3.1-8b-instant
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
NEXT_PUBLIC_BASE_URL=https://your-public-domain.vercel.app
```

Never expose the Twilio auth token, account SID, or Groq key in browser code.

## Run locally

```bash
npm install
npm run dev
```

Twilio cannot reach `localhost`. Use a deployed Vercel URL or an HTTPS tunnel for `NEXT_PUBLIC_BASE_URL`. The webhook routes are `POST /api/twilio/voice`, `POST /api/twilio/gather`, and `POST /api/twilio/status`.

## Real call test

1. Create a Twilio Voice number and configure the required account variables.
2. Create a Groq API key and choose a supported model in `GROQ_MODEL`.
3. Deploy to Vercel, then set `NEXT_PUBLIC_BASE_URL` to the deployed HTTPS URL.
4. Open `/call`, enter an authorized Indian mobile number such as `9876543210` or `+919876543210`, and click **Start AI call**.
5. Answer the actual phone call. The transcript updates as Twilio recognizes each turn.

Twilio trial accounts can restrict destination numbers and require verification. Trial accounts may also play trial notices and have other call restrictions. Check Twilio's current Voice trial documentation before testing; this project does not bypass account, country, carrier, or regulatory restrictions.

## Limitations

This POC intentionally stores sessions in process memory because it has no database. That is suitable for a short single-instance demonstration, but Vercel serverless instances can restart or route successive webhooks to different instances. Reliable production calls need a small external state store and Twilio request signature validation. This POC uses turn-based Gather recognition, not a persistent bidirectional Media Streams server, so it is not claiming realtime audio streaming.

The `/calls` page is session-scoped and does not provide durable history. Communication analysis is based only on transcript content and does not evaluate accent, age, gender, nationality, health, appearance, or personality.

## Deployment

Import the repository into Vercel, add all variables from `.env.example`, deploy, and use the resulting HTTPS URL for `NEXT_PUBLIC_BASE_URL`. Run `npm run build` before deployment.

## Future telephony providers

Keep the webhooks and session contract stable while adding provider adapters for Asterisk, VICIdial, GSM gateways, or SIP. The recruiter UI should call a provider-independent call service rather than embedding telephony-specific behavior.

# job-shop-demo
