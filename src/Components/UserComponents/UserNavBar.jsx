import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";

const UserNavBar = () => {
  const { byEmail, isAdmin, setAdmin, updateEmail, signedIn, updateSignIn, setUserName, username } = useContext(UserEmailContext);
  const nav = useNavigate()

  const InOutHandler = () => {
    if(byEmail.length <= 0 && signedIn === false){
      nav('/login')
    }
    
    else{
      updateEmail(false)
      setAdmin(null)
      updateEmail('')
      updateSignIn(false)
      setUserName('')
      nav('/')
    }
  }

  return (
    <div className="top-0 relative">
      <nav className="space-y-5 bg-gradient-to-l from-blue-500 to-slate-800 text-white py-3 px-[1rem]">
        <p className="text-xl">Welcome, to the SABA {signedIn ? username : ``}</p>
        <ul className="text-sm">
          <div className="flex justify-between">
            <div className="flex space-x-5">
              <Link to="/user">
                <p className="hover:underline hover:cursor-pointer">
                  Search Flights
                </p>
              </Link>
              {signedIn ? (
                <Link to="/user/showbooking">
                  <p className="hover:underline hover:cursor-pointer">
                    List All Bookings
                  </p>
                </Link>
              ) : (
                <></>
              )}
              {isAdmin === true && signedIn ? (
                <>
                  <Link to="/admin/addflight">
                    <p className="hover:underline hover:cursor-pointer">
                      Add Flights
                    </p>
                  </Link>
                  <Link to="/admin/flightlist">
                    <p className="hover:underline hover:cursor-pointer">
                      List Flights
                    </p>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
            {/* <div className="hover:underline hover:cursor-pointer" onClick={logoutHandler}>
              <p>Logout</p>
            </div> */}
            <div className="text-black">
              <button onClick={InOutHandler} className="mx-[2rem] bg-slate-100 px-5 py-1 rounded-md hover:bg-black hover:text-white transition">{signedIn ? `Log out` : `Login`}</button>
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavBar;
