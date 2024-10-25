import React from "react";
import { Carousel } from 'react-responsive-carousel';
import Grid from '@mui/material/Grid2';
import Image1 from "../Images/Image2.jpeg";
import Image2 from "../Images/New-Flight.jpg";
import Image3 from "../Images/Flight-Image.avif";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Coupon2 from "./Coupons/Coupon2";
import Coupon1 from "./Coupons/Coupon1";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const HomePage = () => {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col my-1">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-md -mb-3">
        <h1 className="text-4xl font-bold mb-2">SPARTAN AIRFLIGHT BOOKING SYSTEM</h1>
        <p className="text-lg">Welcome TO OUR AIRFLIGHT BOOKING SYSTEM</p>
      </div>

      {/* Carousel Section */}
      <div className="py-4">
        <Grid container justifyContent="center">
          <Grid>
            <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              interval={5000}
              
            >
              <div style={{ height: '400px', overflow: 'hidden' }}>
                <img className="rounded-md shadow-md" loading="lazy" src={Image1} alt="Flight Image 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ height: '400px', overflow: 'hidden' }}>
                <img className="rounded-md shadow-md" loading="lazy" src={Image2} alt="Flight Image 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ height: '400px', overflow: 'hidden' }}>
                <img className="rounded-md shadow-md" loading="lazy" src={Image3} alt="Flight Image 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Carousel>
          </Grid>
        </Grid>
      </div>

      {/* Coupon Offers Section */}
      <div className="bg-gray-50 shadow-lg my-2 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400">
        <div className="flex items-center text-center justify-center space-x-4 text-white">
          <LocalOfferIcon fontSize="large" />
          <h2 className="text-3xl font-semibold text-center ">Special Coupon Offers</h2>
        </div>
        {/* <Coupon2 /> */}
        {/* <Coupon1 />
         */}
        <Carousel
          autoPlay
          infiniteLoop
          showIndicators={false}
          showStatus={false}
          axis="horizontal"
          interval={8000}

        >
          <div>
            <Coupon1 />
          </div>
          <div>
            <Coupon2 />
          </div>
        </Carousel>
      </div>
  
      <div className="py-16 bg-gradient-to-r from-purple-600 to-blue-700 rounded-md my-2">
        <Grid container spacing={4} className="max-w-6xl mx-auto">
          <Grid item xs={12} md={6} className="flex flex-col justify-center">
            <p className="text-white text-center md:text-left text-lg ">
              Spartan Airlines is India's premier brand for online flight ticket booking, offering a user-friendly platform for easy airline reservations. With over 36 million satisfied customers and access to 3500+ airlines, Spartan Airlines ensures convenient travel for all. As a leader in online booking for 17 years, we serve thousands of destinations across India and beyond, making air travel seamless and accessible for everyone.
            </p>
          </Grid>
        </Grid>
      </div>


      <div className="relative bg-purple-800 text-white py-8">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-800 to-transparent -bottom-1 z-20" />
        <div className="relative z-30 max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Spartan Airlines. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
