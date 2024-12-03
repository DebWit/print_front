"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import "./styleCarousel.css";

// Função para obter as imagens com base no tamanho da tela
function getImages(isPhone: boolean) {
    const brute_images = [
        { src: "./banner-maua-transporte.jpg", alt: "teste", link: "https://maua.br/graduacao/eventos/transporte-circular" },
        { src: "./banner-maua.jpg", alt: "teste", link: "https://maua.br/vestibular" },
        { src: "./banner-maua-posgraduacao.jpg", alt: "teste", link: "https://maua.br/pos-graduacao" },
    ];

    const phone_images = [
        { src: "./phone-banner-maua-transporte.jpg", alt: "teste", link: "https://maua.br/graduacao/eventos/transporte-circular" },
        { src: "./phone-banner-maua.jpg", alt: "teste", link: "https://maua.br/vestibular" },
        { src: "./phone-banner-maua-posgraduacao.jpg", alt: "teste", link: "https://maua.br/pos-graduacao" },
    ];

    return isPhone ? phone_images : brute_images;
}

function CarouselHome() {
    const [images, setImages] = useState<{ src: string; alt: string; link: string }[]>([]);

    useEffect(() => {
        const updateImages = () => {
            const isPhone = window.innerWidth <= 768;
            const selectedImages = getImages(isPhone);
            setImages(selectedImages);
        };

        updateImages();
        window.addEventListener("resize", updateImages);

        return () => window.removeEventListener("resize", updateImages);
    }, []);

    const imageCarouselTemplate = (image: { src: string; alt: string; link: string }) => {
        return (
            <a href={image.link}>
                <img className="Img_Carousel w-full" src={image.src} alt={image.alt} />
            </a>
        );
    };

    return (
        <Carousel
            value={images}
            numVisible={1}
            autoplayInterval={5000}
            numScroll={1}
            showIndicators={false}
            showNavigators={false}
            className="custom-carousel md:col-12 p-0"
            circular
            itemTemplate={imageCarouselTemplate}
        />
    );
}

export default CarouselHome;
