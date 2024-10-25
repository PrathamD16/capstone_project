import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";
import BookIcon from '@mui/icons-material/Book';
import LoginIcon from '@mui/icons-material/Login';

const FlightTile = ({ flight }) => {
  const nav = useNavigate();

  const [ind, setInd] = useState(0)
  // const currDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
  // const currDate = new Date()

  const flightDate = new Date(flight.dept_time)

  const [flDate, setFlDate] = useState("")
  const [flTime, setFlTime] = useState("")
  const [btnDisable, setBtnDisable] = useState(false)

  useEffect(() => {
    setInd(getRandomBetween0And3(0, 3))
    // console.log(`Flight Date: ${flDate}`)
    // console.log(`Flight Time: ${flTime}`)
  }, [])

  const dateException = (ipdate) => {
    const currDate = new Date()
    const inputDate = new Date(ipdate)
    return currDate.getFullYear() == inputDate.getFullYear() && currDate.getMonth() == inputDate.getMonth() && currDate.getDate() == inputDate.getDate()
  }

  const timeException = (ipdate) => {
    const currDate = new Date()
    const inputDate = new Date(ipdate)
    console.log("HRS",inputDate.getHours(), " MIN",inputDate.getMinutes())
    return currDate.getHours() > inputDate.getHours() || currDate.getMinutes() > inputDate.getMinutes()
  }

  const timeException2 = (ipdate) => {
    const currDate = new Date()
    const inputDate = new Date(ipdate)
    console.log("HRS",inputDate.getHours(), " MIN",inputDate.getMinutes())
    return currDate.getHours() > inputDate.getHours() || (currDate.getMinutes()-5 < 0 ? 60-5 : currDate.getMinutes()-5) > inputDate.getMinutes()
  }

  console.log("Date: ", dateException(flight.dept_time))
  console.log("Time: ", timeException(flight.dept_time))

  const colorListTitle = [
    `bg-blue-800`,
    `bg-red-800`,
    `bg-green-800`,
    `bg-yellow-800`
  ]

  const gradientList = [
    `to-blue-200`,
    `to-red-200`,
    `to-green-200`,
    `to-yellow-200`
  ]

  const btnColors = [
    `bg-blue-600`,
    `bg-red-600`,
    `bg-green-600`,
    `bg-yellow-600`
  ]

  const btnColorsHover = [
    `bg-blue-900`,
    `bg-red-900`,
    `bg-green-900`,
    `bg-yellow-950`
  ]




  function getRandomBetween0And3() {
    return Math.floor(Math.random() * 4);
  }

  const { byEmail, signedIn } = useContext(UserEmailContext);

  const bookHandler = () => {
    if (byEmail.length > 0) {
      nav(`/user/addBooking/${flight.id}`);
    } else {
      nav("/login");
    }
  };

  let avail_seats = flight.total_seats - flight.booked_seats

  return (
    <div className={` bg-gray-200 shadow-lg p-3 rounded-2xl x-5 px-[1rem] hover:bg-gradient-to-t from-purple-200 ${gradientList[ind]} transition-transform duration-500 ease-in-out transform hover:scale-[95%]  py-8 scale-[90%]`}>
      <div className={`flex justify-center ${colorListTitle[ind]} rounded-2xl`}>
        <h3 className={`text-md font-semibold text-white`}>
          Flight Name:<span className="font-mono text-xl">{'\t' + flight.name}</span>
        </h3>
      </div>

      <div className="flex justify-between items-center mx-[2rem]">
        {/* LHS */}
        <div>
          <p>
            <span className="text-xl">
              Date:{" "}
              <span className="font-semibold">
                {flight.dept_time.substring(0, 10)}
              </span>
            </span>
            <span className="text-xs"> (YYYY-MM-DD)</span>
          </p>
          <p>
            <span className="text-xl">
              Time:{" "}
              <span className="font-semibold">
                {flight.dept_time.substring(11, 16)}
              </span>
            </span>
            <span className="text-xs"> HRS</span>
          </p>
        </div>
        {/* RHS */}
        <div className="space-y-1 my-3 px-5 text-xl">
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
          <p>Seats available: <span className="font-semibold">{flight.total_seats - flight.booked_seats}</span></p>

        </div>
        <div className="items-center">
          <button
            // disabled={avail_seats <= 0 || dateException(flight.dept_time) && timeException(flight.dept_time)}
            onClick={bookHandler}
            // className={`${(dateException(flight.dept_time) && timeException(flight.dept_time)) === true ? `bg-gray-500` : btnColors[ind]} text-white py-2 px-5 rounded-md
            //   hover:${dateException(flight.dept_time) && timeException(flight.dept_time) === true  ? `` : btnColorsHover[ind]} hover:text-white`}
            className={`${btnColors[ind]} text-white py-2 px-5 rounded-md hover:${btnColorsHover[ind]} hover:text-white`}
          >
            {signedIn === true ? `Book Tickets` : `Login`} {signedIn === true ? <BookIcon /> : <LoginIcon />}
          </button>
        </div>
      </div>
      {/* <div className="px-[1rem]">
        <p className="font-[italics] text-red-700">{dateException(flight.dept_time) && timeException(flight.dept_time) ? `flight departed` : ``}</p>
      </div> */}
    </div>
  );
};

export default FlightTile;
