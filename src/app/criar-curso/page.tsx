'use client';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Navbar from '@/app/components/Navbar';
import InputPhoto from '@/app/components/InputPhoto';
import { useState } from 'react';
import './style.css';
import { Button } from "primereact/button";

export default function CriarCurso() {
    const [data, setData] = useState({
        name: "",
        coordinator: "",
        description: "",
        link: "",
        course_photo: "",
        coordinator_photo: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        coordinator: "",
        description: "",
        link: "",
        course_photo: "",
        coordinator_photo: "",
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <Navbar text="Criar Novo Curso" anchor="/gerenciar-cursos" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-4 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 mt-4">
                        <FloatLabel>
                            <InputText
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Digite o nome do curso"
                            />
                            <label htmlFor="name">Nome do Curso</label>
                        </FloatLabel>
                        {errors.name && <small className="ml-2 p-error">{errors.name}</small>}
                    </div>

                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="course_photo" className="block mb-2">Foto do Curso</label>
                        <InputPhoto
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
                                placeholder="Digite o nome do coordenador"
                            />
                            <label htmlFor="coordinator">Coordenador</label>
                        </FloatLabel>
                        {errors.coordinator && <small className="ml-2 p-error">{errors.coordinator}</small>}
                    </div>

                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="coordinator_photo" className="block mb-2">Foto do Coordenador</label>
                        <InputPhoto
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
                                placeholder="Digite uma descrição do curso"
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
                                placeholder="Digite o link do curso"
                            />
                            <label htmlFor="link">Link</label>
                        </FloatLabel>
                        {errors.link && <small className="ml-2 p-error">{errors.link}</small>}
                    </div>

                    <div className="form-group flex justify-content-end">
                        <Button label="Criar Curso" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
