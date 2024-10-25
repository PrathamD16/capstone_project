import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FlightTile from './FlightTile';
import { UserEmailContext } from '../../Context/CredContext';
import CircularProgress from '@mui/material/CircularProgress';
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Grid from '@mui/material/Grid2';

const UserDashboard = () => {
  const { date, updateDate } = useContext(UserEmailContext);

  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const [src, setSrc] = useState("");
  const [des, setDes] = useState("");

  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Slider component variables
  const [timeRange, setTimeRange] = useState([0, 24]);
  const [costRange, setCostRange] = useState([5000, 100000])

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/flight-service/api/search/user?src=&des=&date`);
      setAllFlights(res.data);
      setLoading(false);
    };
    fetchData();
    setTimeRange([0,24])
    setCostRange([5000, 100000])
  }, [refresh]);
  
  useEffect(() => {
    
    // console.log(new Date().getFullYear())
    filterFlights(allFlights);
    console.log(allFlights)
  }, [src, des, date, timeRange, allFlights, costRange]);

  const filterFlights = (flights) => {
    const filtered = flights.filter(flight => {
      const matchesSrc = src ? flight.source.toLowerCase().includes(src.toLowerCase()) : true;
      const matchesDes = des ? flight.destination.toLowerCase().includes(des.toLowerCase()) : true;
      const matchesDate = date ? flight.dept_time.startsWith(date) : true;
      const seatsAvail = flight.total_seats - flight.booked_seats > 0;

      // Cost range
      const matchCostRange = flight.cost >= costRange[0] && flight.cost <= costRange[1] 

      // For time
      const flightTime = new Date(flight.dept_time).getHours();
      const matchesTimeRange = flightTime >= timeRange[0] && flightTime <= timeRange[1];

      return matchesSrc && matchesDes && matchesDate && seatsAvail && matchesTimeRange && matchCostRange;
    });
    setFilteredFlights(filtered);
  };

  // For handling time range filter
  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };
  
  // For handling cost range filter
  const handleCostRangeChange = (event, newValue) => {
    // console.log(costRange)
    setCostRange(newValue)
  }

  // For exception of date and time
  const dateTimeException = (ipdate) => {
    const currDate = new Date()
    const inputDate = new Date(ipdate)
    return currDate.getFullYear() == inputDate.getFullYear() && currDate.getMonth() == inputDate.getMonth() && currDate.getDate() == inputDate.getDate()
  }

  return (
    <div className="space-y-5 p-4">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-5 mb-5">
        <input
          className="flex-1 border border-gray-300 rounded-md p-2"
          placeholder="FROM"
          type="text"
          onChange={e => setSrc(e.target.value)}
        />
        <input
          className="flex-1 border border-gray-300 rounded-md p-2"
          placeholder="TO"
          type="text"
          onChange={e => setDes(e.target.value)}
        />
        <input
          className="flex-1 border border-gray-300 rounded-md p-2"
          value={date}
          min={minDate}
          placeholder="Date"
          type="date"
          onChange={e => updateDate(e.target.value)}
        />
        <div>
          <Button variant='contained' onClick={() => setRefresh(!refresh)}><RefreshIcon /></Button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Grid className="flex space-x-4" spacing={2}>
          {/* Filters section */}
          <Grid className="space-y-4" flex={3}>
            {/* Time Filter */}
            <div className="bg-white p-8 rounded-md shadow-sm">
              <p className="text-lg font-semibold mb-2">Select Time of Departure</p>
              <Slider
                value={timeRange}
                onChange={handleTimeRangeChange}
                disabled={allFlights.length <= 0}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={dateTimeException(date) ? new Date().getHours() : 0}
                max={24}
                marks={[
                  { value: 0, label: '00:00' },
                  { value: 6, label: '06:00' },
                  { value: 12, label: '12:00' },
                  { value: 18, label: '18:00' },
                  { value: 24, label: '24:00' },
                ]}
              />
            </div>
            {/* Cost filter */}
            <div className="bg-white p-8 rounded-md shadow-sm">
              <p className="text-lg font-semibold mb-2">Select Fare Range</p>
              <Slider
                value={costRange}
                onChange={handleCostRangeChange}
                disabled={allFlights.length <= 0}
                valueLabelDisplay='auto'
                aria-labelledby="range-slider"
                min={5000}
                max={100000}
                step={1000}
                marks={[
                  {value:5000, label:'5k'},
                  {value:20000, label:'20k'},
                  {value:40000, label:'40k'},
                  {value:60000, label:'60k'},
                  {value:80000, label:'80k'},
                  {value:100000, label:'100k'},
                ]}
              />
            </div>
          </Grid>
          {/* Flight display section */}
          <Grid flex={9}>
            <div className='h-[80vh] overflow-y-auto'>
              {filteredFlights.length <= 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-xl">No Flights available</p>
                </div>
              ) : (
                <div className="bg-white p-1 rounded-md">
                  {filteredFlights.map((flight, _i) => (
                    <div key={_i} className="mb-1">
                      <FlightTile flight={flight} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default UserDashboard;
