'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "../components/Navbar";
import CardPadrao from "../components/CardCursos";
import "./style.css";
import BottomBar from "../components/BottomBar";

export default function Cursos() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const accounts = msalInstance.getAllAccounts();

                if (accounts.length === 0) {
                    throw new Error("Usuário não autenticado. Faça login novamente.");
                } else {
                    const tokenResponse = accounts[0].idToken;
                    
                    console.log("Access Token:", tokenResponse);
    
                    const response = await axios.get(
                        "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-courses",
                        {
                            headers: {
                                Authorization: `Bearer ${tokenResponse}`,
                            },
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

        fetchCourses();
    }, []);

    return (
        <>
            <Navbar text="Cursos de Graduação" anchor="/home" />
            <div className="grid flex flex-row justify-content-center m-0">
                {loading && <p>Carregando Cursos...</p>}
                {error && <p>Erro ao carregar cursos: {error}</p>}
                {!loading && !error && dados['courses']?.map((key) => (
                    <div className="col-12 lg:col-3 md:col-4 sm:col-6 mt-2 m-0" key={key.course_id}>
                        <CardPadrao dados={key} />
                    </div>
                ))}
            </div>
            <BottomBar />
        </>
    );
}
