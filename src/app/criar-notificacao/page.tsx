'use client';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Navbar from '@/app/components/Navbar';
import './style.css';
import { FloatLabel } from 'primereact/floatlabel';
import axios from 'axios';
import { getMsalInstance } from '../../msalInstance';

export default function CriarNotificacao() {
    const [formData, setFormData] = useState({
        notification_id: '',
        title: '',
        description: '',
        timestamp: 0,
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const accounts = msalInstance.getAllAccounts();

                if (accounts.length === 0) {
                    throw new Error('Usuário não autenticado. Faça login novamente.');
                }

                const username = accounts[0].username.split('@')[0];
                const isCommonUser = /^\d{2}\.\d{5}-\d$/.test(username);

                if (isCommonUser) {
                    throw new Error('Você não tem permissão para acessar esta página.');
                }

                setIsAdmin(true);
            } catch (err:any) {
                setError(err.message);
            }
        };

        authenticateUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.title) newErrors.title = 'Título é obrigatório.';
        if (!formData.description) newErrors.description = 'Descrição é obrigatória.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const msalInstance = await getMsalInstance();
            const accounts = msalInstance.getAllAccounts();

            if (accounts.length === 0) {
                throw new Error('Usuário não autenticado. Faça login novamente.');
            }

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ['User.Read'],
                account: accounts[0],
            });

            const notificationData = {
                ...formData,
                creation_date: Date.now(),
                has_seen: [],
            };

            const response = await axios.post(
                'https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/create-notification',
                notificationData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            console.log('Notificação criada com sucesso:', response.data);
            alert('Notificação criada com sucesso!');
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return <div className="p-error text-center">Você não tem permissão para acessar esta página.</div>;
    }

    return (
        <>
            <Navbar text="Gerenciar Notificações" anchor="/gerenciar-notificacoes" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-4 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 mt-4 ml-2">
                        <label htmlFor="title" className="block mb-2">Título</label>
                        <InputText
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Digite o título da notificação"
                        />
                    </div>
                    {errors.title && <small className="ml-2 p-error">{errors.title}</small>}

                    <div className="form-group col-12 mb-3 mt-4">
                        <FloatLabel>
                            <InputTextarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full"
                                rows={5}
                                placeholder="Digite a descrição da notificação"
                            />
                            <label htmlFor="description">Descrição</label>
                        </FloatLabel>
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </div>

                    <div className="form-group flex justify-content-end">
                        <Button label="Adicionar Notificação" type="submit" disabled={loading} />
                    </div>
                    {loading && <div>Carregando...</div>}
                    {error && <div className="p-error">{error}</div>}
                </form>
            </div>
        </>
    );
}
