import React, {useContext, useState, useEffect} from "react";
import { UserEmailContext } from '../../Context/CredContext'
import axios from "axios";
import AdminFlightTile from './AdminFightTile'

const FlightList = () => {
  const { date, updateDate } = useContext(UserEmailContext);
  const [flights, setFlights] = useState([]);
  const [src, setSrc] = useState("");
  const [des, setDes] = useState("");
  // const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/flight-service/api/admin/getAllFlights?src=${src}&des=${des}&date=${date}`
      );
      setFlights(res.data);
    };
    fetchData();
    
  }, [des, src, date]);

  return <div>
    <div className='mx-5 flex justify-center my-5 space-x-5'>
        <input className='flex-1 border-solid border-2 rounded-md p-2' placeholder='FROM' type="text" onChange={e => setSrc(e.target.value)} />
        <input className='flex-1 border-solid border-2 rounded-md p-2' placeholder='TO' type="text" onChange={e => setDes(e.target.value)} />
        <input className='flex-1 border-solid border-2 rounded-md p-2' value={date} placeholder='date' type="date" onChange={e => updateDate(e.target.value)} />
    </div>
    {
        flights.map((flight, _i) => {
            return (
                <div key={_i}>
                    <AdminFlightTile flight={flight} />
                </div>
            )
        })
    }
  </div>;
};

export default FlightList;
