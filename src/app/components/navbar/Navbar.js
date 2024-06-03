'use client'
import "../../styles/navbar.css"
import { FaBars } from "react-icons/fa";
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cookies from 'universal-cookie';

export default function Navbar(){

  const cookies = new Cookies();

  const auth = cookies.get("auth");

  let url = "/"

  if(auth){
   url = "/account/" + auth.id;
  }
  console.log(auth);


    const [show, setShow] = useState(false);

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
             <FaBars className="menuIcon" onClick={handleShow} />
             <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           <div className="canvasBtnsDiv">
             <a href="/login" className="navBtnCanvas">Connexion</a>
             <a  href={auth === undefined ? "/login" : auth.role === "P" ? "/account/" + auth.id : auth.role === "D" ? "/admin/doctor" : auth.role === "C" ? "/admin/centre" : auth.role === "L" ? "/admin/doctor" : auth.role === "A" ? "/admin/superAdmin" : "/" } className="navBtnCanvas">Mon compte</a>
             <a href="/registerHealthCare" className="navBtnCanvas">Médecin/Centre</a>
            </div> 
        </Offcanvas.Body>
      </Offcanvas>
           </div>
         </div>
        </>
    )
}