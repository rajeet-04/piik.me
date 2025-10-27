# ⚠️ IMPORTANT: First-Time Setup

After cloning this repository, you need to create your Firebase configuration file:

## 1. Create Firebase Config File

Copy the example file and add your credentials:

```bash
copy public\firebase-config.example.js public\firebase-config.js
```

Then edit `public/firebase-config.js` with your actual Firebase credentials from Firebase Console.

## 2. Create .env File

Copy the example and add your Firebase Admin credentials:

```bash
copy .env.example .env
```

Then edit `.env` with your service account credentials.

## 3. Install Dependencies

```bash
npm install
```

## 4. Start the Server

```bash
npm start
```

---

**Never commit `firebase-config.js` or `.env` to Git!** They are in `.gitignore` for security.
