import NavbarHome from "../components/NavbarHome";
import CarouselHome from "../components/Carousel";
import ImageBanner from "../components/ImageBanner";
        
import "./../style.css";
import "./style.css";

export default function Homepage(){
    return (
        <div className="m-0 p-0" style={{margin: 0}}>
            <NavbarHome></NavbarHome>
            <CarouselHome></CarouselHome>
        </div>
    )
}