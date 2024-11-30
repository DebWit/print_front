'use client';
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarNotificacoes() {
    const [searchTerm, setSearchTerm] = useState("");
    const [notificacoes, setNotificacoes] = useState([
        {
            notification_id: "d65308fd-6940-4d6d-92b5-6247d8af834a",
            title: "Notificação 1",
            timestamp: 1732725960,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium perferendis fuga veritatis tempore nemo. At maiores exercitationem nihil rem doloremque suscipit dolorem, expedita, cum porro eaque dignissimos quasi eum nostrum.",
        },
        {
            notification_id: "a82308fd-1234-4d6d-92b5-7687d8af834a",
            title: "Notificação 2",
            timestamp: 1732725960,
            description: "Esta é uma segunda notificação com informações diferentes para teste.",
        },
    ]);

    const filteredNotificacoes = notificacoes.filter(notificacao =>
        notificacao.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteNotification = (notification_id) => {
        setNotificacoes(notificacoes.filter(notificacao => notificacao.notification_id !== notification_id));
    };

    return (
        <div>
            <Navbar text="Gerenciar Notificações" anchor="/home" />
            <div className="p-inputgroup mt-3 flex justify-content-center" style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <input 
                    type="text" 
                    className="p-inputtext p-component" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar notificação..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {filteredNotificacoes.map((notificacao) => (
                    <div key={notificacao.notification_id} className="col-11 lg:col-8">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{notificacao.title}</h4>
                                <p>{notificacao.description}</p>
                                <p><small>{new Date(notificacao.timestamp * 1000).toLocaleString()}</small></p>
                                <a 
                                    className="mr-1 p-button p-button-warning" 
                                    href={`/gerenciar-notificacao/${notificacao.notification_id}`}
                                >
                                    <i className="pi pi-pencil"></i>
                                </a>
                                <button 
                                    className="p-button p-component p-button-danger" 
                                    onClick={() => deleteNotification(notificacao.notification_id)}
                                >
                                    <i className="pi pi-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            <div className="mt-4 lg:col-8 col-12">
                <a 
                    href="/criar-notificacao" 
                    className="p-button p-component add mr-2"
                    >
                    +
                </a>
            </div>
        </div>
        </div>
    );
}
