import React from 'react'
import { ApplyLeave } from '../api/API';

const applyLeave = () => {

    const DefaultValues = {
        employeeName: "" || localStorage.getItem("User"),
        startDate: "",
        endDate: "",
        reason: ""
    }

    const [applyData, setApplyData] = React.useState(DefaultValues);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (e) => {
        setApplyData({ ...applyData, [e.target.name]: e.target.value });
    }

    const handleApplyLeave = async () => {
        setIsLoading(true);

        try {
            const res = await ApplyLeave(applyData);
            if (res.status === 200) {
                setSuccess(res.data.message);
                setError("");
                setApplyData(DefaultValues);
            }
        }
        catch (err) {
            setError(err.response?.data?.message || "Error in applying leave!");
            setSuccess("");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white shadow-sm border rounded-md p-6">
                <div className="flex items-center mb-6 pb-4 border-b">
                    <span className="text-gray-600">Employee Name:</span>
                    <span className="ml-2 text-lg font-semibold capitalize text-gray-800">
                        {localStorage.getItem("User")}
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={applyData.startDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={applyData.endDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reason
                        </label>
                        <textarea
                            name="reason"
                            value={applyData.reason}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Please specify your reason for leave..."
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 bg-green-50 text-green-600 rounded-md text-sm">
                            {success}
                        </div>
                    )}

                    <button
                        onClick={handleApplyLeave}
                        disabled={isLoading || !applyData.startDate || !applyData.endDate || !applyData.reason}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium
                            ${isLoading || !applyData.startDate || !applyData.endDate || !applyData.reason
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 transition-colors'}
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Applying...
                            </div>
                        ) : (
                            'Apply Leave'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default applyLeave;