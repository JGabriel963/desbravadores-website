import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import profileMasculina from "../../../public/boy-desbravador.png";
import profileFemenino from "../../../public/girl-desbravador.png";

const label = "font-extrabold";

export default function ShowDbv() {
  const [desbravador, setDesbravador] = useState({});
  const [loadDbv, setLoadDbv] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let infoDbv = {};

    async function loadDbv() {
      await getDoc(doc(db, "desbravadores", id))
        .then((spnashot) => {
          infoDbv = {
            name: spnashot.data().name,
            sex: spnashot.data().sex,
            sizeShirt: spnashot.data().sizeShirt,
            dateBirth: spnashot.data().dateBirth,
            phone: spnashot.data().phone,
            maritalStatus: spnashot.data().maritalStatus,
            email: spnashot.data().email,
            address: spnashot.data().address,
            number: spnashot.data().number,
            cep: spnashot.data().cep,
            bairro: spnashot.data().bairro,
            city: spnashot.data().city,
            state: spnashot.data().state,
            rg: spnashot.data().rg,
            cpf: spnashot.data().cpf,
            nameMother: spnashot.data().nameMother,
            phoneMother: spnashot.data().phoneMother,
            emailMother: spnashot.data().emailMother,
            nameFather: spnashot.data().nameFather,
            phoneFather: spnashot.data().phoneFather,
            emailFather: spnashot.data().emailFather,
            nameResponsible: spnashot.data().nameResponsible,
            phoneResponsible: spnashot.data().phoneResponsible,
            emailResponsible: spnashot.data().emailResponsible,
            cpfResponsible: spnashot.data().cpfResponsible,
            baptized: spnashot.data().baptized,
          };

          setDesbravador(infoDbv);
          setLoadDbv(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao consultar desbravador!");
        });
    }

    loadDbv();
  }, []);

  if (loadDbv) {
    return <h1>Carregando...</h1>;
  }

  function handleIdade(dateBirth) {
    // desbravador.dateBirth = 19/05/2002
    const dateParts = dateBirth.split("/");
    const birthDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    ).getFullYear();

    return new Date().getFullYear() - birthDate;
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-blue-400 border-b-2 border-gray-200">
        Desbravador - {desbravador.name}
      </h1>
      <div className="mt-4 space-y-4 text-gray-500">
        <div className="w-[250px] h-[250px] rounded-full overflow-hidden border-4">
          <img
            src={
              desbravador.sex === "Masculino"
                ? profileMasculina
                : profileFemenino
            }
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <h2 className="font-extrabold text-2xl border-b-2">
          Informações Gerais:
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-[90%] md:w-full">
          <p>
            <span className={label}>Sexo:</span> {desbravador.sex}
          </p>
          <p>
            <span className={label}>Idade:</span>{" "}
            {handleIdade(desbravador.dateBirth)}
          </p>
          <p>
            <span className={label}>Data de Nascimento:</span>{" "}
            {desbravador.dateBirth}
          </p>
          <p>
            <span className={label}>Telefone:</span> {desbravador.phone}
          </p>
          <p>
            <span className={label}>Email:</span>{" "}
            {desbravador.email ? desbravador.email : "Não contém"}
          </p>
          <p>
            <span className={label}>Tamanho da Camisa:</span>{" "}
            {desbravador.sizeShirt}
          </p>
          <p>
            <span className={label}>Estado civil:</span>{" "}
            {desbravador.maritalStatus}
          </p>
          <p>
            <span className={label}>Estado:</span> {desbravador.state}
          </p>
          <p>
            <span className={label}>Cidade:</span> {desbravador.city}
          </p>
          <p>
            <span className={label}>CEP:</span> {desbravador.cep}
          </p>
          <p>
            <span className={label}>Bairro:</span> {desbravador.bairro}
          </p>
          <p>
            <span className={label}>Endereço: </span>
            {desbravador.address}
            {", "}
            {desbravador.number}
          </p>
          <p>
            <span className={label}>CPF: </span>
            {desbravador.cpf}
          </p>
          <p>
            <span className={label}>RG: </span>
            {desbravador.rg}
          </p>
          <span className="border-b-2 w-1/2"></span>
          <p>
            <span className={label}>Mãe: </span>
            {desbravador.nameMother}
          </p>
          <p>
            <span className={label}>Telefone: </span>
            {desbravador.phoneMother}
          </p>
          <p>
            <span className={label}>Email: </span>
            {desbravador.emailMother}
          </p>
          <p>
            <span className={label}>Pai: </span>
            {desbravador.nameFather}
          </p>
          <p>
            <span className={label}>Telefone: </span>
            {desbravador.phoneFather}
          </p>
          <p>
            <span className={label}>Email: </span>
            {desbravador.emailFather}
          </p>
          {desbravador.nameResponsible && (
            <>
              <p>
                <span className={label}>Responsável: </span>
                {desbravador.nameResponsible}
              </p>
              <p>
                <span className={label}>Telefone: </span>
                {desbravador.phoneResponsible}
              </p>
              <p>
                <span className={label}>Email: </span>
                {desbravador.emailResponsible}
              </p>
              <p>
                <span className={label}>CPF: </span>
                {desbravador.cpfResponsible}
              </p>
              <span className="border-b-2"></span>
              <span className="border-b-2 w-1/2"></span>
            </>
          )}
          <p>
            <span className={label}>Batizado: </span>
            {desbravador.baptized}
          </p>
        </div>
      </div>
    </div>
  );
}
