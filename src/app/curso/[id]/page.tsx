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
  const [curso, setCurso] = useState(null);

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
      } catch (err) {
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
      <div className="grid">
        <div className="col-12 flex justify-content-center">
          <img
            src={curso.course_photo}
            alt={`Foto do curso de ${curso.name}`}
            className="foto-curso"
          />
        </div>
        <div className="md:col-6">
          <div className="card-container">
            <img src={curso.coordinator_photo} alt="Coordenador" />
            <h3>{curso.coordinator}</h3>
            <p>Coordenador</p>
          </div>
        </div>
        <div className="md:col-5">
          <div className="description-container">
            <h2 className="header-sobre">Sobre o Curso:</h2>
            <p>{curso.description}</p>
            <a href={curso.link} target="_blank" rel="noopener noreferrer">
              Saiba mais
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
