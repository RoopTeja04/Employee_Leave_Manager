import React from 'react';
import CreateEmployee from "../subComponents/CreateEmployee";
import TotalEmployee from '../subComponents/TotalEmployee';
import LeavesApplied from '../subComponents/LeavesApplied'
import { useNavigate } from 'react-router-dom';

const admin = () => {

    const Navigate = useNavigate();

    const [view, setView] = React.useState("createEmployee");

    const renderComponent = () => {
        switch (view) {
            case "createEmployee":
                return <CreateEmployee />;
            case "totalEmployee":
                return <TotalEmployee />;
            case "leavesApplied":
                return <LeavesApplied />;
            default:
                return <CreateEmployee />;
        }
    }

    const tabs = [
        { name: "Create Employee", value: "createEmployee" },
        { name: "Total Employee", value: "totalEmployee" },
        { name: "Leaves Applied", value: "leavesApplied" },
    ]

    const handleLogOut = () => {
        localStorage.removeItem("User");
        localStorage.removeItem("Token");

        Navigate("/")
    }

    return (
        <>
            <div>
                <div className="bg-gray-300 shadow-md p-4 mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                    <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer">Log Out</button>
                </div>
                <div>
                    <div className="flex space-x-4 px-4" aria-label="Tabs">
                        {
                            tabs.map((tab) => (
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
                            ))
                        }
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out" >
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default admin