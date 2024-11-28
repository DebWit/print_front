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

export default function GerenciarEntidade() {
    const { id } = useParams();
    const stuOrgId = "5fa85f64-5717-4562-b3fc-2c963f66afa8";

    if (id !== stuOrgId) {
        return <div>Entidade não encontrada!</div>;
    }

    const current_data = {
        stu_org_id: "5fa85f64-5717-4562-b3fc-2c963f66afa8",
        name: "Mauá Racing",
        description:
            "A equipe constitui-se como uma empresa estudantil de automobilismo. Os estudantes projetam, constroem e competem com um veículo de alta performance do tipo fórmula, utilizando um motor de até 710 cilindradas. Durante quatro dias de competição pela SAE Brasil, as equipes realizam provas estáticas e provas dinâmicas. O 1º e 2º colocados conquistam o direito de representar o Brasil na Fórmula SAE nos EUA.",
        url: "https://d1135f49d6br9m.cloudfront.net/Mauá Racing Fórmula.jpg",
        instagram: "https://www.instagram.com/mauaracing/"
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
            <Navbar text="Gerenciar Entidade" anchor="/gerenciar-entidades" />
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
                            <label htmlFor="name">Nome da Entidade</label>
                        </FloatLabel>
                    </div>
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="url" className="block mb-2">Foto da Entidade</label>
                        <InputPhoto
                            currentPhoto={data.url}
                            onChange={(file: any) => handleFileChange(file, 'url')}
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
                                id="instagram"
                                name="instagram"
                                value={data.instagram}
                                onChange={handleChange}
                            />
                            <label htmlFor="instagram">Instagram</label>
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
