import React, { useEffect } from "react";
import Image1 from "../Images/Image2.jpeg";

const HomePage = () => {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col my-1">
      <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-t from-blue-500 to-slate-800 text-white">
        <h1 className="text-4xl font-bold mb-2">SPARTAN AIRFLIGHT BOOKING SYSTEM</h1>
        <p className="text-lg">Welcome TO OUR AIRFLIGHT BOOKING SYSTEM</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white">
        <div className="about-me-text w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Why Spartan</h2>
          <p className="text-gray-700">
          Spartan Airlines is India's premier brand for online flight ticket booking, offering a user-friendly platform for easy airline reservations. With over 36 million satisfied customers and access to 3500+ airlines, Spartan Airlines ensures convenient travel for all. As a leader in online booking for 17 years, we serve thousands of destinations across India and beyond, making air travel seamless and accessible for everyone.
          </p>
        </div>
        <img 
          src={Image1} 
          alt="Spartan Buses" 
          className="w-full md:w-1/2 rounded-lg shadow-lg" 
        />
      </div>
    </main>
  );
};

export default HomePage;
