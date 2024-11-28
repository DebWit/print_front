'use client';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Navbar from '@/app/components/Navbar';
import InputPhoto from '@/app/components/InputPhoto';
import './style.css';
import { FloatLabel } from 'primereact/floatlabel';

export default function GerenciarEntidades() {
    const [formData, setFormData] = useState({
        stu_org_id: '',
        name: '',
        description: '',
        url: '',
        instagram: '',
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const imageBodyTemplate = (rowData: any) => (
        <img src={rowData.url} alt={rowData.name} className="w-6rem h-6rem" />
    );

    return (
        <>
            <Navbar text="Gerenciar Entidades" anchor="/home" />
            <div className="grid justify-content-center px-4 mt-3">
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
                    <div className="form-group mb-3 mt-4">
                        <label htmlFor="url" className="block mb-2">Foto</label>
                        <InputPhoto onChange={handleFileChange} />
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
                                placeholder="Digite uma descrição do curso"
                            />
                            <label htmlFor="description">Descrição</label>
                        </FloatLabel>
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
                    <div className="form-group flex justify-content-end">
                        <Button label="Adicionar Entidade" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
