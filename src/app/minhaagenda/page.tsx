"use client"
import Navbar from "../components/Navbar";
import DayButton, { todayDay } from "../components/DayButtonEvents";
import EventButton from "../components/EventButton";
import BottomBar from "../components/BottomBar";
import { use, useEffect, useState } from "react";
import { setActualDayHook } from "../hooks/setActualdayHook";
import axios from "axios";

import "./style.css";
import { getMsalInstance } from "@/msalInstance";

export default function MinhaAgenda() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [memberId, setMemberId] = useState('')
    const [items, setItems] = useState<string[]>([]);
    const [actualDay, setActualDay] = useState(-1);
    const [events, setEvents] = useState([]);   
    const [allEvents, setAllEvents] = useState([]);   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    setActualDayHook(setActualDay);

    const dayOfWeek = (date: Date) => {
        let data = new Date();
        let dia = data.getDay();
        if (dia <= 1 || dia >= 6) {
            return 0;
        }
        return dia-1;
    };

    useEffect(() => {
        const initializeMsal = async () => {
            try {
                const msalInstance = await getMsalInstance();
                const msalAccounts = msalInstance.getAllAccounts();

                if (msalAccounts.length === 0) {
                    throw new Error("Usuário não autenticado. Faça login novamente.");
                }
                setMemberId(msalAccounts[0].localAccountId)

                const memberResponse = await axios.post('https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-member', { "member_id": msalAccounts[0].localAccountId })

                let memberEvents: any = []

                memberResponse.data.activities.forEach(async (e: any) => {
                    const eventResponse = await axios.post('https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-event', { "event_id": e })
                    memberEvents.push(eventResponse.data);
                });
                setAllEvents(memberEvents)

                const tokenResponse = await msalInstance.acquireTokenSilent({
                    scopes: ["User.Read"],
                    account: msalAccounts[0],
                });

            } catch (err: any) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        initializeMsal();
    }, []);

    useEffect(() => {
        console.log(actualDay)
        const fetchEvents = async () => {
            try{
                setLoading(true);
                const filteredEvents = allEvents.filter(
                    (event: any) => dayOfWeek(new Date(event.start_date)) === actualDay
                );
                setEvents(filteredEvents);
            }finally{
                setLoading(false);
            }
        };
        fetchEvents();
        if(actualDay === -1){
            setTimeout(() => {setActualDay(todayDay)},500)
        }
    }, [actualDay, allEvents]);


    return (
        <>
            <Navbar text="Minha Agenda" anchor="/home"></Navbar>
            <div className="w-full flex justify-content-center">
                <DayButton setActualDay={setActualDay} />
            </div>
            <div className="w-full flex justify-content-center mt-3">
                <div className="grid md:col-10 col-12 md:gap-3 gap-1 justify-content-center">
                    {loading ? (
                        <p>Carregando seus eventos...</p>
                    ) : error ? (
                        <p className="p-error">{error}</p>
                    ) : (
                        events.map((event: any, index) => (
                            <EventButton
                                key={index}
                                index={index + actualDay * 2}
                                title={event.name}
                                startTime={new Date(event.start_date).toLocaleTimeString()}
                                endTime={new Date(event.end_date).toLocaleTimeString()}
                                location={event.rooms}
                                anchor={`evento/${event.event_id}`}
                            />
                        ))
                    )}
                </div>
            </div>
            <BottomBar disabled={2}></BottomBar>
        </>
    )
}