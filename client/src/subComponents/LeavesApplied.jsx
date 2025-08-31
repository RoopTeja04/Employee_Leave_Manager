import React from 'react'
import { allLeaves, updateLeaveStatus } from '../api/API';

const LeavesApplied = () => {
    const [leaves, setLeaves] = React.useState([]);
    const [error, setError] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("pending");

    React.useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await allLeaves();
            if (res.status === 200 && res.data && res.data.leaves) {
                setLeaves(res.data.leaves);
            } else {
                setError("No Leaves Applied by any Employee!...");
            }
        } catch (err) {
            setError("Error in fetching leaves!");
        }
    };

    const filterLeaves = (status) => {
        return leaves.filter((leave) => leave.status === status) || [];
    };

    const handleUpdate = async (leaveId, status) => {
        try {
            const res = await updateLeaveStatus(leaveId, { status });
            if (res.status === 200) {
                fetchLeaves();
            }
        } catch (err) {
            console.error("Error updating leave:", err);
        }
    };

    const tabs = ["pending", "approved", "rejected"];

    return (
        <>
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
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
                        <span className="text-sm text-gray-500">
                            ({filterLeaves(tab).length})
                        </span>
                    </button>
                ))}
            </div>

            <div>
                {error && <p className="text-red-500">{error}</p>}

                {filterLeaves(activeTab).length === 0 ? (
                    <p className="text-gray-500 text-center mt-6">
                        {activeTab === "approved" && "No Approved Leaves"}
                        {activeTab === "rejected" && "No Rejected Leaves"}
                        {activeTab === "pending" && "No Pending Leaves"}
                    </p>
                ) : (
                    filterLeaves(activeTab).map((leave) => (
                        <div
                            key={leave._id}
                            className="p-4 mb-3 border rounded-lg shadow-sm"
                        >
                            <p className="font-semibold">{leave.employee?.name}</p>
                            <p>
                                {new Date(leave.startDate).toLocaleDateString()} →{" "}
                                {new Date(leave.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">Reason: {leave.reason}</p>
                            <p
                                className={`font-medium ${leave.status === "approved"
                                    ? "text-green-600"
                                    : leave.status === "rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }`}
                            >
                                Status: {(leave.status).charAt(0).toUpperCase() + leave.status.slice(1)}
                            </p>

                            {activeTab === "pending" && (
                                <div className="mt-3 flex gap-4">
                                    <button
                                        onClick={() => handleUpdate(leave._id, "approved")}
                                        className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(leave._id, "rejected")}
                                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default LeavesApplied;