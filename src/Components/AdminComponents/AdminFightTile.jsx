import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";
import axios from "axios";

const AdminFightTile = ({ flight }) => {
  const nav = useNavigate();
  const { byEmail, isAdmin, signedIn } = useContext(UserEmailContext);

  const updateHandler = () => {
    nav(`/admin/editflight/${flight.id}`);
  };

  const deleteHandler = () => {
    axios
      .delete(
        `http://localhost:5000/flight-service/api/admin/deleteMapping/${flight.id}`
      )
      .then(() => {
        nav("/admin");
      })
      .catch((err) => {});
  };

  return (
    <div className="bg-gray-100 shadow-lg my-3 p-3 rounded-md hover:scale-[102%] mx-5 px-[1rem]">
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
          <div className="space-x-6">
            {signedIn ? (
              <>
                <button
                  onClick={deleteHandler}
                  className="bg-red-600 text-white py-2 p-5 rounded-md hover:bg-red-900 hover:text-white"
                >
                  Delete Flight
                </button>
                <button
                  onClick={updateHandler}
                  className="bg-green-600 text-white py-2 p-5 rounded-md hover:bg-green-900 hover:text-white"
                >
                  Update Flight
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFightTile;
