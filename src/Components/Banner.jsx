import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image1 from "../Images/Image2.jpeg";
import Image2 from "../Images/New-Flight.jpg";
import Image3 from "../Images/Flight-Image.avif";

const Banner = () => {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    <img src={Image3} />
                </div>
                <div>
                    <img className='h-[5rem]' src={Image2} />
                </div>
                <div>
                    <img className='h-[5rem]' src={Image1} />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner
