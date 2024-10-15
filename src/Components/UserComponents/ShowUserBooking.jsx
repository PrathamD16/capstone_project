import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserEmailContext } from "../../Context/CredContext";
import BookingTile from "./BookingTile";
const ShowUserBooking = () => {
  const [count, setCount] = useState(0);
  const [bookingList, setBookingList] = useState([]);
  const { byEmail } = useContext(UserEmailContext);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:4000/passenger-service/api/getBookingByEmail?email=${byEmail}`
      );
      setBookingList(res.data);
    };
    getData();
    console.log(bookingList.length)
  }, [count]);

  return (
    <div className="space-y-5">
      {bookingList.length > 0 ? (
        bookingList.map((book, _i) => {
          return (
            <div key={_i} className="px-5">
              <BookingTile trigger={setCount} book={book} />
            </div>
          );
        })
      ) : (
        <div className="flex items-center h-screen justify-center">
          <p className="text-3xl">No Booking Records</p>
        </div>
      )}
    </div>
  );
};

export default ShowUserBooking;
