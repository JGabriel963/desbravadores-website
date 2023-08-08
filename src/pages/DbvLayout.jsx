import { Outlet } from "react-router-dom";

export default function DbvLayout() {
    return (
        <div className="border-2 overflow-hidden overflow-y-scroll h-[95%] m-4 rounded-lg p-5">
            <Outlet />
        </div>
    )
}