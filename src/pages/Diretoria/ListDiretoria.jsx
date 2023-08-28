import { db } from "../../../firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import TableDbv from "../../Components/TableDbv";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const dbvRef = collection(db, "diretoria");

export default function ListDiretoria() {
  const {user} = useContext(AuthContext)
  const [loadDbv, setloadDbv] = useState(true);
  const [diretoria, setDiretoria] = useState([]);

  useEffect(() => {
    async function loadDbv() {
      const q = query(dbvRef, where("userId", "==", String(user.uid)), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      setDiretoria([]);
      await updateState(querySnapshot);

      setloadDbv(false);
    }

    loadDbv();

    return () => {};
  }, []);

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;

    if (!isCollectionEmpty) {
      let list = [];

      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          nome: doc.data().name,
          email: doc.data().email,
          telefone: doc.data().phone,
        });
      });

      setDiretoria((diretoria) => [...diretoria, ...list]);
    }

  }

  if (loadDbv) {
    return (
      <div>
        <span className="text-2xl font-extrabold">Buscando Registros...</span>
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-extrabold mb-6 text-green-500">Diretoria</h1>

      <>
        {diretoria.length === 0 ? (
          <div className="space-y-4 mt-8 flex flex-col items-center">
            <span className="block text-xl">
              Nenhum membro da diretoria resgistrado
            </span>

            <Link
              to="/diretoria/new"
              className="flex justify-center gap-3 w-1/2 bg-red-600 hover:scale-110 hover:bg-red-700 transition-all font-bold text-white p-2 rounded-md "
            >
              Adicionar DBV
            </Link>
          </div>
        ) : (
          <TableDbv desbravadores={diretoria} linkTo="diretoria" />
        )}
      </>
    </section>
  );
}
