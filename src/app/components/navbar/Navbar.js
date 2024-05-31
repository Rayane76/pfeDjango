'use client'
import "../../styles/navbar.css"
import { FaBars } from "react-icons/fa";
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Navbar(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return(
        <>
         <div className="navbar">
           <div className="logoDiv">
              <h1 className="title">MEDICA</h1>
           </div>
           <div className="navBtnsDiv">
             <a href="/" className="navBtn navBtnMrg">Accueil</a>
             <a href="/login" className="navBtn navBtnMrg">Connexion</a>
             <a href="/registerHealthCare" className="navBtn">Médecin/Centre</a>
             <FaBars className="menuIcon" onClick={handleShow} />
             <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           <div className="canvasBtnsDiv">
             <a href="/" className="navBtnCanvas">Home</a>
             <a href="/login" className="navBtnCanvas">Connexion</a>
             <a href="/registerHealthCare" className="navBtnCanvas">Médecin/Centre</a>
            </div> 
        </Offcanvas.Body>
      </Offcanvas>
           </div>
         </div>
        </>
    )
}