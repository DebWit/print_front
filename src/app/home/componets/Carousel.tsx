import React, { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';

function CarouselHome() {

    return (
        <Carousel  numVisible={1} numScroll={1} className="custom-carousel" circular style={{width: '1000px'}} />
    )
}