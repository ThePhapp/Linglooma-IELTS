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

## 🧩 Key Features

👩‍🎓 **For Students**  
- Submit writing and speaking tasks  
- Receive AI-generated scores and feedback  
- Track learning progress with visual dashboards  

👨‍🏫 **For Teachers**  
- Create and assign exercises  
- View and comment on student submissions  
- Track student performance and progress  

🔐 **For Admins**  
- Manage users and roles  
- View system-wide performance metrics  

---

## 🤖 AI Engine

- **Writing Evaluation**: Azure Text Analytics (grammar, coherence, vocabulary)  
- **Speaking Evaluation**: Azure Speech-to-Text (fluency, pronunciation, intonation)  
- **Feedback Generation**: Automatically generated based on IELTS criteria  

---

## 🔐 Security

- JWT & OAuth 2.0 authentication  
- Role-based access control (Student / Teacher / Admin)  
- HTTPS encrypted communication  

---

## 🖥️ System Architecture

- **Frontend**: React SPA with Bootstrap 5  
- **Backend**: Node.js + Express (REST API)  
- **Database**: MySQL / PostgreSQL  
- **AI Integration**: Azure Cognitive Services  
- **Deployment**: Docker + Cloud Ready (AWS/Azure)

---

## ⚙️ Tech Stack

| Layer     | Technology                       |
|-----------|----------------------------------|
| Frontend  | React, Bootstrap, HTML, CSS      |
| Backend   | Node.js, Express.js              |
| AI Engine | Azure Text Analytics, Speech     |
| Database  | PostgreSQL               |
| Security  | JWT, OAuth 2.0, HTTPS            |
| Others    | REST API, Docker, WebSocket (opt)|

---

## 🎨 UI Design (Figma)

👉 [Figma Prototype](https://www.figma.com/design/Y2hHstQe0XgOFyVnlK3Ru2/Linglooma?node-id=0-1&t=1KkpUqhxLMWYtM7u-1)


---

## 🛠 How to Run Locally

```bash
git clone https://github.com/ThePhapp/Linglooma-IELTS.git
cd Linglooma-IELTS
npm install
npm start
```

> ⚠️ Configure `.env` with your Azure and Firebase credentials before running

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
