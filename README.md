##Community OS MVP (Firebase) - Ready-to-run package
--------------------------------------------------

Contents:
- frontend/    -> Next.js + Tailwind frontend
- functions/   -> Firebase Cloud Functions (recommendation)
- firestore.rules -> starter security rules for Firestore

Quick start (local):
1. Install Firebase CLI: https://firebase.google.com/docs/cli
2. Create a Firebase project in your account and enable Auth (Email + Google), Firestore, Storage, and Functions.
3. Copy the project config values into frontend/.env.local (NEXT_PUBLIC_* variables):
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...

Frontend:
cd frontend
npm install
npm run dev
Open http://localhost:3000

Functions:
cd functions
npm install
firebase deploy --only functions

Notes:
- This is an MVP starter. Harden Firestore rules before production.
- The recommendation function is callable; you can call it from the client via Firebase functions callable API.
- For production, configure Firebase project, billing (for Functions), and set up CORS/security as needed.