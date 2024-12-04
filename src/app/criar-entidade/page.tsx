'use client';
import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Navbar from '@/app/components/Navbar';
import InputPhoto from '@/app/components/InputPhoto';
import { FloatLabel } from 'primereact/floatlabel';
import './style.css';
import axios from 'axios';
import { getMsalInstance } from '../../msalInstance';

export default function CriarEntidade() {
    const [formData, setFormData] = useState({
        stu_org_id: '',
        name: '',
        description: '',
        url: '',
        instagram: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        url: '',
        instagram: '',
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
            } catch (err: any) {
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

    const handleFileChange = (file: any) => {
        if (file) {
            setFormData((prev) => ({
                ...prev,
                url: URL.createObjectURL(file),
            }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.name) newErrors.name = 'Nome da entidade é obrigatório.';
        if (!formData.description) newErrors.description = 'Descrição da entidade é obrigatória.';
        if (!formData.url) newErrors.url = 'Foto da entidade é obrigatória.';
        if (!formData.instagram) newErrors.instagram = 'Instagram é obrigatório.';
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

            const response = await axios.post(
                'https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/create-student-organization',
                { ...formData },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            console.log('Entidade criada com sucesso:', response.data);
            alert('Entidade criada com sucesso!');
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
            <Navbar text="Gerenciar Entidades" anchor="/gerenciar-entidades" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-4 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="name" className="block mb-2">Nome</label>
                        <InputText
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Digite o nome da entidade"
                        />
                    </div>
                    {errors.name && <small className="p-error">{errors.name}</small>}

                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="url" className="block mb-2">Foto</label>
                        <InputPhoto onChange={handleFileChange} />
                        {errors.url && <small className="p-error">{errors.url}</small>}
                    </div>

                    <div className="form-group col-12 mb-3 mt-4">
                        <FloatLabel>
                            <InputTextarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full"
                                rows={5}
                                placeholder="Digite uma descrição da entidade"
                            />
                            <label htmlFor="description">Descrição</label>
                        </FloatLabel>
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </div>

                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="instagram" className="block mb-2">Instagram</label>
                        <InputText
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="Digite o link do Instagram"
                        />
                    </div>
                    {errors.instagram && <small className="p-error">{errors.instagram}</small>}

                    <div className="form-group flex justify-content-end">
                        <Button label="Adicionar Entidade" type="submit" disabled={loading} />
                    </div>
                    {loading && <div>Carregando...</div>}
                    {error && <div className="p-error">{error}</div>}
                </form>
            </div>
        </>
    );
}
