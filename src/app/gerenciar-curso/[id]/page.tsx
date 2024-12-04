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

export default function GerenciarCurso() {
    const { id } = useParams();
    const [data, setData] = useState({
        course_id: '',
        name: '',
        course_photo: '',
        coordinator: '',
        coordinator_photo: '',
        description: '',
        link: ''
    });
    const [errors, setErrors] = useState({
        name: "",
        coordinator: "",
        description: "",
        link: "",
        course_photo: "",
        coordinator_photo: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
                fetchCourse();  
            } catch (err: any) {
                setError(err.message);
            }
        };

        authenticateUser();
    }, []);

    const fetchCourse = async () => {
        try {
            const msalInstance = await getMsalInstance();
            const accounts = msalInstance.getAllAccounts();

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: accounts[0],
            });

            const response = await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-course`,
                { course_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            console.log("Fetched Course:", response.data);
            setData(response.data);
        } catch (err: any) {
            console.error("Error fetching course:", err);
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

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

        if (!data.name) newErrors.name = 'Nome do curso é obrigatório.';
        if (!data.coordinator) newErrors.coordinator = 'Nome do coordenador é obrigatório.';
        if (!data.description) newErrors.description = 'Descrição do curso é obrigatória.';
        if (!data.link) newErrors.link = 'Link do curso é obrigatório.';
        if (!data.course_photo) newErrors.course_photo = 'Foto do curso é obrigatória.';
        if (!data.coordinator_photo) newErrors.coordinator_photo = 'Foto do coordenador é obrigatória.';

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
                update_date: Date.now(),
            };
    
            const response = await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/update-course`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );
                
            alert("Curso atualizado com sucesso!");
        } catch (err: any) {
            console.error("Error updating course:", err);
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
        return (
            <div className="error-container">
                <h2>Erro ao carregar curso:</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (id !== data.course_id) {
        return <div>Curso não encontrado!</div>;
    }

    return (
        <>
            <Navbar text="Gerenciar Curso" anchor="/gerenciar-cursos" />
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
                            <label htmlFor="name">Nome do Curso</label>
                        </FloatLabel>
                        {errors.name && <small className="ml-2 p-error">{errors.name}</small>}
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="course_photo" className="block mb-2">Foto do Curso</label>
                        <InputPhoto
                            currentPhoto={data.course_photo}
                            onChange={(file: any) => handleFileChange(file, 'course_photo')}
                        />
                        {errors.course_photo && <small className="ml-2 p-error">{errors.course_photo}</small>}
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <FloatLabel>
                            <InputText
                                id="coordinator"
                                name="coordinator"
                                value={data.coordinator}
                                onChange={handleChange}
                            />
                            <label htmlFor="coordinator">Coordenador</label>
                        </FloatLabel>
                        {errors.coordinator && <small className="ml-2 p-error">{errors.coordinator}</small>}
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="coordinator_photo" className="block mb-2">Foto do Coordenador</label>
                        <InputPhoto
                            currentPhoto={data.coordinator_photo}
                            onChange={(file: any) => handleFileChange(file, 'coordinator_photo')}
                        />
                        {errors.coordinator_photo && <small className="ml-2 p-error">{errors.coordinator_photo}</small>}
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
                                id="link"
                                name="link"
                                value={data.link}
                                onChange={handleChange}
                            />
                            <label htmlFor="link">Link</label>
                        </FloatLabel>
                        {errors.link && <small className="ml-2 p-error">{errors.link}</small>}
                    </div>

                    <Button
                        label="Atualizar Curso"
                        type="submit"
                        className="mt-3 p-button-outlined w-full"
                    />
                </form>
            </div>
        </>
    );
}
