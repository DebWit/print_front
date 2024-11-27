
"use client";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import entidades from "../entidade.json"; // Importa os dados do JSON
import "../style.css";
import "primeicons/primeicons.css";

export default function Entidade() {
  const { id } = useParams(); // Obtém o identificador da entidade (ex.: "Dev Community Mauá")

  // Localiza a entidade correspondente no JSON
  const entidade = entidades.find((ent) => 
    ent.name
  .toLowerCase()
  .normalize("NFD") // Remove acentos
  .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas
  .replace(/\s+/g, "-") // Substitui espaços por hífens
  .replace(/[^a-z0-9-]/g, "") // Remove caracteres especiais
  === id);

  if (!entidade) {
    return <div>Entidade não encontrada!</div>; // Mensagem de erro se a entidade não for encontrada
  }

  return (
    <>
      <Navbar text={entidade.name} anchor="/entidade"></Navbar>
      <div className="grid nested-grid align-items-center">
        <div className="col-12 md:col-6">
          <div className="grid text-center">
            {/* Logo da Entidade */}
            <div className="col-12">
              <img
                src={entidade.url}
                alt={`Logo da entidade ${entidade.name}`}
                className="entidade-logo"
              />
            </div>

            {/* Botão */}
            <div className="col-12">
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

        {/* Descrição da Entidade */}
        <div className="col-12 md:col-5">
          <p className="entidade-description">{entidade.description}</p>
        </div>
      </div>
    </>
  );
}
