import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserEmailContext } from "../../Context/CredContext";

const BookingForm = () => {
  const nav = useNavigate();

  const { fid } = useParams();

  const { byEmail } = useContext(UserEmailContext);

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

    if(validateName(cname) === true && JSON.stringify(contact).length == 12 && age > 0){
      console.log(`Satisfied`)
      setBtnDisable(false)
    }
    else{
      setBtnDisable(true)
    }
    
    console.log(`Length of contact: ${JSON.stringify(contact).length}`)

  }, [cname,contact,age]);

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!cname || !contact || !age || gender.length === 0) {
      setError("Please fill in all fields and select at least one gender.");
      return;
    }


    const new_passenger = {
      cname,
      contact,
      gender: gender[0],
      age,
      by_email: byEmail,
      status: "confirmed",
      cost,
      fid: parseInt(fid),
    };


    axios
      .post(
        "http://localhost:4000/passenger-service/api/bookCustomer",
        new_passenger
      )
      .then(() => {
        console.log(new_passenger);
        nav("/user");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // name, contact, gender, age
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold text-center mb-4">Passenger Detail Form</h3>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form className="space-y-5" onSubmit={submitHandler}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter your name"
            value={cname}
            onChange={(e) => setCname(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <div className="px-4">
            <span className="block mb-2">Select your gender:</span>
            <label className="mr-4">
              <input
                type="checkbox"
                value="male"
                checked={gender.includes("male")}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                value="female"
                checked={gender.includes("female")}
                onChange={handleGenderChange}
              />
              Female
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                value="other"
                checked={gender.includes("other")}
                onChange={handleGenderChange}
              />
              Other
            </label>
          </div>
          <button
            disabled={btnDisable}
            type="submit"
            className={`${btnDisable == true ? `w-full bg-blue-200 text-white py-2 rounded-md`: `w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200`}`}
          >
            Book Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
