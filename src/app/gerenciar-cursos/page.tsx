'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarCursos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCursos = async () => {
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

                const response = await axios.get(
                    "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-courses",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    }
                );

                setCursos(response.data.courses); // Assumindo que a resposta contém a lista de cursos no campo 'courses'
            } catch (err: any) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    const filteredCursos = cursos.filter(curso =>
        curso.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteCourse = async (course_id) => {
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
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/delete-course`,
                {"course_id": course_id},
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            setCursos(cursos.filter(curso => curso.course_id !== course_id));
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <div>
            <Navbar text="Gerenciar Cursos" anchor="/home" />
            <div className="p-inputgroup mt-3 flex justify-content-center" style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <input 
                    type="text" 
                    className="p-inputtext p-component" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar curso..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {loading && <p>Carregando Cursos...</p>}
                {error && <p>Erro ao carregar cursos: {error}</p>}
                {!loading && !error && filteredCursos.map((curso) => (
                    <div key={curso.course_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{curso.name}</h4>
                                <p>{curso.description}</p>
                                <a className="mr-1 p-button p-button-warning" href={`/gerenciar-curso/${curso.course_id}`}>
                                    <i className="pi pi-pencil"></i>
                                </a>
                                <button 
                                    className="p-button p-component p-button-danger" 
                                    onClick={() => deleteCourse(curso.course_id)}
                                >
                                    <i className="pi pi-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-4 lg:col-8 col-12">
                    <a 
                        href="/criar-curso" 
                        className="p-button p-component add mr-2"
                    >
                        +
                    </a>
                </div>
            </div>
        </div>
    );
}
