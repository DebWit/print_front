'use client';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Navbar from '@/app/components/Navbar';
import InputPhoto from '@/app/components/InputPhoto';
import { useParams } from "next/navigation";
import React, { useState } from 'react';
import '../style.css';
import { Button } from "primereact/button";

export default function GerenciarCurso() {
    const { id } = useParams();
    const ida = '3d9221a7-ef6b-4b6a-90ed-aa6de72c5504';

    if (id !== ida) {
        return <div>Curso não encontrado!</div>;
    }

    const current_data = {
        course_id: '3d9221a7-ef6b-4b6a-90ed-aa6de72c5504',
        name: "Ciência da Computação",
        course_photo: "/background-splash.png",
        coordinator: "Rudolf Theoderich Bühler",
        coordinator_photo: "/background-splash.png",
        description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, perspiciatis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam velit similique laborum dolorem id ipsum beatae ipsa. Mollitia, facere! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, enim.",
        link: "maua.br",
    };

    const [data, setData] = useState(current_data);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <Navbar text="Gerenciar Curso" anchor="/home" />
            <div className="grid justify-content-center px-4 mt-3">
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
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="course_photo" className="block mb-2">Foto do Curso</label>
                        <InputPhoto
                            currentPhoto={data.course_photo}
                            onChange={(file:any) => handleFileChange(file, 'course_photo')}
                        />
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
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="coordinator_photo" className="block mb-2">Foto do Coordenador</label>
                        <InputPhoto
                            currentPhoto={data.coordinator_photo}
                            onChange={(file: any) => handleFileChange(file, 'coordinator_photo')}
                        />
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
                    </div>
                    <div className="form-group flex justify-content-end">
                        <Button label="Submit" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
