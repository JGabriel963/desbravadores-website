import { useState } from "react";
import { db } from "../../../firebase";
import { addDoc, collection } from 'firebase/firestore'

export default function DbvForm() {
  const [office, setOffice] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [sizeShirt, setSizeShirt] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [nameMother, setNameMother] = useState("");
  const [phoneMother, setPhoneMother] = useState("");
  const [emailMother, setEmailMother] = useState("");
  const [nameFather, setNameFather] = useState("");
  const [phoneFather, setPhoneFather] = useState("");
  const [emailFather, setEmailFather] = useState("");
  const [nameResponsible, setNameResponsible] = useState("");
  const [phoneResponsible, setPhoneResponsible] = useState("");
  const [emailResponsible, setEmailResponsible] = useState("");
  const [cpfResponsible, setCpfResponsible] = useState("")
  const [baptized, setBaptized] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    await addDoc(collection(db, "desbravadores"), {
      office: office,
      nome: name,
      sexo: sex,
      tamanhoCamiseta: sizeShirt,
      dataNascimento: dateBirth,
      telefone: phone,
      estatusCivil: maritalStatus,
      email: email,
      endereco: address,
      numero: number,
      cep: cep,
      bairro: bairro,
      cidade: city,
      estado: state,
      rg: rg,
      cpf: cpf,
      nomeMae: nameMother,
      telefoneMae: phoneMother,
      emailMae: emailMother,
      nomePai: nameFather,
      telefonePai: phoneFather,
      emailPai: emailFather,
      nomeResponsavel: nameResponsible,
      telefoneResponsavel: phoneResponsible,
      emailResponsavel: emailResponsible,
      cpfResponsavel: cpfResponsible,
      batizado: baptized,
      createdAt: new Date()
    })
    .then(res => alert("Desbravador adicionado com sucesso =D"))
    .catch(error => console.log(error))
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-extrabold text-2xl mb-3">Registro de Membro</h1>
      <div className="space-y-8 text-gray-500">
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col">
            {/* Função e Nome */}
            <label htmlFor="function" className="font-semibold ">
              Função <span className="text-red-500">*</span>
            </label>
            <select
              required
              id="function"
              className="input"
              value={office}
              onChange={(e) => setOffice(e.target.value)}
            >
              <option selected>Escolha um opção</option>
              <option value="Desbravador">Desbravador</option>
              <option value="Diretoria">Diretoria</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold ">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                required 
                id="sex" 
                className="input"
                value={sex}
                onChange={e => setSex(e.target.value)}
            >
              <option selected>Escolha um opção</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Femenino</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sex" className="font-semibold ">
              Tamanho da Camiseta: <span className="text-red-500">*</span>
            </label>
            <select 
                required 
                id="sex" 
                className="input"
                value={sizeShirt}
                onChange={e => setSizeShirt(e.target.value)}
            >
              <option selected>Escolha um opção</option>
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
            <input 
                required
                type="date" 
                id="idade" 
                className="input"
                value={dateBirth}
                onChange={e => setDateBirth(e.target.value)} 
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold">
              Telefone:
            </label>
            <input
              type="text"
              id="phone"
              placeholder="(XX) XXXX-XXXX"
              className="input"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="maritalStatus" className="font-semibold ">
              Estado Civil: <span className="text-red-500">*</span>
            </label>
            <select 
                required 
                id="maritalStatus" 
                className="input"
                value={maritalStatus}
                onChange={e => setMaritalStatus(e.target.value)}
            >
              <option selected>Escolha um opção</option>
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
            type="email"
            id="email"
            placeholder="Digite o email aqui..."
            className="input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-3/4">
            <label htmlFor="address" className="font-semibold">
              Endereço:
            </label>
            <input 
                required
                type="text" 
                id="address" 
                className="input"
                value={address}
                onChange={e => setAddress(e.target.value)} 
            />
          </div>
          <div className="flex flex-col w-1/4">
            <label htmlFor="number" className="font-semibold">
              Nº
            </label>
            <input
                type="text" 
                id="number" 
                className="input"
                value={number}
                onChange={e => setNumber(e.target.value)} 
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="cep" className="font-semibold">
            CEP:
          </label>
          <input 
            type="text" 
            className="input" 
            id="cep" 
            value={cep}
            onChange={e => setCep(e.target.value)}
        />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/3">
            <label htmlFor="bairro" className="font-semibold">
              Bairro:
            </label>
            <input type="text" id="bairro" className="input" value={bairro} onChange={e => setBairro(e.target.value)} />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="city" className="font-semibold">
              Cidade:
            </label>
            <input type="text" id="city" className="input" value={city} onChange={e => setCity(e.target.value)}/>
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="state" className="font-semibold">
              Estado:
            </label>
            <input type="text" id="state" className="input" value={state} onChange={e => setState(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="rg" className="font-semibold">
              RG:
            </label>
            <input type="text" className="input" id="rg" value={rg} onChange={e => setRg(e.target.value)} />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="cpf" className="font-semibold">
              CPF:
            </label>
            <input type="text" className="input" id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/3">
            <label htmlFor="mother" className="font-semibold">
              Nome da Mãe:
            </label>
            <input type="text" id="mother" className="input" value={nameMother} onChange={e => setNameMother(e.target.value)} />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="phoneMother" className="font-semibold">
              Telefone:
            </label>
            <input
              type="text"
              id="phoneMother"
              placeholder="(XX) XXXX-XXXX"
              className="input"
              value={phoneMother}
              onChange={e => setPhoneMother(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="emailMother" className="font-semibold">
              Email:
            </label>
            <input type="text" id="emailMother" className="input" value={emailMother} onChange={e => setEmailMother(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/3">
            <label htmlFor="father" className="font-semibold">
              Nome da Pai:
            </label>
            <input type="text" id="father" className="input" value={nameFather} onChange={e => setNameFather(e.target.value)} />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="phoneFather" className="font-semibold">
              Telefone:
            </label>
            <input
              type="text"
              id="phoneFather"
              placeholder="(XX) XXXX-XXXX"
              className="input"
              value={phoneFather}
              onChange={e => setPhoneFather(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="emailFather" className="font-semibold">
              Email:
            </label>
            <input type="text" id="emailFather" className="input" value={emailFather} onChange={e => setEmailFather(e.target.value)} />
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
              <input type="text" id="responsible" className="input" value={nameResponsible} onChange={e => setNameResponsible(e.target.value)}  />
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="phoneResponsible" className="font-semibold">
                Telefone:
              </label>
              <input
                type="text"
                id="phoneResponsible"
                placeholder="(XX) XXXX-XXXX"
                className="input"
                value={phoneResponsible}
                onChange={e => setPhoneResponsible(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <label htmlFor="emailResponsible" className="font-semibold">
                Email:
              </label>
              <input type="text" id="emailResponsible" className="input" value={emailResponsible} onChange={e => setEmailResponsible(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="cpfResponsible" className="font-semibold">
              CPF do Responsável:
            </label>
            <input type="text" id="cpfResponsible" className="input" value={cpfResponsible} onChange={e => setCpfResponsible(e.target.value)} />

            <span>
              Se a criança não tem CPF proprio, preencha o CPF do responsável.
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="baptized" className="font-semibold">
            Batizado?
          </label>
          <select id="baptized" className="input" value={baptized} onChange={e => setBaptized(e.target.value)}>
            <option selected>Escolha sua opção</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          Cadastrar
        </button>
      </div>
    </form>
  );
}
