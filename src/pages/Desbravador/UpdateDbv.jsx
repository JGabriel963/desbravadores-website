import { db } from "../../../firebase";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DbvForm from "../../Components/Form";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal";

export default function UpdateDbv() {
  const [openModal, setOpenModal] = useState(false)
  const { id } = useParams();
  const [desbravador, setDesbravador] = useState({});
  const [loadDbvCustomer, setLoadDbvCustomer] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    async function loadDbv() {
      if (id) {
        await getDoc(doc(db, "desbravadores", id))
          .then((snapshot) => {
            let itemDbv = {
              id: snapshot.id,
              office: snapshot.data().office,
              name: snapshot.data().name,
              sex: snapshot.data().sex,
              sizeShirt: snapshot.data().sizeShirt,
              dateBirth: snapshot.data().dateBirth,
              phone: snapshot.data().phone,
              maritalStatus: snapshot.data().maritalStatus,
              email: snapshot.data().email,
              address: snapshot.data().address,
              number: snapshot.data().number,
              cep: snapshot.data().cep,
              bairro: snapshot.data().bairro,
              city: snapshot.data().city,
              state: snapshot.data().state,
              rg: snapshot.data().rg,
              cpf: snapshot.data().cpf,
              nameMother: snapshot.data().nameMother,
              phoneMother: snapshot.data().phoneMother,
              emailMother: snapshot.data().emailMother,
              nameFather: snapshot.data().nameFather,
              phoneFather: snapshot.data().phoneFather,
              emailFather: snapshot.data().emailFather,
              nameResponsible: snapshot.data().nameResponsible,
              phoneResponsible: snapshot.data().phoneResponsible,
              emailResponsible: snapshot.data().emailResponsible,
              cpfResponsible: snapshot.data().cpfResponsible,
              baptized: snapshot.data().baptized,
            };

            setDesbravador(itemDbv);
            setLoadDbvCustomer(false);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Erro ao buscar Desbravador");
          });
      }
    }

    loadDbv();
  }, [id]);

  async function handleDeleteDbv() {
    await deleteDoc(doc(db, "desbravadores", id))
    .then(() => {
      setOpenModal(false)
      toast.success("Excluido com sucesso")
      navigate("/desbravadores")
    })
    .catch((error) => {
      console.log(error)
      toast.error("Erro ao excluir")
    })
  }

  return (
    <div>
      <h1 className="font-extrabold text-blue-500 text-2xl mb-3">
        Atualizar Membro - Desbravador
      </h1>

      {!loadDbvCustomer ? (
        <>
          <DbvForm itemToUpdate={desbravador} />
          <hr className="border-1 mt-3 border-gray-400" />
        </>
        
      ) : (
        <h2>Encontrando item</h2>
      )}

      {!loadDbvCustomer ? (
        <div className="flex flex-col items-center mt-8 space-y-4 mx-auto">
          <h3 className="text-2xl font-bold text-red-800">Zona de Perigo</h3>
          <button
            className="bg-red-500 w-1/2 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => setOpenModal(!openModal)}
          >
            Excluir
          </button>
        </div>
      ) : null}
      <Modal isOpen={openModal} setIsOpen={setOpenModal} title="Atenção" message={`Tem cereza que desaja excluir o desbravador ${desbravador.name} dos registros`} deleteDbv={handleDeleteDbv} />
    </div>
  );
}
