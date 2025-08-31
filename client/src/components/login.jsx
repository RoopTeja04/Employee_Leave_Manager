import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { UserLogin } from '../api/API';
import { useNavigate } from 'react-router-dom';

const login = () => {

    const Navigate = useNavigate();

    const DefaultValues = { email: "", password: "" }

    const [visible, setVisible] = React.useState(false);
    const [formData, setFormData] = React.useState(DefaultValues);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleVisible = () => {
        setVisible(!visible);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleUserData = async () => {
        setIsLoading(true);
        try {
            const res = await UserLogin(formData);

            if (res.status === 200) {

                localStorage.setItem("Token", res.data.token);
                localStorage.setItem("User", res.data.name);

                if (res.data.role === "admin") {
                    Navigate("/admin");
                } else {
                    Navigate("/employee");
                }

                setFormData(DefaultValues);
            } else {
                throw new Error('Login failed! Please try again...');
            }
        }
        catch (err) {
            console.error('Login error:', err);
            alert('Login failed. Please check your credentials.');
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-pink-400">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
                    <span className="text-gray-600">Leave Management System</span>
                </div>
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={visible ? "text" : "password"}
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span
                            onClick={handleVisible}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {visible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleUserData}
                    disabled={isLoading}
                    className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-transform duration-200 hover:scale-105 disabled:opacity-50 cursor-pointer"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Signing in...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </div>
        </div>
    )
}

export default login