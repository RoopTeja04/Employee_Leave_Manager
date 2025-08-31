import axios from "axios";

const API = axios.create({

    baseURL: "https://employee-leave-manager-1.onrender.com",
    headers: { "Content-Type": "application/json" }

})

export const userRegister = (data) => API.post("/api/user/register", data);
export const UserLogin = (data) => API.post("/api/user/login", data);
export const ApplyLeave = (data) => API.post("/api/leave/apply", data);
export const LeaveStatus = (emplyoeeName) => API.get(`/api/leave/status/${emplyoeeName}`);
export const LeaveBalance = (employeeName) => API.get(`/api/leave/balance/${employeeName}`);
export const allUsers = () => API.get("/api/user/all");
export const allLeaves = () => API.get("/api/leave/all");
export const updateLeaveStatus = (leaveId, data) => API.put(`/api/leave/update/${leaveId}`, data);