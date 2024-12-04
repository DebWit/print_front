"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HomeButton from "../components/HomeButton";
import BottomBar from "../components/BottomBar";
import CarouselHome from "../components/Carousel";
import { getMsalInstance } from "../../msalInstance";
import "./../style.css";
import "./style.css";

export default function Homepage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const msalInstance = await getMsalInstance();
        const accounts = msalInstance.getAllAccounts();

        if (accounts.length === 0) {
          throw new Error("Usuário não autenticado. Faça login novamente.");
        }

        const username = accounts[0].username.split("@")[0];
        const isCommonUser = /^\d{2}\.\d{5}-\d$/.test(username);
        setIsAdmin(!isCommonUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const userCards = [
    {
      text: "eventos",
      icon: "pi pi-bars",
      inverted: false,
      backgroundImage: "/home-1.png",
      link: "/eventos",
    },
    {
      text: "Minha Agenda",
      icon: "pi pi-calendar",
      inverted: true,
      backgroundImage: "/home-inverted-1.png",
      link: "/minhaagenda",
    },
    {
      text: "Cursos",
      icon: "pi pi-graduation-cap",
      inverted: false,
      backgroundImage: "/home-1.png",
      link: "/cursos",
    },
    {
      text: "Notificações",
      icon: "pi pi-bell",
      inverted: true,
      backgroundImage: "/home-inverted-1.png",
      link: "/notificacoes",
    },
    {
      text: "Entidades",
      icon: "pi pi-users",
      inverted: false,
      backgroundImage: "/home-1.png",
      link: "/entidades",
    },
  ];

  const adminCards = [
    {
      name: "Eventos",
      icon: "pi pi-calendar",
      color: "cyan",
      route: "/gerenciar-eventos",
    },
    {
      name: "Cursos",
      icon: "pi pi-graduation-cap",
      color: "yellow",
      route: "/gerenciar-cursos",
    },
    {
      name: "Entidades",
      icon: "pi pi-users",
      color: "green",
      route: "gerenciar-entidades",
    },
    {
      name: "Notificações",
      icon: "pi pi-bell",
      color: "blue",
      route: "gerenciar-notificacoes",
    },
    {
      name: "Listar Pessoas",
      icon: "pi pi-search",
      color: "red",
      route: "/listar-pessoas",
    },
  ];

  if (isAdmin) {
    return (
      <div>
        <Navbar isHome={true} />
        <div className="grid flex justify-content-center gap-3 mt-4 mx-0">
          {adminCards.map((card, i) => (
            <div key={i} className="col-12 sm:col-6 md:col-4 lg:col-3">
              <a href={card.route}>
                <div className="card-admin">
                  <i
                    className={`pi ${card.icon}`}
                    style={{
                      color: card.color,
                      fontSize: "12rem",
                    }}
                  ></i>
                  <p style={{ color: card.color }}>{card.name}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <BottomBar disabled={3} />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar isHome={true}></Navbar>
        <div className="grid w-full align-items-center justify-content-center m-0 p-0">
          <CarouselHome></CarouselHome>
        </div>
        <div className="grid gap-4 justify-content-center align-items-center mt-3 mx-0">
          {userCards.map((card, index) => (
            <HomeButton
              key={index}
              text={card.text}
              icon={card.icon}
              inverted={card.inverted}
              backgroundImage={card.backgroundImage}
              link={card.link}
            ></HomeButton>
          ))}
        </div>
        <BottomBar disabled={3}></BottomBar>
      </div>
    );
  }
}
