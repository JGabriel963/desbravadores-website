import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function RootLayout() {
    return(
        <div className="flex h-screen bg-green-100 select-none">
            <Sidebar />
            <div className="w-4/5 h-full">
                <Outlet />
            </div>
        </div>
    )
}