"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AutoComplete } from 'primereact/autocomplete';
import DayButton, {ActualDay} from "../components/DayButton";

import "./style.css";
let hook: React.Dispatch<React.SetStateAction<number>>;
export default function Evento() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [diaAtual, setDiaAtual] = useState(-1);
  hook = setDiaAtual as React.Dispatch<React.SetStateAction<number>>;
  useEffect(() => {
    if (diaAtual === -1) {
      setDiaAtual(ActualDay);
    }
  }, [diaAtual]);
  const search = (event: { query: string; }) => {
    let _items = [...Array(10).keys()].map(item => item.toString());
    setItems(event.query ? [...Array(10).keys()].map(item => event.query + '-' + item) : _items);
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
      <div className="w-full flex justify-content center">
        
      </div>
    </>
  );
} 

export{ hook };