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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

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
                                placeholder="Digite uma descrição do curso"
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
                        <Button label="Adicionar Entidade" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
