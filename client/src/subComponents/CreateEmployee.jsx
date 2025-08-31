import React from "react";
import { userRegister } from "../api/API";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const CreateEmployee = () => {
    const DefaultValues = {
        name: "",
        email: "",
        password: "",
        department: "",
        role: "",
        joinedAt: ""
    };

    const [newAccount, setNewAccount] = React.useState(DefaultValues);
    const [visible, setVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleVisible = () => setVisible(!visible);

    const handleChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    };

    const handleSaveData = async () => {
        setIsLoading(true);
        try {
            const res = await userRegister(newAccount);

            if (res.status === 200 && res.data) {
                toast.success(res.data.message, { duration: 3000 });
                setNewAccount(DefaultValues);
            }
        } catch (err) {
            console.error("Failed:", err);
            toast.error("Creation failed. Please try again later!", { duration: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Create New Employee
            </h1>

            <div className="flex flex-col space-y-5">
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={newAccount.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={newAccount.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="relative">
                    <input
                        type={visible ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={newAccount.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <span
                        onClick={handleVisible}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        {visible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <input
                    type="text"
                    placeholder="Department"
                    name="department"
                    value={newAccount.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Role"
                    name="role"
                    value={newAccount.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="date"
                    placeholder="Joined At"
                    name="joinedAt"
                    value={newAccount.joinedAt}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSaveData}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Creating Account...
                        </div>
                    ) : (
                        "Create Employee"
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateEmployee;