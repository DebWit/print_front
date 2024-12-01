import Navbar from "@/app/components/Navbar";
import BottomBar from "../components/BottomBar";
import CardPadrao from "@/app/components/CardEntidades";
import "../style.css";
import entidades from "./entidade.json";

import "./style.css";

export default function Entidade() {
  const dados = entidades.map((entidade) => ({
      ...entidade,
      course_photo: entidade.url,
  }));

  return (
      <>      
          <Navbar text="Entidades Estudantis" anchor="/home"></Navbar>
          <div className="grid flex flex-wrap justify-content-center gap-2 p-2">
            {dados.map((key) => (
            <div className="col-12 lg:col-3 md:col-4 sm:col-6 mt-2"
              key={key.id}
              style={{
              display: "flex",
              justifyContent: "center" }}
    >
              <CardPadrao dados={key} />
            </div>
            ))}
          </div>
          <BottomBar></BottomBar>
      </>
  );
}