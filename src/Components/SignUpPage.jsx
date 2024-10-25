import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const nav = useNavigate();

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password || !confirmPassword || !username) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (!email.includes('@') && !email.includes('.com')) {
      setError('Invalid Email Format!!');
      return;
    }

    const newUser = {
      email,
      password,
      username,
      isAdmin: false,
    };

    axios.post(`http://localhost:8081/user-service/api/authenticate-auth/addUser`, newUser)
      .then((res) => {
        if (res.data === true) {
          nav("/login");
        } else {
          setError('Email Id Already exists!! Use another email id');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-300 to-slate-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p className="text-sm text-gray-600">
            Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
