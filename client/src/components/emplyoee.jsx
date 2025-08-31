import React from 'react';
import ApplyLeave from '../subComponents/applyLeave';
import LeaveBalance from '../subComponents/leaveBalance';
import StatusLeaves from '../subComponents/statusLeaves';
import { useNavigate } from 'react-router-dom';

const emplyoee = () => {

    const Navigate = useNavigate();

    const [view, setView] = React.useState("applyleave");

    const renderComponent = () => {
        switch (view) {
            case "applyLeave":
                return <ApplyLeave />;
            case "leaveBalance":
                return <LeaveBalance />;
            case "statusLeaves":
                return <StatusLeaves />;
            default:
                return <ApplyLeave />;
        }
    };

    const tabs = [
        { name: "Apply Leave", value: "applyLeave" },
        { name: "Leave Balance", value: "leaveBalance" },
        { name: "Status Leaves", value: "statusLeaves" },
    ];

    const handleLogOut = () => {
        localStorage.removeItem("User");
        localStorage.removeItem("Token");

        Navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Leave Management System
                </h1>

                <div className="bg-white border-b">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-4 px-4" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setView(tab.value)}
                                    className={`${view === tab.value
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }
                                    cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                                    focus:outline-none tracking-wide`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                            <button
                                onClick={handleLogOut}
                                className="ml-auto flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 my-4 cursor-pointer"
                            >
                                Logout
                            </button>
                        </nav>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default emplyoee