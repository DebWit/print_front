'use client';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import { Button } from "primereact/button";
import { useParams } from "next/navigation";  // Importando useParams
import '../style.css';

export default function GerenciarNotificacao() {
    const { id } = useParams();  // Obtendo o id da URL
    const [data, setData] = useState({
        notification_id: id || "d65308fd-6940-4d6d-92b5-6247d8af834a",  // Usando o id da URL
        title: "Notificação 1",
        description:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium perferendis fuga veritatis tempore nemo. At maiores exercitationem nihil rem doloremque suscipit dolorem, expedita, cum porro eaque dignissimos quasi eum nostrum.",
        timestamp: 1732725960,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            ...data,
            timestamp: Math.floor(Date.now() / 1000)
        };
        setData(updatedData);
    };

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
                    </div>

                    <div className="form-group flex justify-content-end mt-4">
                        <Button label="Enviar Notificação" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
