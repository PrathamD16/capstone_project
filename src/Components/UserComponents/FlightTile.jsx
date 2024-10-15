import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";

const FlightTile = ({ flight }) => {
  const nav = useNavigate();

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

  return (
    <div className="bg-gray-100 shadow-lg my-3 p-3 rounded-md x-5 px-[1rem]">
      <div className="flex justify-center">
        <h3 className="text-md font-semibold">
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
            onClick={bookHandler}
            className="bg-blue-600 text-white py-2 px-5 rounded-md
              hover:bg-blue-900 hover:text-white"
          >
            {signedIn > 0 ? `Book Ticket` : `Login/Signup`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightTile;
