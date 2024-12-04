'use client';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import Navbar from '@/app/components/Navbar';
import { useState, useEffect } from 'react';
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { getMsalInstance } from "../../../msalInstance"; 
import axios from "axios";
import '../style.css';
import { useParams } from "next/navigation";

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
    const { id } = useParams();
    const [data, setData] = useState<EventData>({
        event_id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Evento de Teste bemmmmm longoo",
        banner: "/login-background.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac turpis tincidunt.",
        start_date: new Date(1732725960),
        end_date: new Date(1734725960),
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                fetchEventData(); // Fetch event data after user is authenticated
            } catch (err) {
                setError(err.message);
            }
        };

        authenticateUser();
    }, []);

    const fetchEventData = async () => {
        try {
            const msalInstance = await getMsalInstance();
            const accounts = msalInstance.getAllAccounts();

            const tokenResponse = await msalInstance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: accounts[0],
            });

            const response = await axios.post(
                `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-event`, // Replace with your actual API URL
                { event_id: id },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            );

            console.log("Fetched Event Data:", response.data);
            setData(response.data);
        } catch (err: any) {
            console.error("Error fetching event data:", err);
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
        if (data.start_date >= data.end_date) newErrors.end_date = 'A data de fim deve ser maior que a data de início.';

        if (roomOrder.length === 0) {
            newErrors.rooms = 'Pelo menos uma sala deve ser criada.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
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
                    rooms: data.rooms, // Ensure rooms are included
                };

                const response = await axios.post(
                    `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/update-event`, // Replace with your actual API URL
                    updatedData,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.accessToken}`,
                        },
                    }
                );

                alert("Evento atualizado com sucesso!");
            } catch (err: any) {
                console.error("Error updating event:", err);
                setError(err.response ? err.response.data.message : err.message);
            }
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
                <h2>Erro ao carregar evento:</h2>
                <p>{error}</p>
            </div>
        );
    }

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
                            name="start_date"
                            value={data.start_date}
                            onChange={handleChange}
                            showTime
                            hourFormat="24"
                        />
                        {errors.start_date && <small className="ml-2 p-error">{errors.start_date}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="end_date" className="block mb-2">Data de Fim</label>
                        <Calendar
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={handleChange}
                            showTime
                            hourFormat="24"
                        />
                        {errors.end_date && <small className="ml-2 p-error">{errors.end_date}</small>}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="rooms" className="block mb-2">Salas</label>
                        {roomOrder.map((roomName) => (
                            <div key={roomName} className="flex">
                                <InputText
                                    className="w-full"
                                    value={roomName}
                                    onChange={(e) => handleRoomNameChange(roomName, e.target.value)}
                                />
                                <InputText
                                    value={data.rooms[roomName]}
                                    onChange={(e) =>
                                        handleRoomChange(roomName, Number(e.target.value))
                                    }
                                />
                                <Button
                                    className="p-button-danger"
                                    onClick={() => handleRemoveRoom(roomName)}
                                    icon="pi pi-times"
                                />
                            </div>
                        ))}
                        <Button label="Adicionar Sala" onClick={handleAddRoom} className="mt-3" />
                        {errors.rooms && <small className="ml-2 p-error">{errors.rooms}</small>}
                    </div>

                    <Button label="Salvar" type="submit" className="p-button-success w-full" />
                </form>
            </div>
        </>
    );
}
