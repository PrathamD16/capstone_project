export const filterFlights = (src, des, date, setFilteredFlights, flights) => {
    const filtered = flights.filter(flight => {
      const matchesSrc = src ? flight.source.toLowerCase().includes(src.toLowerCase()) : true;
      const matchesDes = des ? flight.destination.toLowerCase().includes(des.toLowerCase()) : true;
      const matchesDate = date ? flight.dept_time.startsWith(date) : true;
      return matchesSrc && matchesDes && matchesDate;
    });
    setFilteredFlights(filtered);
}