"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import { AutoComplete } from 'primereact/autocomplete';
import DayButton, {todayDay} from "../components/DayButton";
import EventButton from "../components/EventButton";


import "./style.css";
let hook: React.Dispatch<React.SetStateAction<number>>;
export default function Evento() {
  const days: Array<string> = ["SEG", "TER", "QUA", "QUI", "SEX"];
  const [value, setValue] = useState('');
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
  const search = (event: { query: string; }) => {
    let _items = [...Array(10).keys()].map(item => item.toString());
    setItems(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
  }

  const eventos: { [key: string]: { title: string; startTime: string; endTime: string; location: string; anchor: string; }[] } = {
    "SEG":[{
        "title": "Seg",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    }],
    "TER":[{
        "title": "Ter",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    }],
    "QUA":[{
        "title": "Qua",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    }],
    "QUI":[{
        "title": "Qui",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    }],
    "SEX":[{
        "title": "Sex",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    },
    {
        "title": "Lorem Ipsum",
        "startTime": "7:40",
        "endTime": "8:40",
        "location": "CEAF",
        "anchor": "#"
    }],
}

  return (
    <>
      <Navbar text="Todos os Eventos" anchor="/home"></Navbar>
      <div className="w-full flex justify-content-center">
        <AutoComplete className="md:col-6 col-12 h-4rem" value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
      </div>
      <div className="w-full flex justify-content-center">
        <DayButton/>
      </div>
      <div className="w-full flex justify-content-center mt-3">
        <div className="grid md:col-10 col-12 md:gap-3 gap-1 justify-content-center">
        {events.map((event, index) => (
          <EventButton key={index} index={index+actualDay*2} title={event.title} startTime={event.startTime} endTime={event.endTime} location={event.location} anchor={event.anchor}></EventButton>
        ))}
        </div>
      </div>
      <BottomBar disabled={4}></BottomBar>
    </>
  );
} 

export{ hook };