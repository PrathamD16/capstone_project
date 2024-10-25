import React from 'react'
import RoutesComp from './Routes/RoutesComp'
import AdminRoutes from './Routes/AdminRoutes'
import UserEmailContext from './Context/CredContext'
import UserNavBar from './Components/UserComponents/UserNavBar'

const App = () => {
  return (<div className="relative min-h-screen bg-gray-100">
    <UserEmailContext>
      <UserNavBar />
      <div className="pt-16 w-full max-w-screen-xl mx-auto px-4">
        <RoutesComp />
        <AdminRoutes />
      </div>
    </UserEmailContext>
  </div>)
}

export default App
