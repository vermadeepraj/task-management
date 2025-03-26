# Task Management App

## 📌 Overview
The **Task Management App** is a full-stack web application built using **React.js**, **Node.js**, **Express.js**, **MongoDB**, and **Tailwind CSS**. It allows users to efficiently manage their tasks by adding, updating, completing, and deleting tasks with a clean and intuitive UI.

## 🚀 Features
- 📌 **Add New Tasks** – Users can add new tasks with a title and description.
- ✅ **Mark Tasks as Completed** – Toggle task completion status.
- ✏️ **Edit Tasks** – Update task details.
- ❌ **Delete Tasks** – Remove tasks permanently.
- 🔄 **Real-Time Updates** – Tasks update instantly.
- 🎨 **Responsive UI** – Designed using **Tailwind CSS** for a smooth experience on all devices.

## 🛠 Tech Stack
### **Frontend** (React.js)
- React.js with Hooks (`useState`, `useEffect`)
- Axios for API calls
- Tailwind CSS for styling

### **Backend** (Node.js + Express.js)
- Express.js for handling API routes
- MongoDB + Mongoose for data storage
- CORS for secure API communication

## 🔧 Installation and Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/vermadeepraj/task-management.git
cd task-management
```

### **2. Set Up Backend**
```sh
cd backend
npm install   # Install dependencies
```

#### **Configure Environment Variables**
Create a `.env` file in the **backend** folder and add:
```sh
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager  # Replace with your MongoDB URI
```

#### **Start Backend Server**
```sh
npm start  # or use nodemon server.js
```

### **3. Set Up Frontend**
```sh
cd ../frontend
npm install   # Install dependencies
```

#### **Start Frontend Server**
```sh
npm run dev  # Starts the Vite server
```

The app should now be running on **http://localhost:5174** (Vite default port) and the backend on **http://localhost:5000**.

## 📡 API Endpoints
| Method | Endpoint         | Description             |
|--------|-----------------|-------------------------|
| GET    | /api/tasks      | Get all tasks           |
| POST   | /api/tasks      | Add a new task          |
| PUT    | /api/tasks/:id  | Update a task           |
| DELETE | /api/tasks/:id  | Delete a task           |

## 📷 Screenshots
### **Home Page (Task List)**
![Task List Screenshot](https://via.placeholder.com/800x400)

### **Add New Task**
![Add Task Screenshot](https://via.placeholder.com/800x400)

## 🛠 Troubleshooting
- **Issue: Backend not connecting to MongoDB?**  
  Ensure that MongoDB is running and that the **MONGODB_URI** in your `.env` file is correct.

- **Issue: Tailwind styles not applying?**  
  Ensure that Tailwind is correctly imported in `index.css` and that `vite.config.js` is set up properly.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo, make improvements, and submit a pull request.

## 📜 License
This project is **MIT Licensed**. You’re free to use, modify, and distribute it.

## 📬 Contact
📧 **Deep Raj Verma** – [LinkedIn](https://www.linkedin.com/in/vermadeepraj)  
🐙 **GitHub** – [vermadeepraj](https://github.com/vermadeepraj)

