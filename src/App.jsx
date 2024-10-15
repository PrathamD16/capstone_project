import React from 'react'
import RoutesComp from './Routes/RoutesComp'
import AdminRoutes from './Routes/AdminRoutes'
import UserEmailContext from './Context/CredContext'
import UserNavBar from './Components/UserComponents/UserNavBar'

const App = () => {
  return (
    <div className=''>
      <UserEmailContext>
        <UserNavBar />
        <RoutesComp />
        <AdminRoutes />
      </UserEmailContext>
    </div>
  )
}

export default App
