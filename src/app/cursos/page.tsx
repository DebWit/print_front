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
        <div className="grid h-screen justify-content-center"> 
          <div className="col-10 mt-2">
              {dados.map((key) => (
                <CardPadrao dados={key} key={key.course_id}/>
              ))}
          </div>     
        </div>
      </>
      );


} 