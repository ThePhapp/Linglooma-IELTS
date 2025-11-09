# React + Vite + Tailwind CSS Project

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 19** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router** - Declarative routing for React applications

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

2. **Configure Backend URL** - Edit `.env`:
  ```properties
  # For Production (Render)
  VITE_BACKEND_URL=https://linglooma-ielts-2.onrender.com
  
  # For Local Development
  # VITE_BACKEND_URL=http://localhost:3000
  ```

3. Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```
  
  Frontend will run at: **http://localhost:4028**

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API base URL | `https://linglooma-ielts-2.onrender.com` |

**Note**: Vite auto-detects if backend is localhost and enables proxy accordingly.

## 🐛 Troubleshooting

### ❌ ECONNREFUSED Error

If you see proxy errors like:
```
[vite] http proxy error: /api/reading
AggregateError [ECONNREFUSED]
```

**Solutions**:
1. **Using Render backend**: Make sure `.env` has `VITE_BACKEND_URL=https://linglooma-ielts-2.onrender.com`
2. **Using local backend**: Start backend first with `npm run dev` in `01-backend-nodejs/`
3. **Restart Vite** after changing `.env`: Stop (Ctrl+C) and run `npm run dev` again

### ❌ CORS Error

Add your frontend URL to backend CORS whitelist in `01-backend-nodejs/app.js`.

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── utils/           # Utilities (axios config)
│   ├── styles/          # Global styles and Tailwind configuration
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── Routes.jsx       # Application routes
├── .env                 # Environment variables (VITE_BACKEND_URL)
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration for Tailwind
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration (with smart proxy)
```
