import React from 'react'
import AddFlights from '../Components/AdminComponents/AddFlights'
import { Route, Routes } from 'react-router-dom'
import UpdateFlight from '../Components/AdminComponents/UpdateFlight'
import UserDashboard from '../Components/UserComponents/UserDashboard'
import FlightList from '../Components/AdminComponents/FlightList'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='/admin' element={<UserDashboard />} />
      <Route path='/admin/addflight' element={<AddFlights />} />
      <Route path='/admin/editflight/:fid' element={<UpdateFlight />}/>
      <Route path="/admin/flightlist" element={<FlightList />}/>
    </Routes>
  )
}

export default AdminRoutes
