# Deployment Guide for Apex Gaming Rentals

## Prerequisites
- Node.js 16+ and npm installed
- Firebase project created and configured
- Git account with GitHub

## Local Development

### 1. Clone & Setup
```bash
git clone https://github.com/neeshuprada-max/Apex.git
cd Apex
npm install
```

### 2. Configure Firebase
1. Copy `firebase-applet-config.example.json` to `firebase-applet-config.json`
2. Add your Firebase credentials from Firebase Console
3. Keep this file in `.gitignore` (already configured)

### 3. Run Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser

## Production Build

### 1. Build the Application
```bash
npm run build
```
This generates optimized files in the `dist/` directory

### 2. Preview Production Build
```bash
npm run preview
```

## Deployment Options

### Option A: Netlify (Recommended)

1. Go to https://netlify.com
2. Click "New site from Git"
3. Connect GitHub repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

### Option B: Firebase Hosting

```bash
npm install -g firebase-tools
firebase init
npm run build
firebase deploy
```

### Option C: Vercel

1. Push to GitHub
2. Go to https://vercel.com
3. Import GitHub repository
4. Click Deploy

## Firebase Setup

1. Create Firestore database
2. Enable Authentication (Google, Anonymous)
3. Configure security rules
4. Create collections structure for bookings

## Post-Deployment

- Test all features
- Verify WhatsApp integration
- Check authentication
- Monitor error logs
- Set up backups
