import { Button } from "primereact/button";
import Navbar from "../components/Navbar";
import HomeButton from "../components/HomeButton";
        
        
import "./../style.css";
import "./style.css";

export default function Homepage(){

    //dados mockados
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
            text: "evento",
            icon: "pi pi-bars",
            inverted: false,
            backgroundImage: "/home-1.png",
            link: "/evento"
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
    
    
    return (
        <div>
            <Navbar isHome={true}></Navbar>
            <div className="grid gap-4 justify-content-center align-items-center mt-3">
                {
                    dados.map((dado, index) => {
                        return (
                            <HomeButton key={index} text={dado.text} icon={dado.icon} inverted={dado.inverted} backgroundImage={dado.backgroundImage} link={dado.link}></HomeButton>
                        )
                }, dados)}
            </div>
        </div>
    )
}