import { FaHome } from "react-icons/fa";
import {
  BsFillPersonLinesFill,
  BsFillPersonPlusFill,
  BsFillFilePersonFill,
} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import logo from "../../../public/logo-3d.webp";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";
import Modal from "../Modal";

export default function Sidebar() {
  const [openModal, setOpenModal] = useState(false);
  const { logout, user } = useContext(AuthContext);

  return (
    <section className="hidden sm:block bg-green-600 h-full w-1/5 py-6 px-4">
      <div className="rounded-full w-[90px] h-[90px] mx-auto flex justify-center items-center mb-10">
        <img src={logo} alt="" />
      </div>
      <div className=" text-white">
        <h1 className="p-2 border-green-900 text-green-900 font-extrabold rounded-md bg-green-700">
          MENU
        </h1>
        <div className="flex flex-col items-start">
          <Link to="/main" className="w-full">
            <button className="button">
              <FaHome />
              Início
            </button>
          </Link>
          <Link to="/main/desbravadores" className="w-full">
            <button className="button">
              <BsFillPersonLinesFill />
              Desbravadores
            </button>
          </Link>
          <Link to="/main/diretoria" className="w-full">
            <button className="button">
              <BsFillFilePersonFill />
              Diretoria
            </button>
          </Link>
          <Link to="/main/desbravadores/new" className="w-full">
            <button className="button">
              <BsFillPersonPlusFill />
              Cadastrar DBV
            </button>
          </Link>
          <button className="button" onClick={() => setOpenModal(!openModal)}>
            <BiLogOut />
            Sair
          </button>
        </div>
      </div>

      {openModal ? (
        <Modal
          close={() => setOpenModal(!openModal)}
          title="Atenção"
          message={`Tem certeza que deseja sair?`}
          deleteDbv={logout}
        />
      ) : null}
    </section>
  );
}
