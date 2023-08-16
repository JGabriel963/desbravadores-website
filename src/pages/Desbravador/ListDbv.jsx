import { db } from "../../../firebase";
import {
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import TableDbv from "../../Components/TableDbv";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dbvRef = collection(db, "desbravadores");

export default function ListDbv() {
  const [loadDbv, setloadDbv] = useState(true);
  const [desbravadores, setDebravadores] = useState([]);

  useEffect(() => {
    async function loadDbv() {
      const q = query(dbvRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      setDebravadores([]);
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

      setDebravadores((desbravadores) => [...desbravadores, ...list]);
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
      <h1 className="text-2xl font-extrabold mb-6 text-green-500">Desbravadores</h1>

      <>
        {desbravadores.length === 0 ? (
          <div className="space-y-4 mt-8 flex flex-col items-center">
            <span className="block text-xl ">
              Nenhum desbravador resgistrado
            </span>

            <Link
              to="/desbravadores/new"
              className="flex justify-center gap-3 w-1/2 bg-red-600 hover:scale-110 hover:bg-red-700 transition-all font-bold text-white p-2 rounded-md "
            >
              Adicionar DBV
            </Link>
          </div>
        ) : (
          <TableDbv desbravadores={desbravadores} linkTo="desbravadores" />
        )}
      </>
    </section>
  );
}
