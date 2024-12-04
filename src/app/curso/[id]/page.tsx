'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { getMsalInstance } from "../../../msalInstance";
import "../style.css";

export default function Curso() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curso, setCurso]:any = useState(null);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const msalInstance = await getMsalInstance();
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) {
          throw new Error("Usuário não autenticado. Faça login novamente.");
        }

        const tokenResponse = await msalInstance.acquireTokenSilent({
          scopes: ["User.Read"],
          account: accounts[0],
        });

        const response = await axios.post(
          "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-course",
          { course_id: id },
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.accessToken}`,
            },
          }
        );

        setCurso(response.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  if (loading) {
    return <div className="loading-text">Carregando dados do curso...</div>;
  }

  if (error) {
    return <div className="error-text">Erro ao carregar curso: {error}</div>;
  }

  if (!curso) {
    return <div className="error-text">Curso não encontrado!</div>;
  }

  return (
    <>
      <Navbar text={curso.name} anchor="/cursos"></Navbar>
      <div className="w-full">
        <div className="w-full flex flex align-items-center justify-content-center">
          <div className="md:col-10 col-12 m-0 p-0">
            <img
              src={curso.course_photo}
              alt={`Foto do curso de ${curso.name}`}
              className="foto-curso w-full md:border-round-xl mt-3"
            />
          </div>
        </div>
        <div className="flex justify-content-center align-items-center">
          <div className="md:col-10 col-12 md:flex md:justify-content-center gap-3">
            <div className="md:col-6 col-12 flex justify-content-center align-items-center">
              <div className="card-container p-4 w-full h-15rem border-round-2xl flex justify-content-center align-items-center md:gap-2 gap-5" style={{ backgroundColor: "#98A7E2", fontFamily: "Arial" }}>
                <img src={curso.coordinator_photo} alt="Coordenador" className="border-round" style={{ aspectRatio: "3/4" }} />
                <div className="">
                  <span className="block font-bold text-2xl mb-2">{curso.coordinator}</span>
                  <span className="block text-white">Coordenador</span>
                </div>
              </div>
            </div>
            <div className="md:col-6 col-12 flex justify-content-center align-items-center text-white">
              <div className="description-container" style={{ fontFamily: "Arial" }}>
                <h2 className="header-sobre font-normal ml-3 text-3xl font-bold">Sobre o Curso:</h2>
                <p className="text-xl text-justify mx-2">{curso.description}</p>
                <div className="w-full flex justify-content-center">
                  <a href={curso.link} className="p-3 text-xl text-white shadow-2 border-round-xl" style={{ textDecoration: "none", backgroundColor: "#232285" }} target="_blank" rel="noopener noreferrer">
                    Saiba mais
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
