import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Components/LoginPage'
import SignUpPage from '../Components/SignUpPage';
import UserDashboad from '../Components/UserComponents/UserDashboard'
import BookingForm from '../Components/UserComponents/BookingForm';
import ShowUserBooking from '../Components/UserComponents/ShowUserBooking';
import UserNavBar from '../Components/UserComponents/UserNavBar';
import HomePage from '../Components/HomePage';

const RoutesComp = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/user' element={<UserDashboad />} />
      <Route path='/user/addBooking/:fid' element={<BookingForm />} />
      <Route path='/user/showbooking' element={<ShowUserBooking />} />
    </Routes>
  )
}

export default RoutesComp
