// ta quase completo, faltam itens que estou aguardando mais informações:
// 1. Mateus pediu pra fazer a pesquisa pelo id em vez de pelo nome, nao compreendo se é porque ele quer alterar para a url nao ficar com o nome da entidade mas com um numero de id
// 2. a ordem dos itenss, nessa tela está: imagem, descrição e botão, o que funciona bem para uma tela desktop, mas para celular, gostaria de alterar porque o botão fica escondido pela descrição.

"use client";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import eventos from "../eventos.json";
import "../style.css";
import "primeicons/primeicons.css";

export default function Entidade() {
  const { id } = useParams();


  const evento = eventos.find((eve) => 
    eve.name
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "")
  === id);

  if (!evento) {
    return <div>Entidade não encontrada!</div>;
  }

  return (
    <>
      <Navbar text={evento.name} anchor="/evento"></Navbar>
      <div className="grid nested-grid align-items-center justify-content-center" style={{ minHeight: '80vh' }}>

                <div className="col-12 md:col-5">
        {/* Imagem do evento */}
        <div className="col-12">
              <img
                src={evento.imagem}
                alt={`Imagem ilustrada do evento ${evento.name}`}
                className="entidade-logo"/>
            </div>
        </div>

        <div className="col-12 md:col-6">
          <div className="grid text-center">
            
          {/* Descrição do Evento */}
          <p className="evento-description">{evento.description}</p>

            {/* Botão */}
            <div className="col-12 flex justify-content-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="entidade-button"
              >
                <i className="pi pi-instagram" style={{ fontSize: "27px" }}></i>
                {evento.name}
              </a>
            </div>
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}
