import React from 'react'
import { LeaveStatus } from '../api/API';

const statusLeaves = () => {

    const [statusData, setStatusData] = React.useState([]);

    React.useEffect(() => {

        const FetchStatus = async () => {

            try {

                const res = await LeaveStatus(localStorage.getItem("User"));

                if (res.status === 200 && res.data)
                    setStatusData(res.data);

                else
                    throw new Error("Error in fetching leave status!");

            }
            catch (err) {
                console.log(err);
                alert(err.response?.data?.message || "Error in fetching leave status!");
            }

        }

        FetchStatus();

    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Leave Status</h2>
                    {statusData.totalLeaves && (
                        <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            Total Leaves: {statusData.totalLeaves}
                        </span>
                    )}
                </div>

                <div className="p-4">
                    {statusData.leaves && statusData.leaves.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Start Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            End Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Reason
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {statusData.leaves.map((leave, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(leave.startDate).toLocaleDateString("en-GB")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(leave.endDate).toLocaleDateString("en-GB")}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                {leave.reason}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${leave.status === 'approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : leave.status === 'rejected'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {leave.status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">No leaves applied yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default statusLeaves