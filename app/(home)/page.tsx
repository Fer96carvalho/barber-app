import { ptBR } from "date-fns/locale/pt-BR";
import Header from "../_components/header";
import { format, formatDate } from "date-fns";
import Search from "./_components/search";


export default function Home() {
  return (
    <div>
      <Header/>
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Fernando!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEE ',' dd 'de' MMMM", {
          locale: ptBR
          })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search/>
      </div>
    </div>
  );
}
