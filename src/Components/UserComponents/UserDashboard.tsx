import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import FlightTile from './FlightTile'
import { UserEmailContext } from '../../Context/CredContext'
import Grid from '@mui/material/Grid2'

const UserDashboard = () => {
  const { date, updateDate } = useContext(UserEmailContext)
  const [flights, setFlights] = useState([])
  const [src, setSrc] = useState("")
  const [des, setDes] = useState("")
  const [sort, setSortBy] = useState(false)
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10))


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/flight-service/api/search/user?src=${src}&des=${des}&date=${date}`)
      setFlights(res.data)
    }
    const fetcDateSort = async () => {
      const res = await axios.get(`http://localhost:5000/flight-service/api/search/sortflight`)
      setFlights(res.data);
    }
    if (!sort) {
      fetchData()
    }
    else {
      fetcDateSort()
    }
  }, [des, src, date, sort])



  return (
    <div className='space-y-5  '>
      <div className='mx-5 flex justify-center my-5 space-x-5'>
        <input className='flex-1 border-solid border-2 rounded-md p-2' placeholder='FROM' type="text" onChange={e => setSrc(e.target.value)} />
        <input className='flex-1 border-solid border-2 rounded-md p-2' placeholder='TO' type="text" onChange={e => setDes(e.target.value)} />
        <input className='flex-1 border-solid border-2 rounded-md p-2' value={date} placeholder='date' type="date" onChange={e => updateDate(e.target.value)} />
        <button className='bg-blue-600 text-white py-2 px-5 rounded-md
              hover:bg-blue-900 hover:text-white' onClick={() => setSortBy(!sort)}>{!sort ? `Sort By Cost` : `Sort by availability`}</button>
      </div>
      <Grid className="items-center flex mx-5" container spacing={2}>
        <Grid flex={2}>
          Here will be the filter
        </Grid>
        <Grid flex={10}>
          <div className='mx-5 '>
            {
              flights.map((flight, _i) => {
                return (
                  <div key={_i}>
                    {/* Need to implement Delete button & Booking Button */}
                    <FlightTile flight={flight} />
                  </div>
                )
              })
            }
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default UserDashboard
