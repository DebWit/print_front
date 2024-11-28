import { Button } from "primereact/button";
import Navbar from "../components/Navbar";
import HomeButton from "../components/HomeButton";
import BottomBar from "../components/BottomBar";
import CarouselHome from "../components/Carousel";
        
        
import "./../style.css";
import "./style.css";

export default function Homepage(){

    const isAdmin = true;

    let dados = [
        {
            text: "Cursos",
            icon: "pi pi-graduation-cap",
            inverted: false,
            backgroundImage: "/home-1.png",
            link: "/cursos"
        },
        {
            text: "content",
            icon: "pi pi-arrow-left",
            inverted: true,
            backgroundImage: "/home-inverted-1.png",
            link: "/content"
        },
        {
            text: "eventos",
            icon: "pi pi-bars",
            inverted: false,
            backgroundImage: "/home-1.png",
            link: "/eventos"
        },
        {
            text: "content",
            icon: "pi pi-book",
            inverted: true,
            backgroundImage: "/home-inverted-1.png",
            link: "/content"
        },
        {
            text: "evento",
            icon: "pi pi-bars",
            inverted: false,
            backgroundImage: "/home-1.png",
            link: "/evento"
        },
    ]

    let cards = [
        {
            "name": "Eventos",
            "icon": "pi pi-calendar",
            "color": "cyan",
            "route": "/gerenciar-eventos"
        },
        {
            "name": "Cursos",
            "icon": "pi pi-graduation-cap",
            "color": "yellow",
            "route": "/gerenciar-cursos"
        },
        {
            "name": "Entidades",
            "icon": "pi pi-users",
            "color": "green",
            "route": "gerenciar-entidades"
        },
        {
            "name": "Notificações",
            "icon": "pi pi-bell",
            "color": "blue",
            "route": "gerenciar-notificacoes"
        },
        {
            "name": "Buscar Pessoa",
            "icon": "pi pi-search",
            "color": "red",
            "route": "/buscar-pessoa"
        }
    ]

    if (isAdmin) {
        return (
            <div>
                <Navbar isHome={true} />
                <div className="grid flex justify-content-center gap-3 mt-4">
                    {cards
                        .map((object, i) => (
                            <div key={i} className="col-12 sm:col-6 md:col-4 lg:col-3">
                                <a href={object.route}>
                                <div className="card-admin">
                                <i
                                    className={`pi ${object.icon}`}
                                    style={{
                                        color: object.color, 
                                        fontSize: '12rem',
                                    }}
                                >
                                </i>
                                    <p style={{color: object.color}}>{object.name}</p>
                                </div>
                                </a>
                            </div>
                        ))}
                </div>
                <BottomBar disabled={3} />
            </div>
        );
    }
    else{
        return (
            <div>
                <Navbar isHome={true}></Navbar>
                <div className="grid w-full align-items-center justify-content-center m-0 p-0">
                    <CarouselHome></CarouselHome>
                </div>
                <div className="grid gap-4 justify-content-center align-items-center mt-3 mx-0">
                    {
                        dados.map((dado, index) => {
                            return (
                                <HomeButton key={index} text={dado.text} icon={dado.icon} inverted={dado.inverted} backgroundImage={dado.backgroundImage} link={dado.link}></HomeButton>
                            )
                    }, dados)}
                </div>
                <BottomBar disabled={3}></BottomBar>
            </div>
        )
    }
}