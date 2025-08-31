import React, { useEffect, useState } from "react";
import { allUsers } from "../api/API";
import toast from "react-hot-toast";

const TotalEmployee = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("IT");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const FetchUsers = async () => {
            try {
                const res = await allUsers();

                if (res.status === 200 && res.data) {
                    setData(res.data);
                } else {
                    throw new Error("Error in fetching users!");
                }
            } catch (err) {
                const msg = err.response?.data?.message || "Error in fetching users!";
                setError(msg);
                toast.error(msg);
            } finally {
                setLoading(false);
            }
        };
        FetchUsers();
    }, []);

    const filterDepartment = (department) => {
        return (
            data.filter(
                (user) =>
                    user.department &&
                    user.department.toLowerCase() === department.toLowerCase()
            ) || []
        );
    };

    const tabs = ["IT", "Dev", "Des", "BDA", "Business Analyst"];

    return (
        <div className="min-h-screen w-full bg-gray-100 p-10">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8 h-full flex flex-col">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        👥 Employee Dashboard
                    </h1>
                    <span className="text-xl font-bold text-blue-600">
                        Total: {data.length || 0}
                    </span>
                </div>

                <div className="flex space-x-8 border-b mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-lg font-medium transition cursor-pointer ${activeTab === tab
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
                        Loading employees...
                    </div>
                )}

                {error && !loading && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                {!loading && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1 overflow-y-auto">
                        {filterDepartment(activeTab).length > 0 ? (
                            filterDepartment(activeTab).map((user) => (
                                <div
                                    key={user._id}
                                    className="p-5 bg-gray-50 border rounded-xl shadow hover:shadow-md transition flex flex-col"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                        {(user.name).charAt(0).toUpperCase() + (user.name).slice(1)}
                                    </h2>
                                    <p className="text-sm text-gray-600">📧 {user.email}</p>
                                    <p className="text-sm text-gray-600">
                                        📅 Joined:{" "}
                                        {new Date(user.joinedAt).toLocaleDateString("en-GB")}
                                    </p>
                                    <p className="text-sm text-gray-600">🎭 Role: {user.role}</p>
                                    <p className="text-sm text-gray-600">
                                        🏢 Department: {user.department}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10 text-lg">
                                No employees found in <b>{activeTab}</b> department.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TotalEmployee;