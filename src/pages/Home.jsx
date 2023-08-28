import { useContext, useEffect, useState } from "react";
import BoxDash from "../Components/BoxDash";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [desbravadores, setDesbravadores] = useState([]);
  const [batizados, setBatizados] = useState([]);
  const [notBaptized, setNotBaptized] = useState([]);
  const [diretoria, setDiretoria] = useState([]);
  const [loadInfoDbv, setLoadInfoDbv] = useState(true);
  const [loadInfoDiretoria, setLoadInfoDiretoria] = useState(true);

  useEffect(() => {
    async function loadDbv() {
      let listDbv = [];

      const q = query(
        collection(db, "desbravadores"),
        where("userId", "==", String(user.uid))
      );

      await getDocs(q)
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            listDbv.push(doc.data());
          });

          setDesbravadores(listDbv);
          setBatizados(listDbv.filter((doc) => doc.baptized === "Sim"));
          setNotBaptized(listDbv.filter((doc) => doc.baptized === "Não"));
          console.log(user.uid);
          setLoadInfoDbv(false);
        })
        .catch((error) => {
          toast.error("Erro ao buscar desbravadores");
          console.log(error);
        });
    }

    loadDbv();
  }, []);

  useEffect(() => {
    let listDiretoria = [];

    const q = query(
      collection(db, "diretoria"),
      where("userId", "==", String(user.uid))
    );

    async function loadDiretoria() {
      await getDocs(q)
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            listDiretoria.push(doc.data());
          });

          setDiretoria(listDiretoria);
          setLoadInfoDiretoria(false);
        })
        .catch((error) => {
          toast.error("Erro ao buscar diretoria");
          console.log(error);
        });
    }

    loadDiretoria();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-2xl text-green-900">
        Clube {user.name}
      </h1>
      <div className="grid grid-cols-2  sm:grid-cols-3 gap-6 mt-4">
        <BoxDash
          title="Desbravadores"
          quantity={desbravadores.length}
          loadInfo={loadInfoDbv}
        />
        <BoxDash
          title="Diretoria"
          quantity={diretoria.length}
          loadInfo={loadInfoDiretoria}
        />
        <BoxDash
          title="Total"
          quantity={desbravadores.length + diretoria.length}
          loadInfo={loadInfoDbv}
        />
        <div className="col-span-3 flex flex-row sm:flex-row gap-6 justify-center">
          <BoxDash
            title="Batizados"
            quantity={batizados.length}
            loadInfo={loadInfoDbv}
          />
          <BoxDash
            title="Não Batizados"
            quantity={notBaptized.length}
            loadInfo={loadInfoDbv}
          />
        </div>
      </div>
    </div>
  );
}
