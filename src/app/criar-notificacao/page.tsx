'use client';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Navbar from '@/app/components/Navbar';
import './style.css';
import { FloatLabel } from 'primereact/floatlabel';

export default function GerenciarNotificacoes() {
    const [formData, setFormData] = useState({
        notification_id: '',
        title: '',
        description: '',
        timestamp: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const timestamp = Math.floor(Date.now() / 1000);
        setFormData((prev) => ({
            ...prev,
            timestamp,
        }));
    };

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
                    </div>
                    <div className="form-group flex justify-content-end">
                        <Button label="Adicionar Notificação" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
