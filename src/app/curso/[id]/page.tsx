"use client";
import Navbar from "../../components/Navbar";
import CardCurso from "@/app/components/CardCurso";
import { useParams } from "next/navigation";
import "../style.css";
import { useState } from "react";

export default function Curso() {
  const { id } = useParams();

  const dados = {
    course_id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Ciência da Computação",
    course_photo: "/background-splash.png",
    coordinator: "Rudolf Theoderich Bühler",
    coordinator_photo: "/background-splash.png",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, perspiciatis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam velit similique laborum dolorem id ipsum beatae ipsa. Mollitia, facere! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, enim.",
    link: "maua.br",
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (id !== dados.course_id) {
    return <div>Curso não encontrado!</div>;
  }

  return (
    <>
      <Navbar text={dados.name} anchor="/home"></Navbar>
      <div className="grid m-0 p-0 flex flex-wrap justify-content-center">
        <div className="col-12 md:col-6 flex justify-content-center p-0 m-0">
          <img
            src="/background-splash.png"
            alt={`Foto do curso de ${dados.name}`}
            className="foto-curso"
          />
        </div>
        <div className="col-12 md:col-6 md:ml-1">
          <div className="card-container">
            <img src={dados.coordinator_photo} alt="Coordenador" />
            <h3>{dados.coordinator}</h3>
            <p>Coordenador</p>
          </div>
        </div>
        <div className="col-12 md:col-5">
          <div className="description-container">
            <h2 className="header-sobre">Sobre o Curso:</h2>
            <p>
              {isExpanded
                ? dados.description
                : `${dados.description.substring(0, 150)}...`}
            </p>
            <button
              className="see-more-btn"
              onClick={handleToggleDescription}
            >
              {isExpanded ? "Ver menos" : "Ver mais"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
