"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import DayButton, { todayDay } from "../components/DayButtonEvents";
import EventButton from "../components/EventButton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


import "./style.css";
let hook: React.Dispatch<React.SetStateAction<number>>;
export default function Evento() {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [actualDay, setActualDay] = useState(-1);
    const [events, setEvents] = useState<{ title: string; start_date: string; end_date: string; location: string; anchor: string; }[]>([]);
    hook = setActualDay as React.Dispatch<React.SetStateAction<number>>;

    const dayOfWeek = (date: Date) => {
        let data = new Date();
        let dia = data.getDay();
        if (dia <= 1 || dia >= 6) {
            return 0
        }
        return date.getDay();
    }

    useEffect(() => {
        if (actualDay === -1)
            setActualDay(todayDay)
        if (actualDay >= 0) {
            // Filtra eventos pelo dia selecionado
            const filteredEvents = eventos.filter(
                event => dayOfWeek(event.start_date) === actualDay
            );
            setEvents(filteredEvents);
        }
    }, [actualDay]);

    useEffect(() => {
        if (search === '') {
            // Mostra todos os eventos do dia selecionado
            setEvents(eventos.filter(event => dayOfWeek(event.start_date) === actualDay));
        } else {
            // Filtra eventos pelo texto de busca
            const filteredEvents = eventos.filter(
                event =>
                    dayOfWeek(event.start_date) === actualDay &&
                    event.title.toLowerCase().includes(search.toLowerCase())
            );
            setEvents(filteredEvents);
        }
    }, [search, actualDay]);

    const eventos: { title: string; start_date: Date; end_date: Date; rooms: Object; anchor: string; }[] = [
        {
            title: "Seg",
            start_date: new Date(1732995735092),
            end_date: new Date(1732995735092),
            anchor: "/evento/550e8400-e29b-41d4-a716-446655440000",
            rooms: { "H204": 30, "H205": 40 },
        },
        {
            title: "Lorem Ipsum",
            start_date: new Date(1732995735092),
            end_date: new Date(1732995735092 * 1000),
            anchor: "/evento/550e8400-e29b-41d4-a716-446655440000",
            rooms: { "H204": 30 },
        },
    ];

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
                    {events && events.map((event, index) => (
                        <EventButton key={index} index={index + actualDay * 2} title={event.title} startTime={event.start_date.toLocaleTimeString()} endTime={event.end_date.toLocaleTimeString()} location={event.rooms} anchor={event.anchor}></EventButton>
                    ))}
                </div>
            </div>
            <BottomBar disabled={4}></BottomBar>
        </>
    );
}

export { hook };