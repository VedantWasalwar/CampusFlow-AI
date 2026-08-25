# 🚀 CampusFlow AI

### Smart Campus Career & Opportunity Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/React-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-Netlify%20%7C%20Render-00C7B7?style=for-the-badge" />
</p>

<p align="center">
  <b>A modern career management platform that helps students discover opportunities, track applications, analyze skill gaps, manage resumes, and monitor their career progress.</b>
</p>

---

## 🌐 Live Project

### 🖥️ Frontend

🔗 **Live Website:**  
https://campusflow-ai.netlify.app/

### ⚙️ Backend API

🔗 **Backend Health Check:**  
https://campusflow-ai-backend.onrender.com/api/health

### 💻 GitHub Repository

🔗 **Source Code:**  
https://github.com/VedantWasalwar/CampusFlow-AI

---

# 📸 Project Screenshots

## 🏠 Landing Page

<!-- Add screenshot here -->

<p align="center">
  <img src="screenshots/landing-page.png" width="90%" alt="CampusFlow AI Landing Page">
</p>

---

## 📊 Student Dashboard

<!-- Add dashboard screenshot here -->

<p align="center">
  <img src="screenshots/student-dashboard.png" width="90%" alt="CampusFlow AI Student Dashboard">
</p>

---

## 💼 Opportunities

<p align="center">
  <img src="screenshots/opportunities.png" width="90%" alt="CampusFlow AI Opportunities">
</p>

---

## 📈 Application Tracker

<p align="center">
  <img src="screenshots/application-tracker.png" width="90%" alt="CampusFlow AI Application Tracker">
</p>

---

## 🧠 AI Skill Gap Analyzer

<p align="center">
  <img src="screenshots/skill-analyzer.png" width="90%" alt="CampusFlow AI Skill Gap Analyzer">
</p>

---

## 👨‍💼 Admin Dashboard

<p align="center">
  <img src="screenshots/admin-dashboard.png" width="90%" alt="CampusFlow AI Admin Dashboard">
</p>

> 📌 To add screenshots, create a `screenshots` folder in the root directory and place the images inside it.

Example:

```text
CampusFlow-AI/
│
├── client/
├── server/
├── screenshots/
│   ├── landing-page.png
│   ├── student-dashboard.png
│   ├── opportunities.png
│   ├── application-tracker.png
│   ├── skill-analyzer.png
│   └── admin-dashboard.png
│
├── README.md
└── LICENSE

## 🏗️ Architecture Diagram

```mermaid
graph TD

    %% =========================
    %% USERS
    %% =========================
    Student([👨‍🎓 Student])
    Admin([👨‍💼 Admin])

    %% =========================
    %% FRONTEND
    %% =========================
    subgraph Client["💻 React + Vite Frontend"]

        UI["🎨 Responsive UI<br/>Tailwind CSS + Framer Motion"]

        Router["🔀 React Router DOM"]

        AuthContext["🔐 AuthContext<br/>Authentication State"]

        Axios["📡 Axios API Client"]

        Charts["📊 Recharts<br/>Analytics & Charts"]

        StudentPages["👨‍🎓 Student Pages<br/>Dashboard • Opportunities<br/>Applications • Profile"]

        AdminPages["👨‍💼 Admin Pages<br/>Dashboard • Opportunities<br/>Applications • Users"]
    end

    %% =========================
    %% BACKEND
    %% =========================
    subgraph Server["⚙️ Node.js + Express Backend"]

        Express["🚀 Express.js REST API"]

        Middleware["🛡️ Middleware<br/>JWT • Role Authorization<br/>CORS • Helmet • Rate Limiting"]

        AuthAPI["🔑 Authentication API<br/>Register • Login • JWT"]

        OpportunityAPI["💼 Opportunity API<br/>Create • Read • Update • Delete"]

        ApplicationAPI["📝 Application API<br/>Apply • Track • Update Status"]

        SavedAPI["🔖 Saved Opportunity API"]

        ProfileAPI["👤 Profile & Resume API"]

        AdminAPI["📊 Admin API<br/>Analytics • Users • Applications"]

        SkillAPI["🧠 Skill Gap API"]

        SkillEngine["⚡ Rule-Based Skill Engine<br/>skillGapService.js"]

        Multer["📄 Multer<br/>Resume Upload"]
    end

    %% =========================
    %% DATABASE
    %% =========================
    subgraph Database["🍃 MongoDB Atlas"]

        Mongoose["🔗 Mongoose ODM"]

        Users[("👤 Users")]
        Opportunities[("💼 Opportunities")]
        Applications[("📝 Applications")]
        Saved[("🔖 Saved Opportunities")]
        Notifications[("🔔 Notifications")]
    end

    %% =========================
    %% FILE STORAGE
    %% =========================
    Storage["📁 Resume Storage<br/>/uploads"]

    %% =========================
    %% USER → FRONTEND
    %% =========================
    Student --> UI
    Admin --> UI

    UI --> Router
    UI --> AuthContext
    Router --> StudentPages
    Router --> AdminPages

    StudentPages --> Axios
    AdminPages --> Axios
    AuthContext --> Axios

    %% =========================
    %% FRONTEND → BACKEND
    %% =========================
    Axios -->|"HTTPS REST API"| Express

    %% =========================
    %% BACKEND SECURITY
    %% =========================
    Express --> Middleware

    Middleware --> AuthAPI
    Middleware --> OpportunityAPI
    Middleware --> ApplicationAPI
    Middleware --> SavedAPI
    Middleware --> ProfileAPI
    Middleware --> AdminAPI
    Middleware --> SkillAPI

    %% =========================
    %% SKILL ANALYZER
    %% =========================
    SkillAPI --> SkillEngine

    %% =========================
    %% RESUME
    %% =========================
    ProfileAPI --> Multer
    Multer --> Storage

    %% =========================
    %% DATABASE CONNECTION
    %% =========================
    AuthAPI --> Mongoose
    OpportunityAPI --> Mongoose
    ApplicationAPI --> Mongoose
    SavedAPI --> Mongoose
    ProfileAPI --> Mongoose
    AdminAPI --> Mongoose

    Mongoose --> Users
    Mongoose --> Opportunities
    Mongoose --> Applications
    Mongoose --> Saved
    Mongoose --> Notifications
```
