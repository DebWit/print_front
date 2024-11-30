'use client';
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './style.css';

export default function GerenciarUsuarios() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([
        {
            user_id: "d65308fd-6940-4d6d-92b5-6247d8af834a",
            name: "Mateus Capaldo Martins",
            email: "22.01082-3@maua.br",
        },
        {
            user_id: "d65308fd-6940-4d6d-92b5-6247d8af834a",
            name: "Carlos Henrique Lucena Barro",
            email: "22.01211-7@maua.br",
        }
    ]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar text="Gerenciar Usuários" anchor="/home" />
            <div className="p-inputgroup mt-3 flex justify-content-center" style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <input 
                    type="text" 
                    className="p-inputtext p-component" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar usuário..." 
                />
                <i className="pi pi-search p-3 search-icon"></i>
            </div>
            <div className="grid flex justify-content-center mt-2 mx-0">
                {filteredUsers.map((user) => (
                    <div key={user.user_id} className="col-11 lg:col-7">
                        <div className="p-card">
                            <div className="p-card-body">
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
