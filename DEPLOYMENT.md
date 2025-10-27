# Zaplink Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Firebase project configured (see FIREBASE_SETUP.md)

## Step 1: Prepare for Deployment

1. Make sure your `.env` file has all Firebase credentials
2. The `.env` file will NOT be pushed to GitHub (it's in .gitignore)
3. You'll add these as environment variables in Vercel

## Step 2: Push to GitHub

### Initialize Git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Zaplink project"
```

### Create GitHub Repository:
1. Go to https://github.com/new
2. Name it "zaplink" or your preferred name
3. Don't initialize with README (we already have files)
4. Click "Create repository"

### Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/zaplink.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect the project
4. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Step 4: Configure Environment Variables in Vercel

After deployment, add your Firebase credentials:

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add these variables (copy from your `.env` file):

```
PORT=3000
BASE_URL=https://your-app-name.vercel.app

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key_with_newlines

FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

**Important**: For `FIREBASE_PRIVATE_KEY`, make sure to keep the quotes and `\n` characters!

5. Click "Save"
6. Redeploy the project

## Step 5: Update Firebase Configuration

### Update Authorized Domains:
1. Go to Firebase Console > Authentication > Settings
2. Under "Authorized domains", add:
   - `your-app-name.vercel.app`

### Update `BASE_URL` in Vercel:
1. Go to Vercel > Settings > Environment Variables
2. Update `BASE_URL` to your Vercel URL: `https://your-app-name.vercel.app`
3. Redeploy

### Update frontend Firebase config:
Since `public/firebase-config.js` is committed to GitHub, it will work automatically.

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Sign in with Google
3. Create a test link
4. Test on different devices:
   - Desktop browser
   - Mobile browser
   - Tablet
5. Check analytics updates in real-time

## Important Notes

### Socket.IO on Vercel
⚠️ **Important**: Vercel uses serverless functions, which have limitations with WebSocket (Socket.IO). Your real-time features might not work perfectly on Vercel.

**Better hosting alternatives for Socket.IO:**
- **Railway** (https://railway.app) - Excellent for Node.js + Socket.IO
- **Render** (https://render.com) - Great free tier
- **Heroku** (https://heroku.com) - Classic choice
- **DigitalOcean App Platform** - Reliable
- **AWS EC2** or **Google Cloud Run** - Full control

### If Real-time Features Don't Work on Vercel:

You can still use Vercel, but analytics will update on page refresh instead of real-time. To fix this, consider:

1. Deploy to Railway or Render (better for Socket.IO)
2. Use Vercel for frontend only and deploy backend separately
3. Replace Socket.IO with polling or Firestore real-time listeners

## Alternative: Deploy to Railway (Recommended for full Socket.IO support)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up

# Add environment variables
railway variables set FIREBASE_PROJECT_ID=your_value
# ... add all other variables
```

## Troubleshooting

### "CORS Error"
- Add your Vercel domain to CORS configuration in server.js

### "Firebase Error"
- Check environment variables are set correctly in Vercel
- Verify Firebase authorized domains include Vercel URL

### "Real-time Updates Not Working"
- This is expected on Vercel (serverless limitation)
- Consider Railway/Render for full Socket.IO support

### "404 on Short Links"
- Ensure vercel.json routes are configured correctly
- Check that rewrites are working

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Custom Domain (Optional)

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed
5. Update `BASE_URL` environment variable
6. Add domain to Firebase authorized domains

---

**Need help?** Check the main [README.md](README.md) or [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
