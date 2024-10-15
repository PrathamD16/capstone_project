import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import FlightTile from './FlightTile'
import { UserEmailContext } from '../../Context/CredContext'

const UserDashboard = () => {
  const {date, updateDate} = useContext(UserEmailContext)
  const [flights, setFlights] = useState([])
  const [src, setSrc] = useState("")
  const [des, setDes] = useState("")
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10))


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/flight-service/api/search/user?src=${src}&des=${des}&date=${date}`)
      setFlights(res.data)
    }
    fetchData()
    console.log(flights)
  }, [des, src, date])



  return (
    <div className='space-y-5  '>
      <div className='mx-5 flex justify-center my-5 space-x-5'>
        <input className='flex-1 border-solid border-2 rounded-md p-2' placeholder='FROM' type="text" onChange={e => setSrc(e.target.value)} />
        <input className='flex-1 border-solid border-2 rounded-md p-2' placeholder='TO' type="text" onChange={e => setDes(e.target.value)} />
        <input className='flex-1 border-solid border-2 rounded-md p-2' value={date} placeholder='date' type="date" onChange={e => updateDate(e.target.value)} />
        
      </div>
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
    </div>
  )
}

export default UserDashboard
