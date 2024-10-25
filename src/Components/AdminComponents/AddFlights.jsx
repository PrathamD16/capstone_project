import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const AddFlights = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [date, setDate] = useState(null); // Use empty string for initial unselected date
  const [time, setTime] = useState(null); // Use empty string for initial unselected time
  const [destination, setDestination] = useState("");
  const [source, setSource] = useState("");
  const [booked, setBookedSeats] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [minDate, setMinDate] = useState("");

  const nav = useNavigate();

  const addFlightHandler = (e) => {
    e.preventDefault();

    const newPlane = {
      name,
      cost: Number(cost),
      total_seats: Number(totalSeats),
      dept_time: date + "T" + time + ":00", // Combine date and time efficiently
      source,
      destination,
      booked_seats: Number(booked),
    };

    axios
      .post(`http://localhost:5000/flight-service/api/admin/addFlights`, newPlane)
      .then(() => {
        nav("/admin");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);

    const isFormValid =
      name.trim() !== "" &&
      source.trim() !== "" &&
      destination.trim() !== "" &&
      date !== "" &&
      time !== "" &&
      !isNaN(cost) && Number(cost) >= 5000 &&
      !isNaN(totalSeats) && Number(totalSeats) > 0 &&
      !isNaN(booked) && Number(booked) >= 0 &&
      Number(booked) <= Number(totalSeats);

    setBtnDisable(!isFormValid);
  }, [name, source, destination, date, time, cost, totalSeats, booked]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Add Flight Form
        </h2>
        <form onSubmit={addFlightHandler} className="space-y-4">
          <TextField
            className="w-full"
            label="Enter flight name"
            type="text"
            color="primary"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            type="number"
            color="primary"
            label="Enter Cost of flight per seat"
            variant="outlined"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            type="number"
            color="primary"
            label="Enter total seats available in plane"
            variant="outlined"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            type="number"
            color="primary"
            label="Enter number booked seats"
            variant="outlined"
            value={booked}
            onChange={(e) => setBookedSeats(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            type="date"
            color="primary"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            inputProps={{ min: minDate }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            type="time"
            color="primary"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            label="Enter source"
            type="text"
            color="primary"
            variant="outlined"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
          <TextField
            className="w-full"
            label="Enter Destination"
            type="text"
            color="primary"
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <button
            disabled={btnDisable}
            type="submit"
            className={`w-full text-white py-2 rounded-md ${btnDisable ? `bg-purple-300` : `bg-purple-600 hover:bg-purple-700 transition duration-200`}`}
          >
            Add Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlights;
