# 🚀 Quick Start Guide

Get Zaplink up and running in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- A Google account
- Basic knowledge of Firebase (optional, we'll guide you)

## Step 1: Install Dependencies (30 seconds)

```bash
cd c:\Zaplink
npm install
```

## Step 2: Set Up Firebase (3 minutes)

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or "Create a project"
3. Name it "Zaplink" (or anything you like)
4. Disable Google Analytics (optional for testing)
5. Click "Create project"

### Enable Google Authentication
1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click on "Google"
5. Toggle "Enable"
6. Select your support email
7. Click "Save"

### Create Firestore Database
1. In Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose your preferred location
5. Click "Enable"

### Get Web App Config
1. Go to Project Settings (gear icon ⚙️)
2. Scroll down to "Your apps"
3. Click the Web icon (</>)
4. Register app with nickname "Zaplink Web"
5. Copy the `firebaseConfig` object

### Update `public/firebase-config.js`
Replace the placeholder values with your config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Get Service Account Key
1. Go to Project Settings > Service accounts
2. Click "Generate new private key"
3. Click "Generate key" (saves a JSON file)
4. Open the JSON file

### Update `.env` file
Replace the placeholder values:
```env
PORT=3000
BASE_URL=http://localhost:3000

# From the service account JSON file:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important**: Keep the quotes around `FIREBASE_PRIVATE_KEY` and the `\n` characters!

## Step 3: Run the App (10 seconds)

```bash
npm start
```

You should see:
```
✅ Firebase Admin initialized
🚀 Zaplink server running on http://localhost:3000
```

## Step 4: Open in Browser

Navigate to: **http://localhost:3000**

## Step 5: Sign In and Create Your First Link!

1. Click "Sign in with Google"
2. Select your Google account
3. Click "+ Create New Link"
4. Paste any URL (try: https://google.com)
5. Add UTM parameters (optional)
6. Click "Generate Zaplink"
7. Copy your short link
8. Click "📊 View Analytics"
9. Open your short link in a new tab
10. Watch the analytics update in real-time! ⚡

## Troubleshooting

### "Firebase Admin not configured"
- Check that your `.env` file has all three Firebase values
- Make sure `FIREBASE_PRIVATE_KEY` has quotes and includes `\n` characters
- Restart the server after updating `.env`

### "Popup blocked" when signing in
- Allow popups for localhost in your browser
- Try clicking the sign-in button again

### "Unauthorized domain" error
1. Go to Firebase Console > Authentication > Settings
2. Scroll to "Authorized domains"
3. Add `localhost` if it's not there

### Nothing happens when clicking buttons
- Check browser console (F12) for errors
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Clear cache and hard reload (Ctrl+Shift+R)

## What's Next?

✅ You're all set! Now you can:
- Create multiple links
- Share them with friends
- Watch real-time analytics
- Track campaigns with UTM parameters

📚 Read the full documentation:
- [README.md](README.md) - Complete feature list and usage
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Detailed Firebase setup
- [Security Rules](#firestore-security-rules) - Production security

## Testing the App

Try these scenarios:

### Test 1: Create a Link
1. Create a link to your favorite website
2. Add UTM parameters (source: "test", medium: "demo")
3. Copy the short link

### Test 2: Real-time Analytics
1. Open analytics for your link
2. In another tab/window, visit the short link
3. Switch back to analytics - it updates instantly! ⚡

### Test 3: Multiple Links
1. Create 3-5 different links
2. View your dashboard
3. See all your links with quick stats

### Test 4: Share Functionality
1. Click "🔗 Share" on any link
2. Try copying and pasting to a friend

## Production Deployment

When you're ready to deploy:

1. **Update Firestore Rules** (see FIREBASE_SETUP.md)
2. **Change `.env` BASE_URL** to your domain
3. **Add your domain** to Firebase authorized domains
4. **Deploy to hosting** (Heroku, AWS, DigitalOcean, etc.)

## Need Help?

- Check the [README.md](README.md) for detailed docs
- Review [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for Firebase help
- Open an issue on GitHub

---

**Congratulations! 🎉 You're now tracking links like a pro with Zaplink!**
