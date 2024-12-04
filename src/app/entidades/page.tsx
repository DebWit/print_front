'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "@/app/components/Navbar";
import BottomBar from "../components/BottomBar";
import CardPadrao from "@/app/components/CardEntidades";
import "../style.css";

export default function Entidade() {
    const [dados, setDados]: any = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEntidades = async () => {
        try {
            let msalInstance = await getMsalInstance();
            let accounts = msalInstance.getAllAccounts();

            if (accounts.length === 0) {
                throw new Error("Usuário não autenticado. Faça login novamente.");
            } else {
                console.log("Usuário autenticado!", accounts[0])
                const tokenResponse = accounts[0].idToken;
    
                console.log("Access Token:", tokenResponse);
    
                let response = await axios.get(
                    "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-student-organizations", 
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse}`,
                        }
                    }
                );
    
                setDados(response.data);
            }

        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntidades();
    }, []);

    return (
        <>
        {console.log(dados)}
            <Navbar text="Entidades Estudantis" anchor="/home" />
            <div className="grid flex flex-wrap justify-content-center gap-2 p-2 m-0">
                {loading && <p>Carregando Entidades...</p>}
                {error && <p>Erro ao carregar entidades: {error}</p>}
                {!loading && !error && dados['student_organizations']?.map((key: any) => (
                    <div
                        className="col-12 lg:col-3 md:col-4 sm:col-6 mt-2"
                        key={key.stu_org_id}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CardPadrao dados={key} />
                    </div>
                ))}
            </div>
            <BottomBar />
        </>
    );
}
