import { Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import DbvLayout from "./pages/DbvLayout";
import ListDbv from "./pages/Desbravador/ListDbv";
import AddDbv from "./pages/Desbravador/AddDbv";
import ShowDbv from "./pages/Desbravador/ShowDbv";
import UpdateDbv from "./pages/Desbravador/UpdateDbv";
import ListDiretoria from "./pages/Diretoria/ListDiretoria";
import ShowDiretoria from "./pages/Diretoria/ShowDiretoria";
import UpdateDiretoria from "./pages/Diretoria/UpdateDiretoria";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Private from "./pages/Private";

export default function RoutersApp() {
  return (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      <Route path="/main" element={<RootLayout />}>
        <Route index element={<Private> <Home /> </Private>} />
        <Route path="desbravadores" element={<DbvLayout />}>
          <Route index element={<Private> <ListDbv /> </Private>} />
          <Route path="new" element={<Private> <AddDbv /> </Private>} />
          <Route path=":id" element={<Private> <ShowDbv /> </Private>} />
          <Route path=":id/update" element={<Private> <UpdateDbv /> </Private>} />
        </Route>
        <Route path="diretoria" element={<DbvLayout />}>
          <Route index element={<Private> <ListDiretoria /> </Private>} />
          <Route path=":id" element={<Private> <ShowDiretoria /> </Private>} />
          <Route path=":id/update" element={<Private> <UpdateDiretoria /> </Private>} />
        </Route>
      </Route>
    </Routes>
  );
}
