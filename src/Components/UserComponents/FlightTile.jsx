import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";

const FlightTile = ({ flight, titleColor }) => {
  const nav = useNavigate();

  const [ind, setInd] = useState(0)


  useEffect(() => {
    setInd(getRandomBetween0And3(0, 3))
  }, [])

  const colorList = [
    'bg-blue',
    'bg-red',
    `bg-green`,
    `bg-indigo`
  ]
  
  const gradientList = [
    "blue-100",
    "red-100",
    "green-100",
    "indigo-100"
  ]
  
  
  function getRandomBetween0And3() {
    return Math.floor(Math.random() * 4);
  }

  const { byEmail, isAdmin, signedIn } = useContext(UserEmailContext);

  const bookHandler = () => {
    if (byEmail.length > 0) {
      nav(`/user/addBooking/${flight.id}`);
    } else {
      nav("/login");
    }
  };

  const updateHandler = () => {
    nav(`/admin/editflight/${flight.id}`)
  }

  let avail_seats = flight.total_seats - flight.booked_seats

  return (
    <div className={`bg-gray-100 shadow-lg my-3 p-3 rounded-md x-5 px-[1rem] hover:bg-gradient-to-tl from-gray-100 to-${gradientList[ind]} transition-all duration-500 ease-in-out transform hover:scale-[1.02]`}>
      <div className={`flex justify-center ${colorList[ind]}-800`}>
        <h3 className="text-md font-semibold text-white">
          Flight Name: <span className="font-mono text-xl"> {flight.name}</span>
        </h3>
      </div>

      <div className="flex justify-between items-center mx-[2rem]">
        {/* LHS */}
        <div>
          <p>
            <span>
              Date:{" "}
              <span className="font-semibold">
                {flight.dept_time.substring(0, 10)}
              </span>
            </span>
            <span className="text-xs"> (YYYY-MM-DD)</span>
          </p>
          <p>
            <span>
              Time:{" "}
              <span className="font-semibold">
                {flight.dept_time.substring(11, 16)}
              </span>
            </span>
            <span className="text-xs"> HRS</span>
          </p>
        </div>
        {/* RHS */}
        <div className="space-y-3 px-5">
          <p>
            From:{" "}
            <span className="font-semibold">{flight.source.toUpperCase()}</span>
          </p>
          <p>
            To:{" "}
            <span className="font-semibold">
              {flight.destination.toUpperCase()}
            </span>
          </p>
          <p>
            Cost: <span className="font-semibold">{flight.cost}</span>
          </p>
          <p>Seats available: {flight.total_seats - flight.booked_seats}</p>
          <button
            disabled={avail_seats <= 0}
            onClick={bookHandler}
            className={`${colorList[ind]}-600 text-white py-2 px-5 rounded-md
              hover:${colorList[ind]}-900 hover:text-white`}
          >
            {signedIn === true ? `Book Ticket` : `Login/Signup`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightTile;
