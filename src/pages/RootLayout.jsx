import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function RootLayout() {
    return(
        <div className="flex flex-col sm:flex-row h-screen bg-green-100 select-none">
            <Sidebar />
            <div className="sm:w-4/5 h-full w-full">
                <Outlet />
            </div>
        </div>
    )
}