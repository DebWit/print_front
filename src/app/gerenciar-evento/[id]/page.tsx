'use client';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import Navbar from '@/app/components/Navbar';
import { useState } from 'react';
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import '../style.css';

type EventData = {
    event_id: string;
    name: string;
    banner: string;
    description: string;
    start_date: Date;
    end_date: Date;
    rooms: Record<string, number>;
};

export default function GerenciarEvento() {
    const [data, setData] = useState<EventData>({
        event_id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Evento de Teste bemmmmm longoo",
        banner: "/login-background.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac turpis tincidunt.",
        start_date: new Date(1732725960 * 1000),
        end_date: new Date(1734725960 * 1000),
        rooms: { "H204": 30, "H205": 40 },
    });

    const [roomOrder, setRoomOrder] = useState<string[]>(Object.keys(data.rooms));
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        rooms: "",  
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoomChange = (roomName: string, value: number) => {
        setData((prev) => ({
            ...prev,
            rooms: { ...prev.rooms, [roomName]: value },
        }));
    };

    const handleAddRoom = () => {
        const newRoomName = `Sala${roomOrder.length + 1}`;
        setData((prev) => ({
            ...prev,
            rooms: { ...prev.rooms, [newRoomName]: 0 },
        }));
        setRoomOrder((prev) => [...prev, newRoomName]);
    };

    const handleRemoveRoom = (roomName: string) => {
        const updatedRooms = { ...data.rooms };
        delete updatedRooms[roomName];
        setData((prev) => ({
            ...prev,
            rooms: updatedRooms,
        }));
        setRoomOrder((prev) => prev.filter((name) => name !== roomName));
    };

    const handleRoomNameChange = (oldName: string, newName: string) => {
        const updatedRooms = { ...data.rooms };
        updatedRooms[newName] = updatedRooms[oldName];
        delete updatedRooms[oldName];
        setData((prev) => ({
            ...prev,
            rooms: updatedRooms,
        }));
        setRoomOrder((prev) =>
            prev.map((name) => (name === oldName ? newName : name))
        );
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!data.name) newErrors.name = 'Nome do evento é obrigatório.';
        if (!data.description) newErrors.description = 'Descrição é obrigatória.';
        if (!data.start_date) newErrors.start_date = 'Data de início é obrigatória.';
        if (!data.end_date) newErrors.end_date = 'Data de fim é obrigatória.';

        if (roomOrder.length === 0) {
            newErrors.rooms = 'Pelo menos uma sala deve ser criada.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <Navbar text="Gerenciar Evento" anchor="/gerenciar-eventos" />
            <div className="grid justify-content-center px-4 mt-3 mx-0">
                <form className="lg:col-6 col-12 p-4 shadow-2 border-round" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <FloatLabel>
                            <InputText
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                            <label htmlFor="name">Nome do Evento</label>
                        </FloatLabel>
                        {errors.name && <small className="ml-2 p-error">{errors.name}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="description" className="block mb-2">Descrição</label>
                        <InputTextarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full"
                            rows={5}
                        />
                        {errors.description && <small className="ml-2 p-error">{errors.description}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="start_date" className="block mb-2">Data de Início</label>
                        <Calendar
                            id="start_date"
                            value={data.start_date}
                            onChange={(e) => setData((prev) => ({ ...prev, start_date: e.value as Date }))}
                            showTime
                        />
                        {errors.start_date && <small className="ml-2 p-error">{errors.start_date}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="end_date" className="block mb-2">Data de Fim</label>
                        <Calendar
                            id="end_date"
                            value={data.end_date}
                            onChange={(e) => setData((prev) => ({ ...prev, end_date: e.value as Date }))}
                            showTime
                        />
                        {errors.end_date && <small className="ml-2 p-error">{errors.end_date}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label className="block mb-2">Salas</label>
                        {roomOrder.map((roomName, index) => (
                            <div key={index} className="flex gap-2 mb-3 align-items-center">
                                <InputText
                                    placeholder="Nome da Sala"
                                    value={roomName}
                                    onChange={(e) => handleRoomNameChange(roomName, e.target.value)}
                                    className="w-6"
                                />
                                <InputText
                                    placeholder="Capacidade"
                                    value={data.rooms[roomName]}
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
                        {errors.rooms && <small className="p-error">{errors.rooms}</small>}

                    <div className="form-group flex justify-content-end mt-4">
                        <Button label="Salvar Evento" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
