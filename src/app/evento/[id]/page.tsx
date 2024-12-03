"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import BottomBar from "@/app/components/BottomBar";
import { useParams } from "next/navigation";
import axios from "axios";
import { getMsalInstance } from "../../../msalInstance";
import "../style.css";
import { Button } from "primereact/button";

export default function Evento() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const fetchEvent = async () => {
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

      console.log("Access Token:", tokenResponse.accessToken);
      const response = await axios.post(
        "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/get-event",
        { "event_id": id },
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.accessToken}`,
          },
        }
      );
      console.log(response.data)
      setEvent(response.data);
    } catch (err: any) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async () => {
    try {
      setLoading(true);
  
      const msalInstance = await getMsalInstance();
      const accounts = msalInstance.getAllAccounts();
  
      if (accounts.length === 0) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }
  
      const account = accounts[0];
      const memberId = account.localAccountId;
  
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["User.Read"],
        account: accounts[0],
      });
  
      console.log("Access Token:", tokenResponse.accessToken);
  
      // Configuração inicial para as requisições
      const headers = {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
      };
  
      const currentActivities = event.activities || [];
      const updatedActivities = subscribed
        ? currentActivities.filter((activity) => activity !== id)
        : [...currentActivities, id];
  
      await axios.post(
        "https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/update_member_activities",
        {
          member_id: memberId,
          event_id: id,
          activities: updatedActivities,
        },
        { headers }
      );
  
      // Inscrever ou desinscrever no evento
      const route = subscribed ? "unsubscribe-event" : "subscribe-event";
      await axios.post(
        `https://fkohtz7d4a.execute-api.sa-east-1.amazonaws.com/prod/${route}`,
        {
          event_id: id,
          member_id: memberId,
        },
        { headers }
      );
  
      setSubscribed(!subscribed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) {
    return <div>Carregando dados do evento...</div>;
  }

  if (error) {
    return <div>Erro ao carregar evento: {error}</div>;
  }

  if (!event) {
    return <div>Evento não encontrado!</div>;
  }

  return (
    <>
      <Navbar text={event.name} anchor="/eventos"></Navbar>
      <div className="flex w-full justify-content-center">
        <div className="md:col-6 col-12 p-0">
          <div className="p-2 px-2 my-2 text-center text-3xl" style={{ color: "#fff" }}>
            {event.name}
          </div>
          <img src={event.banner} alt="Foto do evento" className="w-full md:border-round" style={{ aspectRatio: "18/9" }} />
          <div className="flex w-full justify-content-center mt-3">
            <div className="md:max-w-20rem col-9 flex border-round text-2xl align-items-center" style={{ color: "#FFF", backgroundColor: "#D22626" }}>
              <i className="pi pi-clock text-3xl pl-1"></i>
              <span className="text-right w-full pr-2">{new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex w-full justify-content-center mt-2">
            <div className="md:max-w-20rem col-9 flex border-round text-2xl align-items-center" style={{ color: "#FFF", backgroundColor: "#248CB5" }}>
              <i className="pi pi-calendar text-3xl pl-1"></i>
              <span className="text-right w-full pr-2">{new Date(event.start_date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex">
            <p className="text-white text-justify p-4 text-2xl">
              {isExpanded
                ? event.description
                : `${event.description.substring(0, 150)}... `}
              <a className="text-blue-500 underline" onClick={handleToggleDescription}>
                {isExpanded ? " Ver menos" : "Ver mais"}
              </a>
            </p>
          </div>
          <div className="flex justify-content-center">
            <Button
              className="md:max-w-20rem col-9 text-2xl h-4rem transition-duration-500"
              severity={subscribed ? "danger" : "success"}
              label={subscribed ? "Desinscrever-se" : "Inscrever-se"}
              icon={subscribed ? "pi pi-times text-2xl" : "pi pi-check text-2xl"}
              loading={loading}
              onClick={handleSubscription}
            />
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}
