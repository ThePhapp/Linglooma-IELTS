import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="dashboard-sidebar">
                <Sidebar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="dashborad-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Admin;

