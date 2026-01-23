# SmartReminder 

SmartReminder is a lightweight task and reminder web application that allows users to create tasks with a **date, time, and priority**, and receive **browser notifications** at the scheduled moment.

This project is designed to be simple, fast, and beginner-friendly while demonstrating core full-stack concepts.

---

## 🚀 Features

* Add reminders with:

  * Task name
  * Due date
  * Due time
  * Priority (Low / Medium / High)
* Browser notifications using the Web Notifications API
* Clean and responsive UI
* Built with modern React (Vite)
* No backend required (yet)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6+)
* CSS
* Web Notifications API

### Backend (Planned)

* FastAPI
* SQLite / PostgreSQL

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

---

## 📄 License

This project is licensed under the MIT License.
