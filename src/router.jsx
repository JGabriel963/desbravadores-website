import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import DbvLayout from "./pages/Desbravador/DbvLayout";
import ListDbv from "./pages/Desbravador/ListDbv";
import AddDbv from "./pages/Desbravador/AddDbv";
import ShowDbv from "./pages/Desbravador/ShowDbv";
import UpdateDbv from "./pages/Desbravador/UpdateDbv";

const router = createBrowserRouter([{
    path: "/",
    element: <RootLayout />,
    children: [
        {index: true, element: <Home />},
        {
            path: "desbravadores",
            element: <DbvLayout />,
            children: [
                {index: true, element: <ListDbv />},
                {path: "new", element: <AddDbv />},
                {path: ":id", element: <ShowDbv />},
                {path: ":id/update", element: <UpdateDbv />}
            ]
        }
    ]
}])

export default router