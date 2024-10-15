import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFlight = () => {
  const { fid } = useParams();

  const nav = useNavigate()

  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [date, setDate] = useState(null); // Use null for initial unselected date
  const [time, setTime] = useState(null); // Use null for initial unselected time
  const [destination, setDestination] = useState("");
  const [source, setSource] = useState("");
  const [booked, setBookedSeats] = useState(0);

  useEffect(() => {
    const getSingleFlight = async () => {
      const res = await axios.get(
        `http://localhost:5000/flight-service/api/search/getsingleflight/${parseInt(
          fid
        )}`
      );
      setName(res.data.name);
      setCost(res.data.cost);
      setTotalSeats(res.data.total_seats);
      setBookedSeats(res.data.booked_seats);
      setSource(res.data.source);
      setDestination(res.data.destination);
      setDate(res.data.dept_time.substring(0, 10));
      setTime(res.data.dept_time.substring(11, 16));
    };
    getSingleFlight();
  }, []);

  const updateFlightHandler = (e) => {
    e.preventDefault()
    const updatePlane = {
      name,cost,
      booked_seats: booked,
      total_seats: totalSeats,
      dept_time:date + "T" + time + ":00",
      source,
      destination
    }


    axios.patch(`http://localhost:5000/flight-service/api/admin/updateFlight/${parseInt(fid)}`, updatePlane)
    .then(data => {
      console.log(data)
      nav("/admin")
    })
    .catch(err => {
      console.log(err)
    })

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Flight</h2>
        <form onSubmit={updateFlightHandler} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter flight name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            value={cost}
            placeholder="Enter Cost of flight per seat"
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            value={totalSeats}
            placeholder="Enter total seats available in plane"
            onChange={(e) => setTotalSeats(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            value={booked}
            placeholder="Enter number booked seats"
            onChange={(e) => setBookedSeats(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            value={time}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="time"
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            value={source}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter source"
            type="text"
            onChange={(e) => setSource(e.target.value)}
            required
          />
          <input
            value={destination}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Destination"
            type="text"
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlight;
