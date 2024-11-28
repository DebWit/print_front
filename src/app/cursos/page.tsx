import Navbar from "../components/Navbar";
import CardPadrao from "../components/CardCursos";
import "./style.css";

export default function Cursos() {

    const dados = [
      {
        "course_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Ciência da Computação",
        "course_photo": "/background-splash.png",
      },
      {
        "course_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Ciclo Básico",
        "course_photo": "/background-splash.png",
      },
      {
        "course_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Engenharia Mecânica",
        "course_photo": "/background-splash.png",
      },
      {
        "course_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Design",
        "course_photo": "/background-splash.png",
      }
    ]
  

    return (
      <>      
        <Navbar text="Cursos de Graduação" anchor="/home"></Navbar>
        <div className="grid flex flex-row justify-content-center m-0">
          {dados.map((key) => (
            <div className="col-12 lg:col-3 md:col-4 sm:col-6 mt-2 m-0">
                  <CardPadrao dados={key} key={key.course_id}/>
            </div>     
          ))}
        </div>
      </>
      );


} 