import React, { useState, useEffect, useContext } from 'react'
import Grid from '@mui/material/Grid2'
import { useParams } from 'react-router-dom'
import { UserEmailContext } from "../../Context/CredContext";
import { Button, Stack, TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import { DeleteForeverOutlined, DeleteForeverRounded } from '@mui/icons-material';

const BookingForm = () => {

  const { fid } = useParams()

  const { byEmail, signedIn } = useContext(UserEmailContext);

  const [loading, setLoading] = useState(false)
  const [cost, setCost] = useState(0)
  const [avaSeats, setAvaSeats] = useState(0)

  // Passenger detail
  const [cname, setCname] = useState("");
  const [contact, setContact] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const [list, setList] = useState([])

  const [btnDisable, setBtnDisable] = useState(false)


  useEffect(() => {
    const getFlightDetail = async () => {
      try {
        const res = await axios.get(
          ` http://localhost:5000/flight-service/api/search/flight/${fid}`
        );
        setCost(res.data.cost)
        setAvaSeats(res.data.total_seats - res.data.booked_seats)
      } catch (e) {
        console.log(e)
      }
    }
    getFlightDetail()
    console.log(avaSeats)
  }, [fid, list])

  useEffect(() => {
    setBtnDisable(!(JSON.stringify(contact).trim().length === 12 && contact > 0 && age > 0))
  }, [contact, cname, age])



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
      console.log(`Seats are full`)
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

  return (
    <Grid container spacing={2}>
      <Grid flex={7}>
        <div className='flex items-center justify-center h-screen bg-gray-100'>
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-center mb-4">Passenger Detail Form</h3>
            <form className='space-y-5' onSubmit={submitHandler}>
              <div className='flex'>
                <TextField onChange={e => setCname(e.target.value)} type='text' value={cname} className='flex-1' label="Name" required />
              </div>
              <div className='flex'>
                <TextField onChange={e => setContact(e.target.value)} type='number' value={contact} className='flex-1' label="Contact" required />
              </div>
              <div className='flex'>
                <TextField onChange={e => setAge(e.target.value)} type='number' value={age} className='flex-1' label="Age" required />
              </div>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onClick={e => setGender(e.target.value)}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              <div className='flex'>
                <Button disabled={btnDisable} type='submit' className='flex-1' variant='contained'>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Grid>
      <Grid flex={5}>
        <div className='flex'>
          <Button disabled={list.length <= 0 ? true : false} variant='contained' color='success' className='flex-1'>Proceed for payment</Button>
        </div>
        {
          list.length <= 0 ? `List is empty` : <>
            {
              list.map((booking, _i) => {
                return (
                  <Stack className='bg-slate-200 text-sm px-2 rounded-md py-1 my-2' key={_i}>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p>Name: {booking.cname}</p>
                        <p>Age: {booking.age}</p>
                        <p>Gender: {booking.gender}</p>
                      </div>
                      <Button onClick={() => deleteHandler(booking.bid)} color="error"><DeleteForeverOutlined /></Button>
                    </div>
                  </Stack>
                )
              })
            }
          </>
        }
      </Grid>
    </Grid>
  )
}

export default BookingForm
