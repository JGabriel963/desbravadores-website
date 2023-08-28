import { useContext, useRef, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { AuthContext } from "../../context/auth";

export default function DbvForm({ itemToUpdate, linkTo }) {
  const defaultItem = {
    name: "",
    sex: "",
    sizeShirt: "",
    dateBirth: "",
    phone: "",
    maritalStatus: "",
    email: "",
    address: "",
    number: "",
    cep: "",
    bairro: "",
    city: "",
    state: "",
    rg: "",
    cpf: "",
    nameMother: "",
    phoneMother: "",
    emailMother: "",
    nameFather: "",
    phoneFather: "",
    emailFather: "",
    nameResponsible: "",
    phoneResponsible: "",
    emailResponsible: "",
    cpfResponsible: "",
    baptized: "",
  };

  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);
  const [office, setOffice] = useState(itemToUpdate ? itemToUpdate.office : "");
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      if (itemToUpdate) {
        const collectionUpdate =
          itemToUpdate.office === "Desbravador" ? "desbravadores" : "diretoria";

        await updateDoc(doc(db, collectionUpdate, itemToUpdate.id), item)
          .then(() => {
            toast.info("Atualizado com sucesso");
            setOffice("");
            navigate(`/main/${linkTo}`);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Ops, erro ao tentar atualizar!");
          });

        return;
      } else {
        const dbvCollection =
          office === "Desbravador" ? "desbravadores" : "diretoria";

        const itemDbv = {
          ...item,
          office: office,
          createdAt: new Date(),
          userId: user.uid,
        };

        await addDoc(collection(db, dbvCollection), itemDbv)
          .then(() => {
            toast.success("Desbravador Adicionado");
            setItem(defaultItem);
            setOffice("");
            inputRef.current.focus();
          })
          .catch((error) => {
            console.log(error);
            toast.error("Erro ao Cadastrar");
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro inesperado!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 text-gray-500">
        <div className="grid grid-cols-2 gap-x-4">
          {!itemToUpdate ? (
            <div className="flex flex-col">
              <label htmlFor="function" className="font-semibold ">
                Função <span className="text-red-500">*</span>
              </label>
              <select
                required
                id="function"
                className="input"
                ref={inputRef}
                value={office}
                onChange={(e) => setOffice(e.target.value)}
              >
                <option value="">Escolha um opção</option>
                <option value="Desbravador">Desbravador</option>
                <option value="Diretoria">Diretoria</option>
              </select>
            </div>
          ) : null}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold ">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              value={item.name}
              onChange={handleChange}
              id="name"
              className="input"
              placeholder="Digite o nome aqui..."
            />
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-y-3">
          {/* Sexo e Data de Nascimento e Telefone */}
          <div className="flex flex-col">
            <label htmlFor="sex" className="font-semibold ">
              Sexo: <span className="text-red-500">*</span>
            </label>
            <select
              name="sex"
              required
              id="sex"
              className="input-check"
              value={item.sex}
              onChange={handleChange}
            >
              <option value="">Escolha um opção</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sex" className="font-semibold ">
              Tamanho da Camiseta: <span className="text-red-500">*</span>
            </label>
            <select
              name="sizeShirt"
              required
              id="sex"
              className="input-check"
              value={item.sizeShirt}
              onChange={handleChange}
            >
              <option value="">Escolha um opção</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="idade" className="font-semibold">
              Data de Nascimento: <span className="text-red-500">*</span>
            </label>
            <InputMask
              mask="99/99/9999"
              name="dateBirth"
              type="text"
              required
              id="idade"
              className="input"
              value={item.dateBirth}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold">
              Telefone: <span className="text-red-500">*</span>
            </label>
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              type="tel"
              required
              id="phone"
              placeholder="(XX) XXXX-XXXX"
              className="input"
              value={item.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maritalStatus" className="font-semibold ">
              Estado Civil:
            </label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              className="input-check"
              value={item.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Escolha um opção</option>
              <option value="Solteiro">Solteiro</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Não informado">Não informado</option>
              <option value="Viúvo">Viúvo</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Digite o email aqui..."
            className="input"
            value={item.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-3/4">
            <label htmlFor="address" className="font-semibold">
              Endereço:
            </label>
            <input
              name="address"
              type="text"
              id="address"
              className="input"
              value={item.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/4">
            <label htmlFor="number" className="font-semibold">
              Nº
            </label>
            <input
              name="number"
              type="number"
              id="number"
              className="input"
              value={item.number}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="cep" className="font-semibold">
            CEP:
          </label>
          <InputMask
            mask="99999-999"
            name="cep"
            type="text"
            className="input"
            id="cep"
            value={item.cep}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/3">
            <label htmlFor="bairro" className="font-semibold">
              Bairro:
            </label>
            <input
              name="bairro"
              type="text"
              id="bairro"
              className="input"
              value={item.bairro}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="city" className="font-semibold">
              Cidade:
            </label>
            <input
              name="city"
              type="text"
              id="city"
              className="input"
              value={item.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="state" className="font-semibold">
              Estado:
            </label>
            <input
              name="state"
              type="text"
              id="state"
              className="input"
              value={item.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="rg" className="font-semibold">
              RG:
            </label>
            <InputMask
              mask="9.999.999"
              name="rg"
              type="text"
              className="input"
              id="rg"
              value={item.rg}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="cpf" className="font-semibold">
              CPF:
            </label>
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              type="text"
              className="input"
              id="cpf"
              value={item.cpf}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/3">
            <label htmlFor="mother" className="font-semibold">
              Nome da Mãe:
            </label>
            <input
              name="nameMother"
              type="text"
              id="mother"
              className="input"
              value={item.nameMother}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="phoneMother" className="font-semibold">
              Telefone:
            </label>
            <InputMask
              mask="(99) 99999-9999"
              name="phoneMother"
              type="text"
              id="phoneMother"
              placeholder="(XX) XXXX-XXXX"
              className="input"
              value={item.phoneMother}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="emailMother" className="font-semibold">
              Email:
            </label>
            <input
              name="emailMother"
              type="email"
              id="emailMother"
              className="input"
              value={item.emailMother}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/3">
            <label htmlFor="father" className="font-semibold">
              Nome da Pai:
            </label>
            <input
              name="nameFather"
              type="text"
              id="father"
              className="input"
              value={item.nameFather}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="phoneFather" className="font-semibold">
              Telefone:
            </label>
            <InputMask
              mask="(99) 99999-9999"
              name="phoneFather"
              type="text"
              id="phoneFather"
              placeholder="(XX) XXXX-XXXX"
              className="input"
              value={item.phoneFather}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="emailFather" className="font-semibold">
              Email:
            </label>
            <input
              name="emailFather"
              type="email"
              id="emailFather"
              className="input"
              value={item.emailFather}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <span className="mt-3">
            Caso não tenha pai ou mãe, preencha o nome do responsável legal
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <div className="flex flex-col w-1/3">
              <label htmlFor="responsible" className="font-semibold">
                Nome do Responsável:
              </label>
              <input
                name="nameResponsible"
                type="text"
                id="responsible"
                className="input"
                value={item.nameResponsible}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="phoneResponsible" className="font-semibold">
                Telefone:
              </label>
              <InputMask
                mask="(99) 99999-9999"
                name="phoneResponsible"
                type="text"
                id="phoneResponsible"
                placeholder="(XX) XXXX-XXXX"
                className="input"
                value={item.phoneResponsible}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="emailResponsible" className="font-semibold">
                Email:
              </label>
              <input
                name="emailResponsible"
                type="email"
                id="emailResponsible"
                className="input"
                value={item.emailResponsible}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="cpfResponsible" className="font-semibold">
              CPF do Responsável:
            </label>
            <InputMask
              mask="999.999.999-99"
              name="cpfResponsible"
              type="text"
              id="cpfResponsible"
              className="input"
              value={item.cpfResponsible}
              onChange={handleChange}
            />

            <span>
              Se a criança não tem CPF proprio, preencha o CPF do responsável.
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="baptized" className="font-semibold">
            Batizado? <span className="text-red-500">*</span>
          </label>
          <select
            name="baptized"
            id="baptized"
            required
            className="input"
            value={item.baptized}
            onChange={handleChange}
          >
            <option value="">Escolha sua opção</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          {!itemToUpdate ? "Cadastrar" : "Atualizar"}
        </button>
      </div>
    </form>
  );
}
