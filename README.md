# 🌸 Linglooma IELTS - AI-Powered IELTS Learning Platform

<div align="center">

**English** | [日本語](./README.ja.md)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.16-339933?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-3ECF8E?logo=supabase)](https://supabase.com/)

*A comprehensive IELTS preparation platform with AI-powered evaluation for Speaking, Writing, Reading, and Listening skills*

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [AI Features](#-ai-features)
- [Deployment](#-deployment)

---

## 🎯 Overview

**Linglooma IELTS** is an advanced web-based learning platform designed to help students prepare for the IELTS exam through AI-powered practice and real-time feedback. The platform covers all four IELTS skills (Speaking, Writing, Reading, Listening) and provides personalized learning paths based on student performance.

### 🌟 Why Linglooma?

- **AI-Powered Evaluation**: Instant feedback using Azure Speech Services and Gemini AI
- **Comprehensive Practice**: All 4 IELTS skills in one platform
- **Smart Analytics**: Visual dashboards tracking progress and weak points
- **Multilingual Interface**: Supports English, Vietnamese, and Japanese
- **Modern UX**: Beautiful, responsive design with smooth animations
- **Flexible Deployment**: Works with local PostgreSQL or Supabase

---

## 🚀 Key Features

### 🗣️ Speaking Module
- Real-time audio recording and Azure Speech-to-Text evaluation
- IELTS Band Scoring (1-9) with pronunciation, fluency, completeness analysis
- Phoneme-level feedback identifying mispronounced sounds
- Topic categories: Technology, Environment, Education, Health, Travel
- Complete speaking history with detailed analytics

### ✍️ Writing Module
- Task 1 & Task 2 support with AI essay evaluation
- Gemini AI analyzes: Task Achievement, Coherence, Lexical Resource, Grammar
- Grammar error detection with corrections and explanations
- Vocabulary enhancement suggestions
- Real-time word counter and timer

### 📖 Reading Module
- Multiple question types: Multiple Choice, True/False/Not Given, Matching, Fill-in-blanks
- Instant scoring with correct/incorrect feedback
- Diverse passage library (Climate Change, AI, Education, etc.)
- Difficulty levels: Easy, Medium, Hard, Academic
- Progress tracking and performance trends

### 🎧 Listening Module
- Audio playback with controls (play, pause, speed adjustment)
- Section-based tests matching IELTS structure (Parts 1-4)
- Multiple accents: British, American, Australian
- Transcript review after submission

### 💬 AI Voice Chat
- Conversational AI powered by Gemini
- Real-time Speech-to-Text and Text-to-Speech
- IELTS practice topics with structured conversations
- Chat history and AI feedback

### 📊 Student Dashboard
- Performance overview with visual charts
- Band score trends and improvement tracking
- Weak points analysis
- Study streak and goal setting
- Recent activity quick access
---

## ⚙️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 6** - Build tool
- **Tailwind CSS 3** - Styling
- **React Router 7** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js 22.16** - Runtime
- **Express.js 5.1** - Web framework
- **PostgreSQL 16+** - Database
- **Supabase** - Database hosting
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### AI Services
- **Azure Speech Services** - Speech-to-Text, pronunciation assessment
- **Google Gemini AI** - Essay evaluation, chat AI, feedback generation

---

## 🛠 Getting Started

### Prerequisites
- Node.js 22.16+
- PostgreSQL 16+ or Supabase account
- Azure Speech API Key
- Google Gemini API Key

### Quick Start

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/ThePhapp/Linglooma-IELTS.git
cd Linglooma-IELTS
```

#### 2️⃣ Setup Backend
```bash
cd 01-backend-nodejs
npm install

# Copy and configure .env
copy .env.example .env
# Add: DATABASE_URL, GEMINI_API_KEY, AZURE_SPEECH_KEY, JWT_SECRET

npm start
# Server runs on http://localhost:3000
```

#### 3️⃣ Setup Frontend
```bash
cd 00-frontend-react
npm install

# Copy and configure .env
copy .env.example .env
# Add: VITE_BACKEND_URL=http://localhost:3000

npm run dev
# Frontend runs on http://localhost:5173
```

#### 4️⃣ Database Setup (Supabase)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run SQL migration: `02-database-postgresql/linglooma_update.sql`
4. Copy connection string and add to `.env`

📖 **Full Guide**: [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)

---

## 🤖 AI Features

### Speaking Evaluation (Azure)
```javascript
✅ Accuracy Score (0-100): Overall pronunciation
✅ Fluency Score (0-100): Speech smoothness
✅ Completeness Score (0-100): Coverage of reference text
✅ Prosody Score (0-100): Intonation patterns
✅ Phoneme Analysis: Specific mispronounced sounds
✅ IELTS Band Conversion (1-9)
```

### Writing Evaluation (Gemini AI)
```javascript
✅ Task Achievement (1-9)
✅ Coherence & Cohesion (1-9)
✅ Lexical Resource (1-9)
✅ Grammatical Range & Accuracy (1-9)
✅ Overall Band Score
✅ Grammar Errors with corrections
✅ Vocabulary Suggestions
```

---

## 🚀 Deployment

### Backend (Render.com)
1. Connect GitHub repository
2. Set environment variables
3. Build: `npm install`
4. Start: `node server.js`

### Frontend (Vercel/Netlify)
1. Import project
2. Set `VITE_BACKEND_URL`
3. Build: `npm run build`
4. Output: `dist`

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

<div align="center">

**Made with ❤️ by UET - VNU Hanoi students**

</div>
