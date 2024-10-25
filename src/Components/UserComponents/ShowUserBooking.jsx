import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserEmailContext } from "../../Context/CredContext";
import BookingTile from "./BookingTile";
import CircularProgress from '@mui/material/CircularProgress';

const ShowUserBooking = () => {
  const [bookingList, setBookingList] = useState([]);
  const { byEmail } = useContext(UserEmailContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `http://localhost:4000/passenger-service/api/getBookingByEmail?email=${byEmail}`
        );
        setBookingList(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch booking data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (byEmail) {
      getData();
    }
  }, [byEmail]);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:4000/passenger-service/api/deleteBooking/${bookingId}`);
      setBookingList(prevList => prevList.filter(booking => booking.bookingId !== bookingId));
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to delete booking. Please try again later.");
    }
  };

  return (
    <div className="space-y-5">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress color="inherit" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-3xl">{error}</p>
        </div>
      ) : (
        <>
          {bookingList.length > 0 ? (
            bookingList.map((book, _i) => (
              <div key={_i} className="px-5">
                <BookingTile book={book} onDelete={handleDelete} />
              </div>
            ))
          ) : (
            <div className="flex items-center h-screen justify-center">
              <p className="text-3xl">No Booking Records</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShowUserBooking;
