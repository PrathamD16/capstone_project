import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid2';
import { useNavigate, useParams } from 'react-router-dom';
import { UserEmailContext } from "../../Context/CredContext";
import { Button, Stack, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { DeleteForeverOutlined } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const BookingForm = () => {
  const { fid } = useParams();
  const { byEmail, signedIn } = useContext(UserEmailContext);
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cost, setCost] = useState(0);
  const [avaSeats, setAvaSeats] = useState(0);

  // Passenger detail
  const [cname, setCname] = useState("");
  const [contact, setContact] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("female");

  const [list, setList] = useState([]);
  const [btnDisable, setBtnDisable] = useState(false);


  const validateName = (name) => {
    const regexForName =  (/^[A-Za-z]+$/)
    return regexForName.test(name)
  }

  const validateNumbers = (contact) => {
    const regexForContact = (/^[0-9]+$/)
    return regexForContact.test(contact)
  }

  useEffect(() => {
    setLoading(true);
    const getFlightDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/flight-service/api/search/flightbook/${fid}`
        );
        setAvaSeats(res.data.total_seats - res.data.booked_seats);
        setCost(res.data.cost);
      } catch (e) {
        console.log(e);
      }
    };
    getFlightDetail();
    setLoading(false);
    setBtnDisable(!(JSON.stringify(contact).trim().length === 12 && contact > 0 && age > 0 && validateName(cname)));
  }, [list, contact, cname, age, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newPassenger = {
      cname, age, gender, contact,
      cost,
      by_email: byEmail,
      status: `confirmed`,
      fid
    };

    if (list.length >= avaSeats) {
      setError("Seats are full for this flight");
      setTimeout(() => {
        setError("");
        setCname("");
        setContact("");
        setAge("");
        setGender("female");
        setError("");
      }, 2000);
      return;
    }

    setList([...list, newPassenger]);
    setCname("");
    setContact("");
    setAge("");
    setGender("female");
    setError("");
  };

  const deleteHandler = (index) => {
    setList(list.filter((booking, _i) => _i !== index));
  };

  const paymentHandler = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:4000/passenger-service/api/bookCustomer",
        list
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setLoading(false);
      nav("/user/showbooking");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      {/* Loader with backdrop blur */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-md">
          <CircularProgress color="inherit" />
          <p className="mx-2">Please wait...</p>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto">
        {error && <Alert className="absolute w-full" severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="flex flex-col items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-semibold text-center mb-6 text-blue-700">Passenger Detail Form</h3>
              <form className="space-y-5" onSubmit={submitHandler}>
                <TextField
                  onChange={(e) => setCname(e.target.value)}
                  type="text"
                  value={cname}
                  className="w-full"
                  label="Name"
                  required
                  // error={!validateName(cname)}
                  // helperText={!validateName(cname) ? "Only alphabets are allowed" : ""}
                />
                <TextField
                  onChange={(e) => setContact(e.target.value)}
                  type="number"
                  value={contact}
                  className="w-full"
                  label="Contact"
                  required
                  // error={!validateNumbers(contact) || JSON.stringify(contact).trim().length !== 12}
                  // helperText={!validateNumbers(contact) || JSON.stringify(contact).trim().length !== 12 ? "Enter a valid 10-digit contact number" : ""}
                />
                <TextField
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  value={age}
                  className="w-full"
                  label="Age"
                  required
                  // error={!validateNumbers(age) || age <= 0}
                  // helperText={!validateNumbers(age) || age <= 0 ? "Enter a valid age" : ""}
                />
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onClick={(e) => setGender(e.target.value)}
                  className="w-full justify-center"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                <Button disabled={btnDisable} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200" variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </Grid>

          <Grid item xs={12} md={6} className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              {list.length <= 0 ? (
                <div className="flex justify-center mt-10">
                  <p className="text-xl text-gray-700">No passengers in the list</p>
                </div>
              ) : (
                <div className="h-[300px] overflow-y-auto mt-4">
                  {list.map((booking, _i) => (
                    <Stack key={_i} className="bg-gray-100 text-sm rounded-md p-4 my-2 hover:bg-blue-100 transition-all duration-500 ease-in-out transform hover:scale-[1.02]">
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <p>Name: <span className="font-semibold break-words">{booking.cname.toUpperCase()}</span></p>
                          <p>Age: <span className="font-semibold">{booking.age}</span></p>
                          <p>Gender: <span className="font-semibold">{booking.gender.toUpperCase()}</span></p>
                        </div>
                        <div className="flex-shrink-0">
                          <Button onClick={() => deleteHandler(_i)} color="error">
                            <DeleteForeverOutlined />
                          </Button>
                        </div>
                      </div>
                    </Stack>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between mt-4 space-x-5">
                <Button onClick={paymentHandler} disabled={list.length <= 0} variant="contained" color="success" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200">
                  Proceed for payment
                </Button>
                <div className="bg-green-600 text-white py-2 px-5 rounded-lg">
                  <p>Total: {list.length * cost} Rs</p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BookingForm;
