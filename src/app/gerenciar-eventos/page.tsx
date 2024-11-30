'use client';
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarEventos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [eventos, setEventos] = useState([
        {
            event_id: "550e8400-e29b-41d4-a716-446655440000",
            name: "Evento de Teste bemmmmm longoo",
            banner: "/login-background.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac turpis tincidunt.",
            start_date: 1732725960,
            end_date: 1734725960,
            rooms: {
                "H204": 30,
                "H205": 40,
                "H206": 40
            },
        },
        {
            event_id: "650e8400-e29b-41d4-a716-446655440001",
            name: "Outro Evento de Teste",
            banner: "/login-background2.png",
            description: "Descrição de outro evento para teste de funcionalidade.",
            start_date: 1733725960,
            end_date: 1735725960,
            rooms: {
                "H207": 25,
                "H208": 35
            },
        },
    ]);

    const filteredEventos = eventos.filter(evento =>
        evento.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteEvent = (event_id) => {
        setEventos(eventos.filter(evento => evento.event_id !== event_id));
    };

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
                {filteredEventos.map((evento) => (
                    <div key={evento.event_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{evento.name}</h4>
                                <p>{evento.description}</p>
                                <p>
                                    <small>
                                        Início: {new Date(evento.start_date * 1000).toLocaleString()} <br />
                                        Fim: {new Date(evento.end_date * 1000).toLocaleString()}
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
