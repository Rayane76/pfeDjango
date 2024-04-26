"use client";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import "../styles/register.css";

export default function Register() {
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
    setTimeout(() => {
      alert("Thanks! \n You Are Successfully Signed Up");
      location.reload();
    }, 800);
  };

  const [allInfos, setAllInfos] = useState({
    fname: "",
    lname: "",
    // situation: "",
    // children: "",
    email: "",
    phone: "",
    emergency: "",
    date: "",
    gender: "",
    blood: "",
    address: "",
    cardId: "",
    password: "",
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
                <input type="text" name="fname" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Last Name</div>
                <input type="text" name="lname" onChange={(e)=>handleInput(e)} />
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
                <input type="tel" name="phone" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Emergency Contact Number</div>
                <input type="tel" name="emergency" onChange={(e)=>handleInput(e)} />
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
                <input type="date" name="date" onChange={(e)=>handleInput(e)} />
              </div>
              <div className="field">
                <div className="label">Gender</div>
                <select name="gender" value={allInfos.gender} onChange={(e)=>handleInput(e)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="field">
                <div className="label">Blood Type</div>
                <select name="blood" value={allInfos.blood} onChange={(e)=>handleInput(e)}>
                  <option value="oPlus">O +</option>
                  <option value="oMinus">O -</option>
                  <option value="aPlus">A +</option>
                  <option value="aMinus">A -</option>
                  <option value="bPlus">B +</option>
                  <option value="bMinus">B -</option>
                  <option value="abPlus">AB +</option>
                  <option value="abMinus">AB -</option>
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
                <input type="text" name="cardId" onChange={(e)=>handleInput(e)} />
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
