# Smart Reminder

Smart Reminder is a full-stack web application that allows users to create, prioritize, and manage reminders with scheduled notification times. The application supports multiple urgency levels and persists data through a backend API, demonstrating full-stack development concepts.

---

## 🚀 Features

- Create, update, and delete reminders
- Assign urgency levels: **Low, Medium, High**
- Schedule notification times for reminders
- Persist tasks using a backend REST API
- Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- CSS
- Vite

### Backend
- Node.js
- Express.js
- RESTful API

### Deployment
- Frontend: GitHub Pages
- Backend: Hosted separately (e.g., Render / Railway)

---

## 📁 Project Structure

```
SmartReminder/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── styles.css
│   │   └── main.jsx
│   └── index.html
│
└── backend/   (future use)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/SmartReminder.git
cd SmartReminder/frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the App

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:5173
```

---

## 🔔 Notifications

* The app will request notification permission on first load
* Notifications are scheduled using `setTimeout`
* **The browser must remain open** for notifications to trigger
* HTTPS is required for notifications when deployed

---

## 🧠 Data Structure

Tasks are stored as an array of objects:

```js
{
  id: number,
  text: string,
  date: string,
  time: string,
  priority: string
}
```

---

## ⏱ Time Complexity

* Add Task: **O(1)**
* Render Tasks: **O(n)**
* Schedule Notification: **O(1)** per task

---

## 🧪 Known Limitations

* Notifications stop if the browser is closed
* Tasks are not persisted after refresh (localStorage planned)
* No user authentication yet

---

## 🔮 Future Enhancements

* Save tasks using `localStorage`
* Edit and delete reminders
* Backend with FastAPI for background notifications
* Email and SMS notifications
* Calendar view
* User authentication

---

## 👨‍💻 Author

**Phillipp Cun**
Computer Science Graduate
Passionate about full-stack development and building practical tools
