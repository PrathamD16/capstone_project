import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFlights = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [date, setDate] = useState(null); // Use null for initial unselected date
  const [time, setTime] = useState(null); // Use null for initial unselected time
  const [destination, setDestination] = useState("");
  const [source, setSource] = useState("");
  const [booked, setBookedSeats] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true)
  const [minDate, setMinDate] = useState()

  const nav = useNavigate();

  const addFlightHandler = (e) => {
    e.preventDefault();

    const newPlane = {
      name,
      cost,
      total_seats: totalSeats,
      dept_time: date + "T" + time + ":00", // Combine date and time efficiently
      source,
      destination,
      booked_seats: booked,
    };

    axios
      .post(
        `http://localhost:5000/flight-service/api/admin/addFlights`,
        newPlane
      )
      .then((x) => {
        
        nav("/admin");
      })
      .catch((err) => {
        
      });

    // Handle sending the data to your backend here (e.g., using axios)
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
    if(booked > -1 && booked < totalSeats && totalSeats > 0 && cost > -1 && name != '' && destination != '' && source != '' && date != null && time != null){
      setBtnDisable(false)
    }
    else{
      setBtnDisable(true)
    }
  }, [booked, totalSeats, cost, date, time, source, destination, name])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Flight</h2>
        <form onSubmit={addFlightHandler} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter flight name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            placeholder="Enter Cost of flight per seat"
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            placeholder="Enter total seats available in plane"
            onChange={(e) => setTotalSeats(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            placeholder="Enter number booked seats"
            onChange={(e) => setBookedSeats(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="date"
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="time"
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter source"
            type="text"
            onChange={(e) => setSource(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Destination"
            type="text"
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <button
            disabled={btnDisable}
            type="submit"
            // className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            className={`w-full text-white py-2 rounded-md ${btnDisable ? `bg-blue-300` : `bg-blue-600 hover:bg-blue-700 transition duration-200`}`}
          >
            Add Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlights;
