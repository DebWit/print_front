// ta quase completo, faltam itens que estou aguardando mais informações:
// 1. Mateus pediu pra fazer a pesquisa pelo id em vez de pelo nome, nao compreendo se é porque ele quer alterar para a url nao ficar com o nome da entidade mas com um numero de id
// 2. a ordem dos itenss, nessa tela está: imagem, descrição e botão, o que funciona bem para uma tela desktop, mas para celular, gostaria de alterar porque o botão fica escondido pela descrição.

"use client";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import entidades from "../entidade.json";
import "../style.css";
import "primeicons/primeicons.css";

export default function Entidade() {
  const { id } = useParams();


  const entidade = entidades.find((ent) => 
    ent.name
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9-]/g, "")
  === id);

  if (!entidade) {
    return <div>Entidade não encontrada!</div>;
  }

  return (
    <>
      <Navbar text={entidade.name} anchor="/entidade"></Navbar>
      <div className="grid nested-grid align-items-center justify-content-center" style={{ minHeight: '80vh' }}>

                <div className="col-12 md:col-5">
        {/* Logo da Entidade */}
        <div className="col-12">
              <img
                src={entidade.url}
                alt={`Logo da entidade ${entidade.name}`}
                className="entidade-logo"/>
            </div>
        </div>

        <div className="col-12 md:col-6">
          <div className="grid text-center">
            
          {/* Descrição da Entidade */}
          <p className="entidade-description">{entidade.description}</p>

            {/* Botão */}
            <div className="col-12 flex justify-content-center">
              <a
                href={entidade.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="entidade-button"
              >
                <i className="pi pi-instagram" style={{ fontSize: "27px" }}></i>
                {entidade.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
