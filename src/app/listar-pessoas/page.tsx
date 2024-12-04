'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getMsalInstance } from "../../msalInstance";
import Navbar from "../components/Navbar";
import './style.css';

interface User {
    member_id: string;
    name: string;
    email: string;
    activites: Array<string>;
}

export default function GerenciarUsuarios() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
                fetchUsers();  
            } catch (err: any) {
                setError(err.message); 
            }
        };

        authenticateUser();
    }, []);

    const fetchUsers = async () => {
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
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-members`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            setUsers(response.data.members);
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAdmin) {  
        return <div className="p-error text-center">Você não tem permissão para acessar esta página.</div>;
    }

    if (loading) {
        return <p>Carregando usuários...</p>;
    }

    if (error) {
        return <p>Erro ao carregar usuários: {error}</p>;
    }

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
                    <div key={user.member_id} className="col-11 lg:col-7">
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
