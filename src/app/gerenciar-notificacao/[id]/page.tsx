'use client';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Navbar from '@/app/components/Navbar';
import { useState, useEffect } from 'react';
import { Button } from "primereact/button";
import { useParams } from "next/navigation";
import { getMsalInstance } from "../../../msalInstance";
import axios from "axios";
import '../style.css';

export default function GerenciarNotificacao() {
    const { id } = useParams();
    const [data, setData] = useState({
        notification_id: id,
        title: "",
        description: "",
        timestamp: 0,
        has_seen: []
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNotification = async () => {
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
                    `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-notification`,
                    { notification_id: id },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    }
                );

                console.log("Fetched Notification:", response.data);
                setData(response.data);
            } catch (err: any) {
                console.error("Error fetching notification:", err);
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchNotification();
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!data.title.trim()) {
            newErrors.title = 'O título da notificação é obrigatório.';
        }

        if (!data.description.trim()) {
            newErrors.description = 'A descrição é obrigatória.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
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
    
            const updatedData = {
                ...data,
                creation_date: Date.now(),
                has_seen: data.has_seen,
            };
    
            const response = await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/update-notification`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );
                
            alert("Notificação atualizada com sucesso!");
        } catch (err: any) {
            console.error("Error updating notification:", err);
            setError(err.response ? err.response.data.message : err.message);
        }
    };
    

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Erro ao carregar notificação:</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            <Navbar text="Gerenciar Notificação" anchor="/gerenciar-notificacoes" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-4 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 mt-4">
                        <FloatLabel>
                            <InputText
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                            />
                            <label htmlFor="title">Título da Notificação</label>
                        </FloatLabel>
                        {errors.title && <small className="ml-2 p-error">{errors.title}</small>}
                    </div>

                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="description" className="block mb-2">Descrição</label>
                        <InputTextarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full"
                            rows={5}
                        />
                        {errors.description && <small className="ml-2 p-error">{errors.description}</small>}
                    </div>

                    <div className="form-group flex justify-content-end mt-4">
                        <Button label="Enviar Notificação" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
