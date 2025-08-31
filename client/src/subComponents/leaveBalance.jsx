import React from 'react'
import { LeaveBalance } from '../api/API';

const leaveBalance = () => {

    const [balanceData, setBalanceData] = React.useState({});
    const [activeTab, setActiveTab] = React.useState("approved");

    React.useEffect(() => {
        const fetchBalance = async () => {
            try {
                const res = await LeaveBalance(localStorage.getItem("User"));
                if (res.status === 200 && res.data)
                    setBalanceData(res.data);
                else
                    throw new Error("Error in fetching leave balance!");
            } catch (err) {
                console.log(err);
                alert(err.response?.data?.message || "Error in fetching leave balance!");
            }
        };
        fetchBalance();
    }, []);

    const filterLeaves = (status) => {
        return balanceData.leaves?.filter((leave) => leave.status === status) || [];
    };

    const tabs = ["approved", "rejected"];

    return (
        <div className="max-w-4xl mx-auto p-6">

            <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
                <div className="text-center">
                    <p className="text-gray-600">Total Leaves Per Year</p>
                    <p className="text-lg font-bold">{balanceData.TotalLeavesPerYear}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">Total Leaves Taken</p>
                    <p className="text-lg font-bold">{balanceData.totalLeaveDaysTaken}</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-600">Remaining Leaves</p>
                    <p className="text-lg font-bold">{balanceData.totalLeaves}</p>
                </div>
            </div>

            <div className="flex space-x-4 border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium cursor-pointer ${activeTab === tab
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        <span className="text-sm text-gray-500">
                            ({filterLeaves(tab).length})
                        </span>
                    </button>
                ))}
            </div>

            <div className="bg-white shadow rounded-lg p-4">
                {filterLeaves(activeTab).length > 0 ? (
                    <ul className="space-y-3">
                        {filterLeaves(activeTab).map((leave) => (
                            <li
                                key={leave._id}
                                className="p-3 border rounded-md flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium text-gray-700">{leave.reason}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(leave.startDate).toLocaleDateString("en-GB")} -{" "}
                                        {new Date(leave.endDate).toLocaleDateString("en-GB")}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${leave.status === "approved"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {leave.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">
                        No {activeTab} leaves found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default leaveBalance