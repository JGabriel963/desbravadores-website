import { Link } from "react-router-dom";

export default function TableDbv({ desbravadores }) {
  return (
    <table className=" w-full rounded-md ">
      <thead className="border-b-2">
        <tr className="text-green-500">
          <th>Name</th>
          <th>Email</th>
          <th>Contato</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {desbravadores.map((item, index) => {
          return (
            <tr key={index} className="border-b-2 text-gray-500">
              <td className="p-2 text-center font-bold">{item.nome}</td>
              <td className="p-2 text-center">
                {item.email ? item.email : "Não contém"}
              </td>
              <td className="p-2 text-center">{item.telefone}</td>
              <td className="p-2 text-center flex justify-center gap-2">
                <Link
                  to={`/desbravadores/${item.id}`}
                  className="bg-blue-500 hover:bg-blue-600 transition-colors p-2 rounded-md text-white"
                >
                  Ver
                </Link>
                <Link
                  to={`/desbravadores/update/${item.id}`}
                  className="bg-green-500 hover:bg-green-600 transition-colors  p-2 rounded-md text-white"
                >
                  Editar
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
