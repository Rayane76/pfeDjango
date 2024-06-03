'use client'
import "../../styles/navbar.css"
import { FaBars } from "react-icons/fa";
import { useState,useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'universal-cookie';

export default function Navbar(){

  const [auth, setAuth] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const authCookie = cookies.get("auth");
    setAuth(authCookie);
  }, []);

  if (auth === null) {
    // Render nothing or a loading state while auth is being fetched
    return null;
  }


  // console.log(auth);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return(
        <>
         <div className="navbar">
           <div className="logoDiv">
              <a href="/" style={{all:"unset",cursor:"pointer"}}><h1 className="title">MEDICA</h1></a>
           </div>
           <div className="navBtnsDiv">
           <a href="/login" className="navBtn navBtnMrg">Connexion</a>
             {auth === undefined ? <a href="/login" className="navBtn navBtnMrg">Mon compte</a>
              : auth.role === "P" ? <a href={"/account/"+auth.id} className="navBtn navBtnMrg">Mon compte</a>
              : auth.role === "D" ? <a href="/admin/doctor" className="navBtn navBtnMrg">Mon compte</a>
              : auth.role === "L" ? <a href="/admin/labo" className="navBtn navBtnMrg">Mon compte</a>
              : auth.role === "C" ? <a href="/admin/centre" className="navBtn navBtnMrg">Mon compte</a>
              : auth.role === "A" ? <a href="/admin/superAdmin" className="navBtn navBtnMrg">Mon compte</a>
              : ""
              }
             <a href="/registerHealthCare" className="navBtn">Médecin/Centre</a>
             <FaBars className="menuIcon" onClick={()=>setShow(true)} />
             <Offcanvas show={show} onHide={()=>setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MEDICA</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           <div className="canvasBtnsDiv">
             <a href="/login" className="navBtnCanvas">Connexion</a>
              {auth === undefined ? <a href="/login" className="navBtnCanvas">Mon compte</a>
              : auth.role === "P" ? <a href={"/account/"+auth.id} className="navBtnCanvas">Mon compte</a>
              : auth.role === "D" ? <a href="/admin/doctor" className="navBtnCanvas">Mon compte</a>
              : auth.role === "L" ? <a href="/admin/labo" className="navBtnCanvas">Mon compte</a>
              : auth.role === "C" ? <a href="/admin/centre" className="navBtnCanvas">Mon compte</a>
              : auth.role === "A" ? <a href="/admin/superAdmin" className="navBtnCanvas">Mon compte</a>
              : ""
              }            
               <a href="/registerHealthCare" className="navBtnCanvas">Médecin/Centre</a>
            </div> 
        </Offcanvas.Body>
      </Offcanvas>
           </div>
         </div>
        </>
    )
}