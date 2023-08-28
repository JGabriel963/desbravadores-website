import { MdAlternateEmail, MdOutlinePassword } from "react-icons/md";
import { PiSpinnerGap } from "react-icons/pi";
import { Link, Navigate } from "react-router-dom";
import logo from "../../../public/d4.png";
import { AuthContext } from "../../context/auth";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loadindAuth } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" && password === "") {
      toast.error("Preencha todos os campos");
    }

    if (email !== "" && password !== "") {
      await signIn(email, password);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-green-300">
      <div className="flex flex-col sm:flex-row w-[90%] md:w-[70%] h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col justify-center flex-1 py-4 px-6 bg-white">
          <h1 className="text-3xl font-extrabold text-center mb-4 text-green-900">
            Fazer Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center p-3 gap-4 rounded-full bg-green-200 text-gray-500">
              <label htmlFor="email">
                <MdAlternateEmail />
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nome do Clube"
                className="bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center p-3 gap-4 rounded-full bg-green-200 text-gray-500 ">
              <label htmlFor="password">
                <MdOutlinePassword />
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="bg-transparent outline-none"
              />
            </div>

            <button className="p-4 bg-red-600 hover:bg-red-700 transition-colors rounded-xl text-white w-4/5 mx-auto block">
              {loadindAuth ? (
                <PiSpinnerGap
                  size={20}
                  className="block mx-auto animate-spin"
                />
              ) : (
                "Acessar"
              )}
            </button>
          </form>
        </div>
        <div className="flex flex-col flex-1 justify-center items-center bg-emerald-600 p-4 text-white space-y-4">
          <div className="w-full">
            <img src={logo} alt="logo" width={200} className="sm:block mx-auto hidden" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold">
              Ainda não cadastrou seu clube?
            </h2>
          </div>
          <Link
            to="/register"
            className="p-2 border-2 rounded-lg w-1/2 hover:bg-emerald-700 transition-colors text-center"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
}
