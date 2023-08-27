import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import profileFemenino from "../../../public/woman-desbravador.png"
import profileMasculina from "../../../public/man.jpg"


const label = "font-extrabold";

export default function ShowDbv() {
  const [diretoria, setDiretoria] = useState({});
  const [loadDbv, setLoadDbv] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    let infoDbv = {};

    async function loadDbv() {
      await getDoc(doc(db, "diretoria", id))
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

          setDiretoria(infoDbv);
          setLoadDbv(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao consultar diretoria!");
        });
    }

    loadDbv();
  }, []);

  if (loadDbv) {
    return <h1>Carregando...</h1>;
  }

  function handleIdade(dateBirth) {
    // diretoria.dateBirth = 19/05/2002
    const dateParts = dateBirth.split("/");
    const birthDate = new Date(
      `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    ).getFullYear();

    return new Date().getFullYear() - birthDate;
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-blue-400 border-b-2 border-gray-200">
        Desbravador - {diretoria.name}
      </h1>
      <div className="mt-4 space-y-4 text-gray-500">
        <div className="w-[250px] h-[250px] rounded-full overflow-hidden border-4">
          <img
            src={
              diretoria.sex === "Masculino"
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
            <span className={label}>Sexo:</span> {diretoria.sex}
          </p>
          <p>
            <span className={label}>Idade:</span>{" "}
            {handleIdade(diretoria.dateBirth)}
          </p>
          <p>
            <span className={label}>Data de Nascimento:</span>{" "}
            {diretoria.dateBirth}
          </p>
          <p>
            <span className={label}>Telefone:</span> {diretoria.phone}
          </p>
          <p>
            <span className={label}>Email:</span>{" "}
            {diretoria.email ? diretoria.email : "Não contém"}
          </p>
          <p>
            <span className={label}>Tamanho da Camisa:</span>{" "}
            {diretoria.sizeShirt}
          </p>
          <p>
            <span className={label}>Estado civil:</span>{" "}
            {diretoria.maritalStatus}
          </p>
          <p>
            <span className={label}>Estado:</span> {diretoria.state}
          </p>
          <p>
            <span className={label}>Cidade:</span> {diretoria.city}
          </p>
          <p>
            <span className={label}>CEP:</span> {diretoria.cep}
          </p>
          <p>
            <span className={label}>Bairro:</span> {diretoria.bairro}
          </p>
          <p>
            <span className={label}>Endereço: </span>
            {diretoria.address}
            {", "}
            {diretoria.number}
          </p>
          <p>
            <span className={label}>CPF: </span>
            {diretoria.cpf}
          </p>
          <p>
            <span className={label}>RG: </span>
            {diretoria.rg}
          </p>
          <span className="border-b-2 w-1/2"></span>
          <p>
            <span className={label}>Mãe: </span>
            {diretoria.nameMother}
          </p>
          <p>
            <span className={label}>Telefone: </span>
            {diretoria.phoneMother}
          </p>
          <p>
            <span className={label}>Email: </span>
            {diretoria.emailMother}
          </p>
          <p>
            <span className={label}>Pai: </span>
            {diretoria.nameFather}
          </p>
          <p>
            <span className={label}>Telefone: </span>
            {diretoria.phoneFather}
          </p>
          <p>
            <span className={label}>Email: </span>
            {diretoria.emailFather}
          </p>
          {diretoria.nameResponsible && (
            <>
              <p>
                <span className={label}>Responsável: </span>
                {diretoria.nameResponsible}
              </p>
              <p>
                <span className={label}>Telefone: </span>
                {diretoria.phoneResponsible}
              </p>
              <p>
                <span className={label}>Email: </span>
                {diretoria.emailResponsible}
              </p>
              <p>
                <span className={label}>CPF: </span>
                {diretoria.cpfResponsible}
              </p>
              <span className="border-b-2"></span>
              <span className="border-b-2 w-1/2"></span>
            </>
          )}
          <p>
            <span className={label}>Batizado: </span>
            {diretoria.baptized}
          </p>
        </div>
      </div>
    </div>
  );
}
