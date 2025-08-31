
# Leave Management System

## 📌 Project Description
Leave Management System is a web application designed to manage employee leaves and attendance.  
The application allows employees to apply for leaves, view their leave balance, and receive notifications when their leave requests are approved or rejected.  
The system also provides an admin dashboard for managing employee data, leave policies, and notifications.

---

## 🚀 Features

### 👨‍💼 Employee Leave Management
- Apply for leaves  
- View leave balance  
- Receive notifications for leave approvals/rejections

### 🛠️ Admin Dashboard
- Manage employee data  
- Configure leave policies  
- View leave requests and approvals  
- Send notifications to employees

### 🔒 User Authentication
- Login/Logout functionality  
- Password protection for employee and admin accounts  

---

## 🛠️ Technologies Used
- **Frontend:** React, JavaScript, HTML, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **APIs:** RESTful APIs for data exchange between frontend and backend  

---

## 📂 Project Structure
```
client/     -> Frontend code (React, JavaScript, HTML, Tailwind CSS)
server/     -> Backend code (Node.js, Express.js)
models/     -> Database schema definitions (MongoDB)
utils/      -> Utility functions for email sending and other tasks
```

---

## 🔗 API Endpoints

- `POST /api/user/register` → Register a new employee  
- `POST /api/user/login` → Login an existing employee  
- `POST /api/leave/apply` → Apply for a leave  
- `GET /api/leave/balance` → View leave balance  
- `GET /api/leave/status` → View leave status  
- `GET /api/admin/dashboard` → Admin dashboard for managing employee data and leave policies  

---

## ⚙️ Installation and Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/RoopTeja04/Employee_Leave_Manager.git
   ```

2. Install dependencies  
   ```bash
   cd client && npm install  
   cd ../server && npm install  
   ```

3. Start the backend server  
   ```bash
   node server.js
   ```

4. Start the frontend development server  
   ```bash
   cd client  
   npm start
   ```

---

## 🤝 Contributing
Contributions are welcome! Please submit a pull request with a clear description of the changes made.

---

## 📜 License
This project is licensed under the **MIT License**.
