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
    const days: Array<string> = ["SEG", "TER", "QUA", "QUI", "SEX"];
    const [search, setSearch] = useState('');
    const [items, setItems] = useState<string[]>([]);
    const [actualDay, setActualDay] = useState(-1);
    const [events, setEvents] = useState<{ title: string; startTime: string; endTime: string; location: string; anchor: string; }[]>([]);
    hook = setActualDay as React.Dispatch<React.SetStateAction<number>>;
    useEffect(() => {
        if (actualDay === -1) {
            setActualDay(todayDay);
        }
        if (actualDay >= 0 && actualDay < days.length) {
            setEvents(eventos[days[actualDay]]);
        }
    }, [actualDay]);

    useEffect(() => {
        if (search === '') 
            setEvents(eventos[days[actualDay]]);
        else 
            setEvents(eventos[days[actualDay]].filter((event) => event.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, actualDay]);

    const eventos: { [key: string]: { title: string; startTime: string; endTime: string; location: string; anchor: string; }[] } = {
        "SEG": [{
            "title": "Seg",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        }],
        "TER": [{
            "title": "Ter",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        }],
        "QUA": [{
            "title": "Qua",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        }],
        "QUI": [{
            "title": "Qui",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        }],
        "SEX": [{
            "title": "Sex",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        },
        {
            "title": "Lorem Ipsum",
            "startTime": "7:40",
            "endTime": "8:40",
            "location": "CEAF",
            "anchor": "/evento/550e8400-e29b-41d4-a716-446655440000"
        }],
    }

    return (
        <>
            <Navbar text="Todos os Eventos" anchor="/home"></Navbar>
            <div className="w-full flex justify-content-center md:mx-0">
                <div className="p-inputgroup md:col-6 col-12 h-4rem mx-3">
                    <InputText placeholder="Pesquise aqui" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button icon="pi pi-times text-xl" className="p-button-secondary" onClick={() => setSearch("")}/>
                </div>
            </div>
            <div className="w-full flex justify-content-center">
                <DayButton />
            </div>
            <div className="w-full flex justify-content-center mt-3">
                <div className="grid md:col-10 col-12 md:gap-3 gap-1 justify-content-center">
                    {events && events.map((event, index) => (
                        <EventButton key={index} index={index + actualDay * 2} title={event.title} startTime={event.startTime} endTime={event.endTime} location={event.location} anchor={event.anchor}></EventButton>
                    ))}
                </div>
            </div>
            <BottomBar disabled={4}></BottomBar>
        </>
    );
}

export { hook };