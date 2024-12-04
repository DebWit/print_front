'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarEventos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);  

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const accounts = msalInstance.getAllAccounts();

                if (accounts.length === 0) {
                    throw new Error("Usuário não autenticado. Faça login novamente.");
                }

                const username = accounts[0].username.split('@')[0];
                const isCommonUser = /^\d{2}\.\d{5}-\d$/.test(username);

                if (isCommonUser) {
                    throw new Error("Você não tem permissão para acessar esta página.");
                }

                setIsAdmin(true);
                fetchEventos(); 
            } catch (err: any) {
                setError(err.message);
            }
        };

        authenticateUser();
    }, []);

    const fetchEventos = async () => {
        try {
            const msalInstance = await getMsalInstance();
            const accounts = msalInstance.getAllAccounts();

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: accounts[0],
            });

            const response = await axios.get(
                "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-events",  
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            setEventos(response.data.events);
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredEventos = eventos.filter((evento: {name: any}) =>
        evento.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteEvent = async (event_id: string) => {
        try {
            const msalInstance = await getMsalInstance();
            const accounts = msalInstance.getAllAccounts();

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: accounts[0],
            });

            await axios.post(
                "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/delete-event",
                { event_id },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            setEventos(eventos.filter((evento: {event_id: any}) => evento.event_id !== event_id));
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    if (!isAdmin) {
        return <div className="p-error text-center">Você não tem permissão para acessar esta página.</div>;
    }

    return (
        <div>
            <Navbar text="Gerenciar Eventos" anchor="/home" />
            <div className="p-inputgroup mt-3 flex justify-content-center" style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <input 
                    type="text" 
                    className="p-inputtext p-component" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar evento..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {loading && <p>Carregando eventos...</p>}
                {error && <p>Erro ao carregar eventos: {error}</p>}
                {!loading && !error && filteredEventos.map((evento: any) => (
                    <div key={evento.event_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{evento.name}</h4>
                                <p>{evento.description}</p>
                                <p>
                                    <small>
                                        Início: {new Date(evento.start_date).toLocaleString()} <br />
                                        Fim: {new Date(evento.end_date).toLocaleString()}
                                    </small>
                                </p>
                                <a 
                                    className="mr-1 p-button p-button-warning" 
                                    href={`/gerenciar-evento/${evento.event_id}`}
                                >
                                    <i className="pi pi-pencil"></i>
                                </a>
                                <button 
                                    className="p-button p-component p-button-danger" 
                                    onClick={() => deleteEvent(evento.event_id)}
                                >
                                    <i className="pi pi-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-4 lg:col-8 col-12">
                    <a 
                        href="/criar-evento" 
                        className="p-button p-component add mr-2"
                    >
                        +
                    </a>
                </div>
            </div>
        </div>
    );
}
