"use client"
import Navbar from "../../components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import { useParams } from "next/navigation";
import "./style.css";
import { start } from "repl";
import { useState } from "react";
import { Button } from 'primereact/button';

export default function Evento() {
    const { id } = useParams();

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSubscribed(!subscribed);
        }, 2500);
    };

    const event = {
        event_id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Evento de Teste bemmmmm longoo",
        event_photo: "/login-background.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac turpis tincidunt. Sed nec semper metus. consectetur adipiscing elit. Nullam nec purus ac turpis tincidunt. Sed nec semper metus",
        start: "7:40",
        end: "8:40",
        location: "CEAF",
    }

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <Navbar text="Evento" anchor="/eventos"></Navbar>
            <div className="flex w-full justify-content-center">
                <div className="md:col-6 col-12 p-0 ">
                    <div className="p-2 px-2 my-2 text-center text-3xl" style={{ color: "#fff" }}>{event.name}</div>
                    <img src="/login-background.png" alt="Foto do evento" className="w-full md:border-round" style={{ aspectRatio: "18/9" }} />
                    <div className="flex w-full justify-content-center mt-3">
                        <div className="md:max-w-20rem col-9 flex border-round text-2xl align-items-center" style={{ color: "#FFF",  backgroundColor: "#D22626" }}>
                            <i className="pi pi-clock text-3xl pl-1"></i>
                            <span className="text-right w-full pr-2">{event.start} - {event.end}</span>
                        </div>
                    </div>
                    <div className="flex w-full justify-content-center mt-2">
                        <div className="md:max-w-20rem col-9 flex border-round text-2xl align-items-center" style={{ color: "#FFF",  backgroundColor: "#248CB5" }}>
                            <i className="pi pi-calendar text-3xl pl-1"></i>
                            <span className="text-right w-full pr-2">{event.start}</span>
                        </div>
                    </div>
                    <div className="flex w-full justify-content-center mt-2">
                        <div className="md:max-w-20rem col-9 flex border-round text-2xl align-items-center" style={{ color: "#FFF",  backgroundColor: "#F9A818" }}>
                            <i className="pi pi-map-marker text-3xl pl-1"></i>
                            <span className="text-right w-full pr-2">{event.location}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="text-white text-justify p-4 text-2xl">
                            {isExpanded
                                ? event.description
                                : `${event.description.substring(0, 150)}... `}
                            <a
                                className="text-blue-500 underline"
                                onClick={handleToggleDescription}
                            >
                                {isExpanded ? " Ver menos" : "Ver mais"}
                            </a>
                        </p>
                    </div>
                    <div className="flex justify-content-center">
                        <Button className="md:max-w-20rem col-9 text-2xl h-4rem transition-duration-500" severity={subscribed ? "danger": "success"} label={subscribed ? "Desinscrever-se": "Inscrever-se"} icon={subscribed ? "pi pi-times text-2xl" : "pi pi-check text=2xl"} loading={loading} onClick={load} />
                    </div>
                </div>
            </div>
            <BottomBar disabled={4}></BottomBar>
        </>
    )
}