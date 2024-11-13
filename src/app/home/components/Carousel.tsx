"use client";

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';


function brute_images() {
    const brute_images =  [
        {src:"./login-background.png"},
        {src:"./background-splash.png"}
    ];
    return Promise.resolve(brute_images);
}


function CarouselHome() {
    const [images, setImages] = useState<{ src: string }[]>([]);

    useEffect(() => {
        brute_images().then((data) => setImages(data));
    }, []);

    const imageCarouselTemplate = (image: { src: string }) => {
        return (
            <>
            <img className='w-full' src={image.src} style={{aspectRatio: 21/9}} />
            </>
        );
    };

    return (
        <>
            <Carousel value={images} numVisible={1} autoplayInterval={3000} numScroll={1} showIndicators className="custom-carousel w-full" circular itemTemplate={imageCarouselTemplate} />
        </>
    )
}

export default CarouselHome;