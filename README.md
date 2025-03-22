# 📦 Appsus

**Appsus** is a multi-app single-page application (SPA) built with **React**.  
It integrates several mini productivity apps — all in one place — with clean routing and shared components.

> 🧠 This project was built collaboratively during a React development course.  
> 🧑‍💻 I was responsible for building the **misterMail** app.

---

## 🚀 Featured Apps

### ✉️ MisterMail (built by me)
A mock Gmail-like app built for local use.

**Features:**
- View inbox, sent, trash, starred, and drafts
- Compose and auto-save emails (drafts every 5s)
- Filter by read/unread, text, or folders
- Sort by date or title
- Star emails or mark as read/unread
- Delete to trash, permanently delete from trash
- ✏️ Integration with **missKeep**: save an email as a note via query-params

---

### 🗒️ MissKeep  
Inspired by Google Keep. A versatile note-taking app.

- Support for text, image, video, to-do, audio, canvas & map notes
- Pin notes to top
- Change background color
- Filter/search notes
- Duplicate notes
- Integration with **misterMail**

---

### 📚 MissBooks (optional)  
A book search and review app using Google Books API.

---

## 🛠️ Tech Stack

- **Framework**: React + React Router
- **State**: useState, useEffect, useRef
- **Data Storage**: localStorage (no backend)
- **Routing**: SPA with query-params
- **Collaboration**: GitHub, Git, live syncing

---

## 🗂️ Project Structure

```
Appsus/
├── apps/
│   ├── misterMail/   # Email app (my work)
│   ├── missKeep/     # Note-taking app
│   └── missBooks/    # (Optional) Book app
├── cmps/             # Reusable components (e.g. LongTxt, UserMsg)
├── services/         # app-wide utils and localStorage service
├── assets/           # Icons, styles
└── App.jsx
```

---

## 📎 Demo & Setup

1. Clone the project:
```bash
git clone https://github.com/ShayIsso/Appsus.git
cd Appsus
npm install
npm run dev
```

2. Open in browser:  
`http://localhost:5173`

---

## 🔄 Git Workflow & Collaboration

This project followed a real-world Git workflow:

- Created feature branches per app and feature
- Pushed and pulled frequently to stay in sync
- Wrote meaningful commit messages
- Used GitHub to coordinate and merge code
- Practiced resolving merge conflicts together

You can see this in the commit history on GitHub:  
👉 [Commit History](https://github.com/ShayIsso/Appsus/commits/main)

---

## 🤝 Team & Collaboration

- Built as a **pair project**
- Worked via **feature ownership** – each developer led one app while integrating common components and design
- Used **query params** and shared services for inter-app communication

---

## 📄 Resources

- 📘 [Appsus Overview](./Sprint3-Appsus.pdf)
- 📨 [MisterMail Spec](./Sprint3-Appsus-misterEmail.pdf)
- 🗒️ [MissKeep Spec](./Sprint3-Appsus-missKeep.pdf)

---

## ✨ Credits

Made with ❤️ as part of the **Coding Academy** React Sprint  
Check out my work: [ShayIsso](https://github.com/ShayIsso)
