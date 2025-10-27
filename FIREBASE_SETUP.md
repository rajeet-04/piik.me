# 🔥 Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select existing project
3. Follow the setup wizard

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Google** as a sign-in provider
3. Add your support email

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a location

## Step 4: Get Web App Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll to "Your apps" section
3. Click the **Web** icon (</>)
4. Register your app (name it "Zaplink")
5. Copy the `firebaseConfig` object values

## Step 5: Get Service Account Key (for backend)

1. Go to **Project Settings** > **Service accounts**
2. Click "Generate new private key"
3. Save the JSON file securely
4. Extract these values:
   - `project_id`
   - `client_email`
   - `private_key`

## Step 6: Update Configuration Files

### Update `.env` file:
```env
# From firebaseConfig
FIREBASE_API_KEY=AIza...
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123

# From service account JSON
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Server
PORT=3000
BASE_URL=http://localhost:3000
```

### Update `public/firebase-config.js`:
Replace the placeholder values with your actual Firebase config values.

## Step 7: Set Firestore Security Rules (Production)

In Firestore Database > Rules, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own links
    match /links/{linkId} {
      allow read: if true; // Anyone can read links (for redirects)
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Users can read/write analytics for their links
    match /analytics/{linkId} {
      allow read: if true; // Anyone can read (for click tracking)
      allow write: if true; // Anyone can write (for click tracking)
    }
  }
}
```

## Step 8: Test the Setup

1. Update your `.env` file with all credentials
2. Update `public/firebase-config.js` with web app config
3. Restart the server: `npm start`
4. Try logging in with Google!

## Troubleshooting

- **"Firebase: Error (auth/unauthorized-domain)"**: Add `localhost` to authorized domains in Firebase Console > Authentication > Settings > Authorized domains
- **"Permission denied"**: Check Firestore security rules
- **"Invalid API key"**: Verify all config values are correct in `.env` and `firebase-config.js`
