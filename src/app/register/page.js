"use client";

import { useState , useNavigate } from "react";
import Navbar from "../components/navbar/Navbar";
import "../styles/register.css";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { getUser } from "../helpers/axios";


export default function Register() {


  const router = useRouter()

  // const user = getUser
  // if(user){
  //   router.push('/')
  // }

  const handleFirstNext = (e) => {
    e.preventDefault();
    const allSlides = document.querySelectorAll(".slide");
    const allSteps = document.querySelectorAll(".step");
    allSlides[0].style.marginLeft = "-25%";
    allSteps[0].classList.add("passed");
  };
  const handleSecondNext = (e) => {
    e.preventDefault();
    const allSlides = document.querySelectorAll(".slide");
    const allSteps = document.querySelectorAll(".step");

    allSlides[0].style.marginLeft = "-50%";
    allSteps[1].classList.add("passed");
  };
  const handleThirdNext = (e) => {
    e.preventDefault();
    const allSlides = document.querySelectorAll(".slide");
    const allSteps = document.querySelectorAll(".step");

    allSlides[0].style.marginLeft = "-75%";
    allSteps[2].classList.add("passed");
  };
  const handleFirstPrev = (e) => {
    e.preventDefault();
    const allSlides = document.querySelectorAll(".slide");
    const allSteps = document.querySelectorAll(".step");

    allSlides[0].style.marginLeft = "0%";
    allSteps[0].classList.remove("passed");
  };
  const handleSecondPrev = (e) => {
    e.preventDefault();
    const allSlides = document.querySelectorAll(".slide");
    const allSteps = document.querySelectorAll(".step");

    allSlides[0].style.marginLeft = "-25%";
    allSteps[1].classList.remove("passed");
  };
  const handleThirdPrev = (e) => {
    e.preventDefault();
    const allSlides = document.querySelectorAll(".slide");
    const allSteps = document.querySelectorAll(".step");

    allSlides[0].style.marginLeft = "-50%";
    allSteps[2].classList.remove("passed");
  };




const handleSubmit = (e) => {
    e.preventDefault();
    const allSteps = document.querySelectorAll(".step");
    
    console.log("DATA;",allInfos)
    axios
      .post("http://127.0.0.1:8000/api/register/",allInfos)
      .then((res)=>{
        localStorage.setItem("auth",JSON.stringify({
          id:res.data.id ,
          refresh:res.data.refresh,
          access:res.data.access,
          role:res.data.role
        }))

        router.push('/')
      }).catch((err)=>{
        console.log('err',err.request.response)

      })
  };

  const [allInfos, setAllInfos] = useState({
    first_name: "",
    last_name: "",
    email: "",
    numero_tel: "",
    emergency_number: "",
    birth_date: "",
    gender: "Male",
    blood_type: "O+",
    address: "",
    carte_id: "",
    password: "",
    role:"P"
  });

  const handleInput = (e) => {
    setAllInfos((prev)=>({...prev,[e.target.name]:e.target.value}));
  }



  
  
  return (
    <>
      <Navbar />
      <div className="container">
        <header>Sign Up</header>

        <div className="progress-bar">
          <div className="step">
            <div className="name">Name</div>
            <div className="number">
              <span>1</span>
            </div>
            <i className="bx bx-check"></i>
          </div>

          <div className="step">
            <div className="name">Contact</div>
            <div className="number">
              <span>2</span>
            </div>
            <i className="bx bx-check"></i>
          </div>

          <div className="step">
            <div className="name">Birth</div>
            <div className="number">
              <span>3</span>
            </div>
            <i className="bx bx-check"></i>
          </div>

          <div className="step">
            <div className="name">Submit</div>
            <div className="number">
              <span>4</span>
            </div>
            <i className="bx bx-check"></i>
          </div>
        </div>

        <div className="form-outer">
          <form action="#">
            <div className="slide">
              <div className="title">Basic Info :</div>
              <div className="field">
                <div className="label">First Name</div>
                <input type="text" name="first_name" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Last Name</div>
                <input type="text" name="last_name" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Address</div>
                <input type="text" name="address" onChange={(e)=>handleInput(e)} />
              </div>
              {/* <div className="field">
                <div className="label">Family Situation</div>
                <select name="situation" value={allInfos.situation} onChange={(e)=> handleInput(e)}>
                  <option hidden>Click to select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widower">Widower</option>
                </select>
              </div>
              {allInfos.situation != "single" && allInfos.situation != "" && 
              <div className="field">
                <div className="label">Number of Children</div>
                <input type="text" name="children" onChange={(e)=>handleInput(e)} />
              </div>
              } */}
              <div className="field">
                <button className="next" onClick={(e) => handleFirstNext(e)}>
                  Next
                </button>
              </div>
            </div>

            <div className="slide">
              <div className="title">Contact Info :</div>
              <div className="field">
                <div className="label">Email Address</div>
                <input type="text" name="email" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Phone Number</div>
                <input type="tel" name="numero_tel" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Emergency Contact Number</div>
                <input type="tel" name="emergency_number" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field btns">
                <button className="prev" onClick={(e) => handleFirstPrev(e)}>
                  Previous
                </button>
                <button className="next" onClick={(e) => handleSecondNext(e)}>
                  Next
                </button>
              </div>
            </div>

            <div className="slide">
              <div className="title">Date of Birth :</div>
              <div className="field">
                <div className="label">Date</div>
                <input type="date" name="birth_date" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Gender</div>
                <select name="gender" value={allInfos.gender} onChange={(e)=>handleInput(e)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="field">
                <div className="label">Blood Type</div>
                <select name="blood_type" value={allInfos.blood} onChange={(e)=>handleInput(e)}>
                  <option value="O+">O +</option>
                  <option value="O-">O -</option>
                  <option value="A+">A +</option>
                  <option value="A-">A -</option>
                  <option value="B+">B +</option>
                  <option value="B-">B -</option>
                  <option value="AB+">AB +</option>
                  <option value="AB-">AB -</option>
                </select>
              </div>
              <div className="field btns">
                <button className="prev" onClick={(e) => handleSecondPrev(e)}>
                  Previous
                </button>
                <button className="next" onClick={(e) => handleThirdNext(e)}>
                  Next
                </button>
              </div>
            </div>

            <div className="slide">
              <div className="title">Login Details :</div>
              <div className="field">
                <div className="label">ID Card number</div>
                <input type="text" name="carte_id" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Password</div>
                <input type="password" name="password" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field btns">
                <button className="prev" onClick={(e) => handleThirdPrev(e)}>
                  Previous
                </button>
                <button className="submit" onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
