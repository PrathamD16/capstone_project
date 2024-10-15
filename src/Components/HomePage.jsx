import React from 'react'
import Image1 from '../Images/Image2.jpeg'
const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mb-auto">
    <div className="text-center">
      <img src={Image1} alt="Flight Image" className="mb-6 rounded shadow-lg h-[40rem] w-auto" />
      <p className="text-xl font-semibold text-gray-800">
        Welcome to FlightFinder, your gateway to affordable and convenient travel. Discover the world with ease!
      </p>
    </div>
  </div>
  )
}

export default HomePage
