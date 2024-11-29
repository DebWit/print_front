import Navbar from "@/app/components/Navbar";
import CardPadrao from "@/app/components/CardCursos";
import "../style.css";
import entidades from "../entidade.json";

import "./style.css";

export default function Entidade() {
    const dados = entidades

    return (
      <>      
        <Navbar text="Entidades Estudantis" anchor="/home"></Navbar>
        <div className="grid flex flex-row justify-content-center m-0">
          {dados.map((key) => (
            <div className="col-12 lg:col-3 md:col-4 sm:col-6 mt-2 m-0">
                  <CardPadrao dados={key} key={key.id}/>
            </div>     
          ))}
        </div>

        <p>"oi"</p>

      </>
      );


} 