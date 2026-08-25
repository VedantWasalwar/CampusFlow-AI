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

## Architecture Diagram

mermaid
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


---
