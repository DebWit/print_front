'use client';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Navbar from '@/app/components/Navbar';
import InputPhoto from '@/app/components/InputPhoto';
import { useParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import '../style.css';
import { Button } from "primereact/button";
import { getMsalInstance } from "../../../msalInstance";
import axios from "axios";

export default function GerenciarEntidade() {
    const { id } = useParams();
    const [data, setData] = useState({
        name: '',
        description: '',
        logo: '',
        instagram: '',
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<any>({});
    const [error, setError] = useState("");
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
            } catch (err) {
                setError(err.message);
            }
        };

        authenticateUser();
    }, []);

    useEffect(() => {
        const fetchStudentOrganization = async () => {
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
                    `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-student-organization`,
                    { stu_org_id: id },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    }
                );

                setData(response.data);
            } catch (err: any) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        if (isAdmin) {
            fetchStudentOrganization(); 
        }
    }, [isAdmin, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e?.target?.files?.[0];
        if (file) {
            setData((prev) => ({
                ...prev,
                [fieldName]: URL.createObjectURL(file),
            }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!data.name) newErrors.name = 'Nome da entidade é obrigatório.';
        if (!data.description) newErrors.description = 'Descrição da entidade é obrigatória.';
        if (!data.logo) newErrors.logo = 'Foto da entidade é obrigatória.';
        if (!data.instagram) newErrors.instagram = 'Instagram é obrigatório.';

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

            await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/update-student-organization`,
                { ...data },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            alert("Entidade atualizada com sucesso!");
        } catch (err: any) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    if (!isAdmin) {
        return <div className="p-error text-center">Você não tem permissão para acessar esta página.</div>;
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar entidade: {error}</div>;
    }

    return (
        <>
            <Navbar text="Gerenciar Entidade" anchor="/gerenciar-entidades" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-4 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 mt-4">
                        <FloatLabel>
                            <InputText
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <label htmlFor="name">Nome da Entidade</label>
                        </FloatLabel>
                        {errors.name && <small className="ml-2 p-error">{errors.name}</small>}
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="logo" className="block mb-2">Foto da Entidade</label>
                        <InputPhoto
                            currentPhoto={data.logo}
                            onChange={(file: any) => handleFileChange(file, 'logo')}
                        />
                        {errors.logo && <small className="ml-2 p-error">{errors.logo}</small>}
                    </div>
                    <div className="form-group col-12 mb-3 mt-4">
                        <FloatLabel>
                            <InputTextarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={handleChange}
                                className="w-full"
                                rows={5}
                            />
                            <label htmlFor="description">Descrição</label>
                        </FloatLabel>
                        {errors.description && <small className="ml-2 p-error">{errors.description}</small>}
                    </div>

                    <div className="form-group mb-3 mt-4">
                        <FloatLabel>
                            <InputText
                                id="instagram"
                                name="instagram"
                                value={data.instagram}
                                onChange={handleChange}
                            />
                            <label htmlFor="instagram">Instagram</label>
                        </FloatLabel>
                        {errors.instagram && <small className="ml-2 p-error">{errors.instagram}</small>}
                    </div>
                    <div className="form-group flex justify-content-end">
                        <Button label="Atualizar Entidade" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
