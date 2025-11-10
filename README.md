# 📘 Linglooma-IELTS

Linglooma-IELTS is a web-based English learning platform designed to support IELTS learners and teachers.  
It uses AI to evaluate Speaking skills, visualize learning progress, and improve self-study experience.

---

## 🎯 Project Objectives

- Automate the evaluation of IELTS Speaking with AI
- Provide real-time feedback and progress tracking for learners
- Support teachers in managing classes and reviewing submissions
- Promote efficiency and digitalization in language education

---

## 🎨 UI Design (Figma)

👉 [Figma Prototype](https://www.figma.com/design/Y2hHstQe0XgOFyVnlK3Ru2/Linglooma?node-id=0-1&t=1KkpUqhxLMWYtM7u-1)


---

## 🧩 Key Features

 **For Students**  
- Submit writing and speaking tasks  
- Receive AI-generated scores and feedback  
- Track learning progress with visual dashboards
- Chatting with AI by voice chat  

 **For Teachers**  
- Create and assign exercises  
- View and comment on student submissions  
- Track student performance and progress  

 **For Admins**  
- Manage users and roles  
- View system-wide performance metrics  

---

## 🤖 AI Engine

- **Writing Evaluation**: Azure Text Analytics (grammar, coherence, vocabulary)  
- **Speaking Evaluation**: Azure Speech-to-Text (fluency, pronunciation, intonation)  
- **Feedback Generation**: Personalized feedback is generated using Google's Gemini AI, based on IELTS pronunciation scoring criteria and expert teaching patterns  

---

## 🔐 Security

- JWT & OAuth 2.0 authentication  
- Role-based access control (Student / Teacher / Admin)  
- HTTPS encrypted communication  

---

## ⚙️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React, Bootstrap, HTML, CSS                     |
| Backend   | Node.js, Express.js                             |
| AI Engine | Azure Text Analytics, Gemini API                |
| Database  | PostgreSQL, Supabase                            |
| Security  | JWT, OAuth 2.0, HTTPS                           |
| Testing   | Cypress (E2E, Frontend), Jest (Backend)          |
| Others    | REST API, Docker, WebSocket (optional)          |

---

## 📁 Project Directory Structure

```bash
Linglooma-IELTS/
├── frontend-react/               # React frontend application
│   ├── cypress/                     # Cypress end-to-end tests
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   ├── context/
│       │   ├── lib/
│       │   └── ui/
│       ├── pages/
│       │   ├── Admin/
│       │   ├── Auth/
│       │   ├── Dashboard/
│       │   ├── Features/
│       │   ├── Home/
│       │   ├── Settings/
│       │   └── ViewResults/
│       ├── styles/
│       │   ├── index.css
│       │   └── tailwind.css
│       ├── utils/                  # Axios customization, utilities
│       │   └── axios.customize.js
│       ├── App.jsx
│       ├── Routes.jsx
│       └── main.jsx
│
├── backend-nodejs/
│   ├── configs/
│   ├── controllers/               # Express route controllers
│   ├── middleware/                # Auth, logging middleware, etc.
│   ├── models/                    # Database models
│   ├── routes/                    # API route handlers
│   ├── services/                  # Business logic/services
│   ├── test/                      # Backend tests
│   └── utils/                     # Utility/helper functions
 ``` 
## 🛠 How to Run Locally

### Quick Start (Local PostgreSQL)
```bash
git clone https://github.com/ThePhapp/Linglooma-IELTS.git
cd Linglooma-IELTS
npm install
npm start
```

### Using Supabase (Recommended for Production)
```bash
# 1. Clone repository
git clone https://github.com/ThePhapp/Linglooma-IELTS.git
cd Linglooma-IELTS

# 2. Setup Supabase database
# Follow instructions in SUPABASE_SETUP_GUIDE.md

# 3. Configure environment
cd 01-backend-nodejs
cp .env.example .env
# Edit .env and add your DATABASE_URL from Supabase

# 4. Install & Run
npm install
npm start
```

> ⚠️ Configure `.env` with your DATABASE_URL, Azure, and Gemini credentials before running  
> 📖 See [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) for detailed setup instructions

---

## 🚀 Future Plans

- Add Writing & Listening & Reading modules  
- Adaptive learning using AI analysis  
- Real-time speaking practice + multilingual UI  

---

## 👨‍💻 Team Members

Developed by students of UET - VNU Hanoi:

- Bùi Trung Thanh  
- Mai Tấn Trung  
- Trần Thế Pháp  
- Nguyễn Thành Minh  
- Phạm Thế Hùng
