import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const UserNavBar = () => {
  const { byEmail, isAdmin, setAdmin, updateEmail, signedIn, updateSignIn, setUserName, username } = useContext(UserEmailContext);
  const nav = useNavigate();

  const InOutHandler = () => {
    if(byEmail.length <= 0 && signedIn === false){
      nav('/login');
    }
    else{
      updateEmail(false);
      setAdmin(null);
      updateEmail('');
      updateSignIn(false);
      setUserName('');
      nav('/');
    }
  }

  return (
    <div className="top-0 fixed w-full z-10 bg-gradient-to-l from-blue-600 to-purple-700 shadow-lg">
      <nav className="flex flex-col xl:flex-row items-center justify-between text-white py-3 px-6">
        <p className="text-xl font-bold mb-2 xl:mb-0">Welcome, {signedIn ? username : `to the SABA`}</p>
        <ul className="flex space-x-5 text-sm font-medium">
          <Link to="/user" className="hover:underline">
            Search Flights
          </Link>
          {signedIn && (
            <Link to="/user/showbooking" className="hover:underline">
              List All Bookings
            </Link>
          )}
          {isAdmin && signedIn && (
            <>
              <Link to="/admin/addflight" className="hover:underline">
                Add Flights
              </Link>
              <Link to="/admin/flightlist" className="hover:underline">
                List Flights
              </Link>
            </>
          )}
        </ul>
        <button
          onClick={InOutHandler}
          className="mt-2 xl:mt-0 bg-white text-blue-600 px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
        >
          {signedIn ? `Log out` : `Login`} {signedIn ? <LogoutIcon  /> : <LoginIcon  />}
        </button>
      </nav>
    </div>
  );
};

export default UserNavBar;