import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

const BookingForm = () => {

  const nav = useNavigate();

  const { fid } = useParams();

  const { byEmail, signedIn } = useContext(UserEmailContext);

  const [cname, setCname] = useState("");
  const [contact, setContact] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [cost, setCost] = useState(0);
  const [error, setError] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);

  function validateName(name) {
    const namePattern = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    return namePattern.test(name);
  }

  useEffect(() => {
    const getCost = async () => {
      const res = await axios.get(
        ` http://localhost:5000/flight-service/api/search/flight/${fid}`
      );
      setCost(res.data.cost);
    };
    getCost();

    if (validateName(cname) === true && JSON.stringify(contact).length == 12 && age > 0) {
      console.log(`Satisfied`)
      setBtnDisable(false)
    }
    else {
      setBtnDisable(true)
    }

    console.log(`Length of contact: ${JSON.stringify(contact).length}`)

  }, [cname, contact, age]);

  const submitHandler = (e) => {
    e.preventDefault()
    const passengerDetail = {
      cname, contact, age,
      gender, 
      by_email: byEmail,
      status: 'confirmed',
      cost, 
      fid: parseInt(fid)
    }

    console.log(passengerDetail)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[40rem]">
        <div className='flex justify-center my-5 '>
          <p className='text-xl font-bold'>Passenger detail form</p>
        </div>
        <form onSubmit={submitHandler} className='space-y-5'>
          <div className="flex">
            <TextField type="text" className="flex-1" label="Name" variant='outlined' onChange={e => setCname(e.target.value)} />
          </div>
          <div className="flex">
            <TextField type="number" className="flex-1" label="Contact" variant='outlined' onChange={e => setContact(e.target.value)} />
          </div>
          <div className="flex">
            <TextField type="number" className="flex-1" label="Age" variant='outlined' onChange={e => setAge(e.target.value)} />
          </div>
          <div>
            <p className='text-md font-semibold'>Select Gender</p>
            <RadioGroup
              row
              defaultValue="female"
              name="gender-radio-button"
              onChange={e => setGender(e.target.value)}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </div>
          <div className='flex'>
            <Button type='submit' disabled={btnDisable} className='flex-1' variant="contained">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingForm
