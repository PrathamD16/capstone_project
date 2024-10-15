import React, { useEffect } from 'react'
import Image1 from '../Images/Image2.jpeg'

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img 
          src={Image1} 
          alt="Landing" 
          className="mb-6 rounded-lg shadow-lg h-[40rem] w-auto" 
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to FlightFinder
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your gateway to affordable and convenient travel. Discover amazing destinations and book your next adventure with ease.
        </p>
      </div>
    </div>
  )
}

export default HomePage
