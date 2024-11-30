'use client';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import Navbar from '@/app/components/Navbar';
import { Calendar } from 'primereact/calendar';
import './style.css';
import { FloatLabel } from 'primereact/floatlabel';

export default function CriarEvento() {
    const [formData, setFormData] = useState({
        event_id: '',
        name: '',
        description: '',
        start_date: new Date(),
        end_date: new Date(),
        rooms: {},
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        rooms: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (field: 'start_date' | 'end_date', value: Date) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddRoom = () => {
        const newRoomName = `Sala${Object.keys(formData.rooms).length + 1}`;
        setFormData((prev) => ({
            ...prev,
            rooms: { ...prev.rooms, [newRoomName]: 0 },
        }));
    };

    const handleRemoveRoom = (roomName: string) => {
        const updatedRooms = { ...formData.rooms };
        delete updatedRooms[roomName];
        setFormData((prev) => ({
            ...prev,
            rooms: updatedRooms,
        }));
    };

    const handleRoomChange = (roomName: string, value: number) => {
        setFormData((prev) => ({
            ...prev,
            rooms: { ...prev.rooms, [roomName]: value },
        }));
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.name) newErrors.name = 'Nome do evento é obrigatório.';
        if (!formData.description) newErrors.description = 'Descrição do evento é obrigatória.';
        if (!formData.start_date) newErrors.start_date = 'Data de início é obrigatória.';
        if (!formData.end_date) newErrors.end_date = 'Data de fim é obrigatória.';
        if (Object.keys(formData.rooms).length === 0) newErrors.rooms = 'Pelo menos uma sala deve ser adicionada.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <Navbar text="Criar Evento" anchor="/gerenciar-eventos" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-6 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <FloatLabel>
                            <InputText
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite o nome do evento"
                            />
                            <label htmlFor="name">Nome do Evento</label>
                        </FloatLabel>
                    </div>
                    {errors.name && <small className="ml-2 p-error">{errors.name}</small>}

                    <div className="form-group mb-3">
                        <label htmlFor="description" className="block mb-2">Descrição</label>
                        <InputTextarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full"
                            rows={5}
                            placeholder="Digite a descrição do evento"
                        />
                        {errors.description && <small className="p-error">{errors.description}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="start_date" className="block mb-2">Data de Início</label>
                        <Calendar
                            id="start_date"
                            value={formData.start_date}
                            onChange={(e) => handleDateChange('start_date', e.value as Date)}
                            showTime
                        />
                        {errors.start_date && <small className="p-error">{errors.start_date}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="end_date" className="block mb-2">Data de Fim</label>
                        <Calendar
                            id="end_date"
                            value={formData.end_date}
                            onChange={(e) => handleDateChange('end_date', e.value as Date)}
                            showTime
                        />
                        {errors.end_date && <small className="p-error">{errors.end_date}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label className="block mb-2">Salas</label>
                        {Object.keys(formData.rooms).map((roomName, index) => (
                            <div key={index} className="flex gap-2 mb-3 align-items-center">
                                <InputText
                                    placeholder="Nome da Sala"
                                    value={roomName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            rooms: {
                                                ...prev.rooms,
                                                [e.target.value]: prev.rooms[roomName],
                                            },
                                        }))
                                    }
                                    className="w-6"
                                />
                                <InputText
                                    placeholder="Capacidade"
                                    value={formData.rooms[roomName]}
                                    onChange={(e) =>
                                        handleRoomChange(roomName, parseInt(e.target.value) || 0)
                                    }
                                    type="number"
                                    className="w-3"
                                />
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-danger p-button-rounded"
                                    onClick={() => handleRemoveRoom(roomName)}
                                    type="button"
                                />
                            </div>
                        ))}
                        <Button
                            label="Adicionar Sala"
                            icon="pi pi-plus"
                            className="p-button-outlined"
                            onClick={handleAddRoom}
                            type="button"
                            />
                    </div>
                    {errors.rooms && <small className="p-error ">{errors.rooms}</small>}

                    <div className="form-group flex justify-content-end mt-4">
                        <Button label="Salvar Evento" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
