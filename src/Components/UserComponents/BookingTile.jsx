import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingTile = ({ book, trigger }) => {
  const nav = useNavigate();

  const deleteHandler = () => {
    axios
      .delete(
        `http://localhost:4000/passenger-service/api/deleteBooking/${book.bookingId}`
      )
      .then(() => {
        trigger((pre) => pre + 1);
        console.log(`Deleted the data`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-around items-center my-[1rem] bg-slate-200 rounded-lg shadow-lg py-3">
      {/* Passenger details */}
      <div>
        <p>
          BookingID: <span className="font-semibold">{book.bookingId}</span>
        </p>
        <p>
          Passenger-Name:{" "}
          <span className="font-semibold">{book.cname.toUpperCase()}</span>
        </p>
        <p>
          Contact: <span className="font-semibold">{book.contact}</span>
        </p>
        <p>
          Gender:{" "}
          <span className="font-semibold">{book.gender}</span>
        </p>
      </div>

      {/* Flight Details */}
      <div>
        <p>
          FLIGHT-NO: <span className="font-semibold">{book.flightId}</span>
        </p>
        <p>NAME: <span className='font-semibold'>{book.name}</span></p>
        <p>From: <span className='font-semibold'>{book.source.toUpperCase()}</span></p>
        <p>To: <span className="font-semibold">{book.destination.toUpperCase()}</span></p>
        <p>Date Of Departure: <span className="font-semibold">{book.dept_time.substring(0, 10)}</span><span className="text-xs"> (YYYY-MM-DD)</span></p>
        <p>Departure Time: <span className="font-semibold">{book.dept_time.substring(11, 19)}</span><span className="text-xs"> (HRS)</span></p>
        <p>Cost: <span className="font-semibold">Rs. {book.cost}</span></p>
        <p>Status: <span className={`font-semibold ${book.status === 'confirmed' ? `text-green-700` : `text-red-700`}`}>{book.status}</span></p>
      </div>

      {/* Functionality */}
      <div>
        <button
          onClick={deleteHandler}
          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700"
        >
          Delete Booking
        </button>
      </div>
    </div>
  );
};

export default BookingTile;
