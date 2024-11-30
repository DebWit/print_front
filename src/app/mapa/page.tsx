"use client";
import React from "react";
import Navbar from "../components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import "./style.css";

export default function Mapa() {
    return (
<>
        <Navbar text="Mapa" anchor="/home" />
        <div className="mapa_maua flex justify-content-center">
            <div className="content">
                <h1 className="title w-full flex justify-content-center">Explore a Mauá!</h1>
                <p className="subtitle w-full flex justify-content-center">
                    Praça Mauá, 1 - Mauá, São Caetano do Sul - SP, 09580-900
                </p>

                <div className="map-container w-full grid justify-content-center">
                    <iframe
                        className=" block md:col-8 w-full"
                        src="https://www.google.com/maps/d/embed?mid=1zetzYfg_D5u-zJQ50mZEed-GOz2noMQ&ehbc=2E312F&noprof=1"
                        width="100%"
                        height="600"
                        style={{ border: "0", borderRadius: "10px" }}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

        </div>
        <BottomBar disabled={1}/>
        </>
    );
}   


