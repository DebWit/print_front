'use client';
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import DayButton, { todayDay } from "../components/DayButtonEvents";
import EventButton from "../components/EventButton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios"; // Adicionando o axios

import "./style.css";
let hook: React.Dispatch<React.SetStateAction<number>>;

export default function Evento() {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [actualDay, setActualDay] = useState(-1);
    const [events, setEvents] = useState<{ title: string; start_date: string; end_date: string; location: string; anchor: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    hook = setActualDay as React.Dispatch<React.SetStateAction<number>>;

    const dayOfWeek = (date: Date) => {
        let data = new Date();
        let dia = data.getDay();
        if (dia <= 1 || dia >= 6) {
            return 0;
        }
        return date.getDay();
    };

    useEffect(() => {
        if (actualDay === -1)
            setActualDay(todayDay);
    }, [actualDay]);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-all-events");
                console.log(response.data.events)
                const filteredEvents = response.data.events.filter(
                    (event: any) => dayOfWeek(new Date(event.start_date)) === actualDay
                );
                setEvents(filteredEvents);
            } catch (err: any) {
                setError("Erro ao carregar eventos. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [actualDay]);

    useEffect(() => {
        if (search === '') {
            setEvents(events.filter(event => dayOfWeek(new Date(event.start_date)) === actualDay));
        } else {
            const filteredEvents = events.filter(
                event =>
                    dayOfWeek(new Date(event.start_date)) === actualDay &&
                    event.title.toLowerCase().includes(search.toLowerCase())
            );
            setEvents(filteredEvents);
        }
    }, [search, actualDay]);

    return (
        <>
            <Navbar text="Todos os Eventos" anchor="/home"></Navbar>
            <div className="w-full flex justify-content-center md:mx-0">
                <div className="p-inputgroup md:col-6 col-12 h-4rem mx-3">
                    <InputText placeholder="Pesquise aqui" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button icon="pi pi-times text-xl" className="p-button-secondary" onClick={() => setSearch("")} />
                </div>
            </div>
            <div className="w-full flex justify-content-center">
                <DayButton />
            </div>
            <div className="w-full flex justify-content-center mt-3">
                <div className="grid md:col-10 col-12 md:gap-3 gap-1 justify-content-center">
                    {loading ? (
                        <p>Carregando eventos...</p>
                    ) : error ? (
                        <p className="p-error">{error}</p>
                    ) : (
                        events.map((event, index) => (
                            <EventButton 
                                key={index} 
                                index={index + actualDay * 2} 
                                title={event.title} 
                                startTime={new Date(event.start_date).toLocaleTimeString()} 
                                endTime={new Date(event.end_date).toLocaleTimeString()} 
                                location={event.rooms} 
                                anchor={event.anchor} 
                            />
                        ))
                    )}
                </div>
            </div>
            <BottomBar disabled={4}></BottomBar>
        </>
    );
}

export { hook };
