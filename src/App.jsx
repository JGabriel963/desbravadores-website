import { RouterProvider } from "react-router-dom"
import router from "./router"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return(
    <>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </>
  )
}