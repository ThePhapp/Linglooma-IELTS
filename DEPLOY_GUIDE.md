# 🚀 Quick Deploy Guide - Linglooma IELTS

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Deploy Backend to Render](#deploy-backend-to-render)
3. [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

✅ **Before you start:**
- [ ] Supabase account with database created ([Setup Guide](./SUPABASE_SETUP_GUIDE.md))
- [ ] Database migration completed (11 tables created)
- [ ] GitHub repository pushed with latest code
- [ ] All API keys ready (Gemini, Azure Speech)

---

## Deploy Backend to Render

### Step 1: Create Web Service

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select repository: `Linglooma-IELTS`
5. Click **"Connect"**

### Step 2: Configure Service

| Setting | Value |
|---------|-------|
| **Name** | `linglooma-backend` |
| **Region** | `Singapore` |
| **Branch** | `master` |
| **Root Directory** | `01-backend-nodejs` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

**Required Variables:**

```properties
# Database (from Supabase)
DATABASE_URL=postgresql://postgres.xxxxx:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# JWT Authentication
JWT_SECRET=0dbbfbb3-5a8c-4657-bdc0-92c3f7d54f25
JWT_EXPIRE=1d

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# Azure Speech
AZURE_SPEECH_KEY=your-azure-speech-key-here
AZURE_SPEECH_REGION=eastasia

# Server
PORT=3000
NODE_VERSION=22.16.0
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Copy your backend URL: `https://linglooma-backend.onrender.com`

### Step 5: Test Backend

```bash
# Test health check
curl https://linglooma-backend.onrender.com/

# Test database connection (check logs)
# Should see: ✅ Connected to PostgreSQL database successfully!
#            Source: Supabase/Cloud (DATABASE_URL)
```

---

## Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. Update API endpoint in frontend code
2. Edit `00-frontend-react/src/utils/axios.customize.js`:

```javascript
const instance = axios.create({
  baseURL: 'https://linglooma-backend.onrender.com' // Your Render URL
});
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Import `Linglooma-IELTS` repository
5. Configure:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `00-frontend-react` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Your frontend will be live: `https://linglooma-ielts.vercel.app`

---

## Environment Variables

### Backend (.env)

```properties
# Use DATABASE_URL for production
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

JWT_SECRET=0dbbfbb3-5a8c-4657-bdc0-92c3f7d54f25
JWT_EXPIRE=1d
GEMINI_API_KEY=AIzaSyBcyCeP_T9gMz_9NRld6zPOy1bFtQeBFHI
AZURE_SPEECH_KEY=DP9zwU29Z1HBSL1Zwr1aSLdrPgm1GavAUxJcpsZfxCFiJf6jIz09JQQJ99BEAC3pKaRXJ3w3AAAYACOGYrCv
AZURE_SPEECH_REGION=eastasia
PORT=3000
NODE_VERSION=22.16.0
```

### Frontend

```javascript
// src/utils/axios.customize.js
const instance = axios.create({
  baseURL: 'https://linglooma-backend.onrender.com'
});
```

---

## Post-Deployment Checklist

### Backend Verification

- [ ] Backend URL accessible: `https://linglooma-backend.onrender.com`
- [ ] Health check returns response
- [ ] Logs show: `✅ Connected to PostgreSQL database successfully!`
- [ ] Logs show: `Source: Supabase/Cloud (DATABASE_URL)`
- [ ] API endpoints respond correctly

### Frontend Verification

- [ ] Frontend URL accessible: `https://linglooma-ielts.vercel.app`
- [ ] Homepage loads with modern gradient design
- [ ] Can navigate to Login/Register pages
- [ ] Login works and connects to backend
- [ ] Can access dashboard after login

### Database Verification

Login to Supabase and run:

```sql
-- Check tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
-- Should show 11 tables

-- Check sample data
SELECT COUNT(*) FROM users;     -- Should be 3
SELECT COUNT(*) FROM lesson;    -- Should be 6
SELECT COUNT(*) FROM question;  -- Should be 54
```

### Common Issues

#### ❌ "require is not defined"
**Solution**: Already fixed! All ES Modules converted to CommonJS.

#### ❌ "Database connection failed"
**Solution**: 
1. Check DATABASE_URL in Render environment variables
2. Verify password is correct (no spaces, special chars encoded)
3. Use Pooler connection (port 6543), not Direct (5432)

#### ❌ "CORS error on frontend"
**Solution**: Add your Vercel domain to CORS whitelist in `app.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:4028',
    'https://linglooma-ielts.vercel.app'  // Add this
  ]
}));
```

#### ❌ Render "Build failed"
**Solution**:
1. Check `package.json` has correct `start` script: `"start": "node server.js"`
2. Set `NODE_VERSION=22.16.0` in environment variables
3. Make sure `Root Directory` is `01-backend-nodejs`

---

## 🎯 Quick Commands

### Local Development

```bash
# Backend (with local PostgreSQL)
cd 01-backend-nodejs
use-local-db.bat
npm run dev

# Backend (with Supabase)
cd 01-backend-nodejs
use-supabase-db.bat
npm run dev

# Frontend
cd 00-frontend-react
npm run dev
```

### Production URLs

```bash
# Backend API
https://linglooma-backend.onrender.com

# Frontend App
https://linglooma-ielts.vercel.app

# Supabase Dashboard
https://supabase.com/dashboard/project/[your-project-id]
```

---

## 📚 Additional Resources

- [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) - Detailed Supabase configuration
- [Render Documentation](https://render.com/docs) - Deploy Node.js apps
- [Vercel Documentation](https://vercel.com/docs) - Deploy React apps

---

**Made with ❤️ by Linglooma Team**
