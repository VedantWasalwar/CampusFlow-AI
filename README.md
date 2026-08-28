# CampusFlow AI — Smart Campus Career & Opportunity Management Platform

CampusFlow AI is a production-ready, modern, premium full-stack MERN application designed for college students to discover internships, track application lifecycles, manage deadlines, analyze technical skill gaps, manage verified resume documents, and monitor career progression.

# 🚀 CampusFlow AI

### 🎓 Smart Campus Career & Opportunity Management Platform

CampusFlow AI is a **MERN stack career platform** that helps students discover internships and jobs, manage applications, track deadlines, upload resumes, and analyze the skills required for their target roles.

> **Discover → Apply → Track → Improve → Grow 🚀**

---

## 🌐 Live Project

### 🔗 [🚀 Visit CampusFlow AI](https://campusflow-ai.netlify.app/)

**Backend API:** [View API Health](https://campusflow-ai-backend.onrender.com/api/health)

**GitHub:** [CampusFlow-AI Repository](https://github.com/VedantWasalwar/CampusFlow-AI)

---

## 📸 Home Page

<p align="center">
  <a href="https://campusflow-ai.netlify.app/">
    <img src="screenshots/home.png" alt="CampusFlow AI Home Page" width="900">
  </a>
</p>

<p align="center">
  👆 <b>Click the screenshot to visit the live website</b>
</p>

---

## ✨ Features

| 👨‍🎓 Student                 | 🧑‍💼 Admin                  |
| ----------------------------- | ---------------------------- |
| 🔐 Register & Login           | 📊 Analytics Dashboard       |
| 💼 Job & Internship Discovery | 💼 Opportunity Management    |
| 🔎 Search & Filters           | 👥 Student Management        |
| 📌 Save Opportunities         | 📝 Application Management    |
| 📝 Application Tracker        | 🔄 Update Application Status |
| ⏰ Deadline Tracking           | 🔐 Role-Based Access         |
| 📄 Resume Management          | 📈 Platform Statistics       |
| 🧠 Skill Gap Analyzer         |                              |

---

## 🧠 Smart Skill Gap Analyzer

```text
👤 Student Skills
        ↓
💼 Target Opportunity
        ↓
🧠 Skill Matching Engine
        ↓
📊 Match Percentage
        ↓
❌ Missing Skills
        ↓
🎯 Learning Priority
```

The current Skill Gap Analyzer uses a **transparent rule-based matching algorithm**, making the recommendations explainable and easy to extend with an AI/LLM service in the future.

---

## 🛠️ Technology Stack

### 🎨 Frontend

<p>
<img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

<p>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">
<img src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge">
</p>

### ⚙️ Backend

<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
<img src="https://img.shields.io/badge/bcrypt-338033?style=for-the-badge">
<img src="https://img.shields.io/badge/Multer-FF6B35?style=for-the-badge">
</p>

### 🍃 Database

<p>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white">
</p>

### ☁️ Deployment & Tools

<p>
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Git-181717?style=for-the-badge&logo=git&logoColor=white">
</p>

---

## 🏗️ Architecture

```text
                👨‍🎓 Student / 🧑‍💼 Admin
                         │
                         ▼
                ⚛️ React + Vite
                         │
                    REST API
                         │
                         ▼
               🟢 Node.js + Express
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       🔐 JWT       💼 REST APIs    🧠 Skill Engine
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                    🔗 Mongoose
                         │
                         ▼
                  🍃 MongoDB Atlas
```

---

## 🔐 Security

🔒 JWT Authentication
🔑 bcrypt Password Hashing
🛡️ Protected APIs
👥 Role-Based Authorization
🌐 CORS Protection
🪖 Helmet Security
🚦 Rate Limiting
🔐 Environment Variables
📄 Resume File Validation

---

## 📂 Project Structure

```text
CampusFlow-AI/
│
├── client/          ⚛️ React Frontend
├── server/          🟢 Express Backend
├── screenshots/     📸 Screenshots
├── .gitignore
├── .env.example
├── README.md
└── LICENSE
```

---

## ⚡ Run Locally

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## ☁️ Deployment

| Component      | Platform      | Status       |
| -------------- | ------------- | ------------ |
| 🎨 Frontend    | Netlify       | 🟢 Live      |
| ⚙️ Backend     | Render        | 🟢 Live      |
| 🍃 Database    | MongoDB Atlas | 🟢 Connected |
| 💻 Source Code | GitHub        | 🟢 Public    |

---

## 👨‍💻 Developer

### Vedant Wasalwar

🎓 **B.Tech – Computer Science & Engineering**
S.B. Jain Institute of Technology, Management & Research, Nagpur

[![GitHub](https://img.shields.io/badge/GitHub-VedantWasalwar-181717?style=for-the-badge\&logo=github)](https://github.com/VedantWasalwar)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vedant_Wasalwar-0A66C2?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://linkedin.com/in/vedant-wasalwar-b2128128b)

---

<p align="center">

### 🚀 CampusFlow AI

**Discover. Apply. Track. Improve. Grow.**

⭐ If you like this project, consider giving it a star!

</p>







---

## Architecture Diagram

```mermaid
graph TD
    User([Student / Admin Client]) -->|HTTPS REST API| ExpressApp[Express.js Server]
    ExpressApp -->|JWT & Role Middleware| AuthModule[Authentication & Security]
    ExpressApp -->|Mongoose ORM| Database[(MongoDB Atlas)]
    ExpressApp -->|Multer Engine| ResumeStorage[Disk Storage - /uploads]
    ExpressApp -->|Rule Engine| SkillService[skillGapService.js]

    subgraph Client [React + Vite Frontend]
        Router[React Router DOM]
        State[AuthContext & ToastContext]
        UI[Framer Motion + Tailwind CSS + Recharts]
    end

    subgraph Server [Node.js Backend]
        Controllers[Controllers Layer]
        Services[Services & Models]
        Security[Helmet + CORS + Rate Limiting]
    end
```

---

## Product Vision & Key Features

### For Students:
- **Opportunity Discovery:** Filter tech internships by role, company, location, work mode, stipend range, and required skills.
- **Application Tracker:** Interactive 4-stage pipeline tracker (`Applied` → `Assessment` → `Interview` → `Decision`).
- **Smart Skill Gap Analyzer:** Rule-based algorithm comparing profile skills against role requirements to return match percentage, missing prerequisites, and prioritized learning roadmaps.
- **Deadline Management:** Automated urgency badges highlighting closing application windows.
- **Resume Management:** Real Multer-backed resume upload (PDF, DOC, DOCX up to 5MB) with download, replace, and delete controls.
- **Saved Opportunities:** Persistent bookmarking in MongoDB.

### For Administrators:
- **Platform Analytics Dashboard:** Visual metric cards and Recharts graphs for total applicants, conversion rates, and work mode distribution.
- **Opportunity CRUD Console:** Modal form to post, update, or remove opportunity listings.
- **Application Pipeline Manager:** Update student status directly in MongoDB with instant user notifications.
- **Student Directory:** View student profiles, academic records, and toggle active/deactivated access states.

---

## Tech Stack

- **Frontend:** React 18, Vite, JavaScript, Tailwind CSS, Framer Motion, Recharts, Lucide React, Axios, React Router DOM.
- **Backend:** Node.js, Express.js, MongoDB Atlas (Mongoose ORM), JWT (JSON Web Tokens), bcryptjs, Multer, Helmet, CORS, Express Rate Limit, Dotenv.

---

## Demo Credentials

You can test both student and admin roles using the 1-click **Demo Access** buttons on the Login page or by using these credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Demo Student** | `student@campusflow.ai` | `Student@123` |
| **Demo Admin** | `admin@campusflow.ai` | `Admin@123` |

---

## Local Development Setup

### 1. Prerequisites
- Node.js >= 18.x installed
- NPM >= 9.x installed

### 2. Backend Setup
```bash
cd server
npm install
npm run seed     # Seeds MongoDB Atlas with 12+ realistic opportunities & demo accounts
npm start        # Launches server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev      # Launches Vite dev server on http://localhost:5173
```

---

## Environment Variables

### Server (`server/.env.example`)
```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/campusflow_ai?retryWrites=true&w=majority&appName=CampusFlow
JWT_SECRET=YOUR_JWT_SECRET
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env.example`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoint Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Public | API health check status & MongoDB Atlas state |
| **POST** | `/api/auth/register` | Public | Register new student account |
| **POST** | `/api/auth/login` | Public | Authenticate user & return JWT |
| **GET** | `/api/auth/me` | Private | Get current user session |
| **GET** | `/api/opportunities` | Public | List opportunities with search, filter & pagination |
| **GET** | `/api/opportunities/:id` | Public | Get detailed opportunity view |
| **POST** | `/api/opportunities` | Admin | Create new opportunity listing |
| **PUT** | `/api/opportunities/:id` | Admin | Update existing opportunity |
| **DELETE** | `/api/opportunities/:id` | Admin | Delete opportunity listing |
| **POST** | `/api/applications` | Student | Submit application for opportunity |
| **GET** | `/api/applications/my` | Student | List logged-in student's applications |
| **POST** | `/api/saved` | Student | Save opportunity bookmark |
| **GET** | `/api/saved` | Student | Get saved opportunities |
| **DELETE** | `/api/saved/:id` | Student | Unsave opportunity |
| **POST** | `/api/skills/analyze` | Private | Execute rule-based skill gap analysis |
| **POST** | `/api/profile/resume` | Private | Upload PDF/DOC/DOCX resume file via Multer |
| **GET** | `/api/admin/dashboard` | Admin | Get overall platform statistics & charts |
| **GET** | `/api/admin/applications` | Admin | List all student applications |
| **PUT** | `/api/admin/applications/:id/status` | Admin | Update application status in MongoDB |
| **GET** | `/api/admin/users` | Admin | List student directory |
| **PUT** | `/api/admin/users/:id/status` | Admin | Toggle student active/deactivated state |

---

## Production Deployment

- **Frontend Deployment (Vercel):** Connect GitHub repo, set Root Directory to `client`, set build command `npm run build`, and configure environment variable `VITE_API_URL=https://your-render-backend.onrender.com/api`.
- **Backend Deployment (Render):** Create Web Service from `server` directory, set start command `node server.js`, set environment variables `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`.
- **Database (MongoDB Atlas):** Connect to MongoDB Atlas cluster using `server/.env`.

---

## License

This project is licensed under the [MIT License](LICENSE).
