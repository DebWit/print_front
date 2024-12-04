'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import axios from "axios";
import { getMsalInstance } from "../../../msalInstance";
import "../style.css";
import "primeicons/primeicons.css";

export default function Entidade() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entidade, setEntidade] = useState(null);

  useEffect(() => {
    const fetchEntidade = async () => {
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
        
        
        console.log("Access Token:", tokenResponse.accessToken);

        const response = await axios.post(
          "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-student-organization",
          { "stu_org_id": id },
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.accessToken}`,
            },
          }
        );
        console.log(response)
        setEntidade(response.data);
      } catch (err: any) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntidade();
  }, [id]);

  if (loading) {
    return <div>Carregando dados da entidade...</div>;
  }

  if (error) {
    return <div>Erro ao carregar entidade: {error}</div>;
  }

  if (!entidade) {
    return <div>Entidade não encontrada!</div>;
  }

  return (
    <>
      <Navbar text={entidade.name} anchor="/entidades"></Navbar>
      <div
        className="grid nested-grid align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="col-12 md:col-5">
          <div className="col-12">
            <img
              src={entidade.logo}
              alt={`Logo da entidade ${entidade.name}`}
              className="entidade-logo"
            />
          </div>
        </div>
        <div className="col-12 md:col-6">
          <div className="grid text-center">
            <p className="entidade-description">{entidade.description}</p>
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
      <BottomBar></BottomBar>
    </>
  );
}
