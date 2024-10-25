import React, { useContext, useState, useEffect } from "react";
import { UserEmailContext } from '../../Context/CredContext';
import axios from "axios";
import AdminFlightTile from './AdminFightTile';
import Grid from "@mui/material/Grid2";
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from '@mui/material/CircularProgress';

const FlightList = () => {
  const { date, updateDate } = useContext(UserEmailContext);
  const [src, setSrc] = useState("");
  const [des, setDes] = useState("");
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const [allflights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [timeRange, setTimeRange] = useState([0, 24]);

  const [minDate, setMinDate] = useState("");

  const [error, setError] = useState(null);

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
  }, []);

  useEffect(() => {
    // console.log(new Date().getFullYear())
    filterFlights(allflights);
  }, [src, des, date, timeRange, allflights]);


  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  const dateTimeException = (ipdate) => {
    const currDate = new Date()
    const inputDate = new Date(ipdate)
    return currDate.getFullYear() == inputDate.getFullYear() && currDate.getMonth() == inputDate.getMonth() && currDate.getDate() == inputDate.getDate()
  }

  const filterFlights = (flights) => {
    const filtered = flights.filter(flight => {
      const matchesSrc = src ? flight.source.toLowerCase().includes(src.toLowerCase()) : true;
      const matchesDes = des ? flight.destination.toLowerCase().includes(des.toLowerCase()) : true;
      const matchesDate = date ? flight.dept_time.startsWith(date) : true;
      const seatsAvail = flight.total_seats - flight.booked_seats > 0;

      // For time
      const flightTime = new Date(flight.dept_time).getHours();
      const matchesTimeRange = flightTime >= timeRange[0] && flightTime <= timeRange[1];

      return matchesSrc && matchesDes && matchesDate && seatsAvail && matchesTimeRange;
    });
    setFilteredFlights(filtered);
  };


  // Delete Handler
  const deleteHandler = async (flightid) => {
    try {
      await axios.delete(`http://localhost:5000/flight-service/api/admin/deleteMapping/${flightid}`);
      // setBookingList(prevList => prevList.filter(booking => booking.bookingId !== bookingId));
      setAllFlights(preList => preList.filter(flight => flight.id !== flightid))
    } catch (err) {
      console.error("Error deleting flight:", err);
      setError("Failed to delete flight. Please try again later.");
    }
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
                disabled={allflights.length <= 0}
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
          </Grid>
          {/* Flight display section */}
          <Grid flex={9}>
            <div className="h-[80vh] overflow-y-auto">
              {filteredFlights.length <= 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-xl">No Flights available</p>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-md shadow-sm">
                  {filteredFlights.map((flight, _i) => (
                    <div key={_i} className="mb-4">
                      <AdminFlightTile flight={flight} onDelete={deleteHandler} />
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

export default FlightList;
