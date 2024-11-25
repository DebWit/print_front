"use client";
import Navbar from "../../components/Navbar";
import CardCurso from "@/app/components/CardCurso";
import { useParams } from "next/navigation";
import "../style.css";

export default function Curso() {

    const { id } = useParams();

    const dados = 
      {
        "course_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Ciência da Computação",
        "course_photo": "/background-splash.png",
        "coordinator": "Rudolf Theoderich Bühler",
        "coordinator_photo": "/background-splash.png",
        "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, perspiciatis!",
        "link": "maua.br"
      }
  
    if (id !== dados.course_id) {
      return <div>Curso não encontrado!</div>;
    }
    
    const style = {
      card: {
        backgroundColor: "#98A7E2"
      },
      photo: {
        width: "100%"
      },
      name: {
        color: "black"
      }
    }

    return (
      <>      
        <Navbar text={dados.name} anchor="/home"></Navbar>
        <div className="grid m-0 p-0">
          <div className="col-12 flex justify-content-center p-0">
            <img src="/background-splash.png" alt={`Foto do curso de ${dados.name}`} className="foto-curso "/>
          </div>
          <div className="col-12">
            <CardCurso title={dados.coordinator} photo={dados.coordinator_photo} style={style}/>
          </div>
          <div className="col-12">
            <h2 className="header-sobre">Sobre o Curso:</h2>
            <p className="header-sobre">{dados.description}</p>
          </div>
        </div>
      </>
      );


} 