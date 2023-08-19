import { useEffect, useState } from "react";
import BoxDash from "../Components/BoxDash";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import placa from "../../public/placa-3.png";

export default function Home() {
  const [desbravadores, setDesbravadores] = useState([]);
  const [batizados, setBatizados] = useState([]);
  const [notBaptized, setNotBaptized] = useState([]);
  const [diretoria, setDiretoria] = useState([]);
  const [loadInfoDbv, setLoadInfoDbv] = useState(true);
  const [loadInfoDiretoria, setLoadInfoDiretoria] = useState(true);
  const a = "abacata";

  useEffect(() => {
    async function loadDbv() {
      let listDbv = [];
      let batizados = [];

      await getDocs(collection(db, "desbravadores"))
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            listDbv.push(doc.data());
          });

          setDesbravadores(listDbv);
          setBatizados(listDbv.filter((doc) => doc.baptized === "Sim"));
          setNotBaptized(listDbv.filter((doc) => doc.baptized === "Não"));
          console.log(desbravadores);
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

    async function loadDiretoria() {
      await getDocs(collection(db, "diretoria"))
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
      <h1 className="font-extrabold text-2xl text-green-900">Clube Nova Jerusalém</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-6 mt-4">
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
        <div className="col-span-3 flex flex-col sm:flex-row gap-6 justify-center">
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
