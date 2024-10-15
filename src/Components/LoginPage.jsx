import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserEmailContext } from "../Context/CredContext";

const LoginPage = () => {
  const { byEmail, updateEmail, setAdmin, updateSignIn, setUserName } = useContext(UserEmailContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cred, setCreds] = useState();
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    updateEmail("");
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
        setError("Please fill in both fields.");
        return;
    }
  
    const credResponse = {
      email,
      password,
    };

    axios
      .post(
        `http://localhost:8081/user-service/api/authenticate-auth/authenticate`,
        credResponse
      )
      .then((data) => {
        const res = data.data;
        
        if (res.email === email && res.password === password) {
          updateSignIn(true)
          updateEmail(res.email);
          setUserName(res.username)
          if (res.admin === true) {
            setAdmin(true);
            nav("/admin");
          } else {
            setAdmin(false);
            nav("/user");
          }
        } else {
          setError(`Invalid Credentials`)
        }
      })
      .catch((err) => {});
    setError('')
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-blue-300 to-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome to Login Page
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <br />
        <span className="block text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
