import { BrowserRouter } from "react-router-dom";
import RoutersApp from "./router";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/auth";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ToastContainer autoClose={3000} />
          <RoutersApp />
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}
