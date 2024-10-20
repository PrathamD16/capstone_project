import React, { useState, useEffect, useContext } from 'react'
import Grid from '@mui/material/Grid2'
import { useNavigate, useParams } from 'react-router-dom'
import { UserEmailContext } from "../../Context/CredContext";
import { Button, Stack, TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import { DeleteForeverOutlined } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const BookingForm = () => {

  const { fid } = useParams()

  const { byEmail, signedIn } = useContext(UserEmailContext);
  const nav = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cost, setCost] = useState(0)
  const [avaSeats, setAvaSeats] = useState(0)

  // Passenger detail
  const [cname, setCname] = useState("");
  const [contact, setContact] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("female");

  const [list, setList] = useState([])

  const [btnDisable, setBtnDisable] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getFlightDetail = async () => {
      try {
        const res = await axios.get(
          ` http://localhost:5000/flight-service/api/search/flightbook/${fid}`
        );
        setAvaSeats(res.data.total_seats - res.data.booked_seats)
        setCost(res.data.cost)
      } catch (e) {
        console.log(e)
      }
    }
    getFlightDetail()
    console.log(`Seats available: ${avaSeats}`)
    setLoading(false)
    setBtnDisable(!(JSON.stringify(contact).trim().length === 12 && contact > 0 && age > 0))
  }, [list, contact, cname, age, error])

  const submitHandler = (e) => {
    e.preventDefault()
    const newPassenger = {
      cname, age, gender, contact,
      cost,
      by_email: byEmail,
      status: `confirmed`,
      fid
    }

    if (avaSeats <= 0) {
      setError("Seats are full for this flight")
      setTimeout(() => {
        setError("")
        setCname("")
        setContact("")
        setAge("")
        setGender("female")
        setError("")
      }, 2000)
      return;
    }

    axios
      .post(
        "http://localhost:4000/passenger-service/api/bookCustomer",
        newPassenger
      )
      .then((res) => {
        console.log(res.data)
        setList([...list, res.data])
        setCname("")
        setContact("")
        setAge("")
        setGender("female")
        setError("")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteHandler = (index) => {
    console.log(`deleted ${index}`)
    setList(list.filter((booking) => booking.bid !== index))
    axios
      .delete(
        `http://localhost:4000/passenger-service/api/deleteBooking/${index}`
      )
      .then(() => {
        console.log(`Deleted the data ${index}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const paymentHandler = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      nav("/user/showbooking")
    }, 4000)
  }

  return (
    <div className={`relative ${loading ? "backdrop-blur-sm" : ""}`}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <CircularProgress color="inherit" />
        </div>
      )}
      <Grid container spacing={2}>
        {error && <Alert className='absolute' severity='error'>{error}</Alert>}
        <Grid item flex={6} display="flex" flexDirection="column" justifyContent="space-between">
          <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 my-2">
              <h3 className="text-xl font-semibold text-center mb-4">Passenger Detail Form</h3>
              <form className="space-y-5" onSubmit={submitHandler}>
                <div className="flex">
                  <TextField
                    onChange={(e) => setCname(e.target.value)}
                    type="text"
                    value={cname}
                    className="flex-1"
                    label="Name"
                    required
                  />
                </div>
                <div className="flex">
                  <TextField
                    onChange={(e) => setContact(e.target.value)}
                    type="number"
                    value={contact}
                    className="flex-1"
                    label="Contact"
                    required
                  />
                </div>
                <div className="flex">
                  <TextField
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    value={age}
                    className="flex-1"
                    label="Age"
                    required
                  />
                </div>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onClick={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <div className="flex">
                  <Button disabled={btnDisable} type="submit" className="flex-1" variant="contained">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Grid>

        <Grid className="bg-gray-100 p-2" item flex={6} display="flex" flexDirection="column" justifyContent="space-between">
          <div>
            {list.length <= 0 ? (
              <div className='flex justify-center'>
                <p className='text-xl mt-10'>No passengers in the list</p>
              </div>
            ) : (
              <div className="h-[300px] overflow-y-auto mt-4">
                {list.map((booking, _i) => {
                  return (
                    <Stack className="bg-slate-200 text-sm rounded-md p-4 my-2 hover:bg-gradient-to-l from-gray-100 to-blue-800 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-[1.02]" key={_i}>
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <p>Name: <span className="font-semibold break-words">{booking.cname.toUpperCase()}</span></p>
                          <p>Age: <span className="font-semibold">{booking.age}</span></p>
                          <p>Gender: <span className="font-semibold">{booking.gender.toUpperCase()}</span></p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button onClick={() => deleteHandler(booking.bid)} color="error">
                            <DeleteForeverOutlined />
                          </Button>
                        </div>
                      </div>
                    </Stack>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-around">
            <Button onClick={paymentHandler} disabled={list.length <= 0} variant="contained" color="success" className="">
              Proceed for payment
            </Button>
            <div className='bg-green-600 text-white py-2 px-5 rounded-lg'>
              <p>Total : {list.length * cost} Rs</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default BookingForm
