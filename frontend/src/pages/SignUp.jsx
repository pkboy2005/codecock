import React, { useState, useRef } from 'react'; // Added useRef
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import useButtonLoader from './useButtonLoader'; // Added useButtonLoader

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const buttonRef = useRef(null); // Added useRef for the button
  const { startLoading, stopLoading } = useButtonLoader(); // Added useButtonLoader

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    startLoading(buttonRef.current); // Start loading animation

    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate("/login");
        } else {
          toast.error(data.msg);
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
        stopLoading(buttonRef.current); // Stop loading animation
      });
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center min-h-screen">
        <form onSubmit={submitForm} className='w-[25vw] h-[auto] flex flex-col items-center bg-[#0f0e0e] p-[20px] rounded-lg shadow-xl shadow-black/50'>
          <img className='w-[230px] object-cover' src={logo} alt="" />

          <div className="inputBox">
            <input onChange={(e) => { setFullName(e.target.value) }} value={fullName} type="text" placeholder='Full Name' required />
          </div>

          <div className="inputBox">
            <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' required />
          </div>

          <div className="inputBox">
            <input onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' required />
          </div>

          <p className='text-[gray] text-[14px] mt-3 self-start'>Already have an account <Link to="/login" className='text-blue-500'>Login</Link></p>

          <button
            ref={buttonRef} // Added ref to the button
            className="btnNormal mt-3 bg-blue-500 transition-all hover:bg-blue-600"
            type="submit" // Ensure the button submits the form
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
