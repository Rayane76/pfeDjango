'use client'
import "../../../styles/doctor/sideBarAdmin.css"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function SideBarAdmin(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (e,clicked) =>{
        e.preventDefault();
        const div = document.getElementById(clicked);
        const active = document.getElementsByClassName("active");
        const fields = document.getElementsByClassName("field");
        [...fields].forEach(field => {
            if(field.classList.contains("selected")){
                field.classList.remove("selected");
            }
        });
        e.target.classList.add("selected");
        active[0].classList.add("unActive");
        active[0].classList.remove("active");
        div.classList.remove("unActive");
        div.classList.add("active");
        setShow(false);
    }

    return(
        <>
            
            <div className="sideBarDiv">
              <div className="fieldsParent">
               <div className="field selected" onClick={(e)=>handleClick(e,"generalInfos")}>
                General Informations
               </div>
               <div className="field" onClick={(e)=>handleClick(e,"modify")}>
                Modify Informations
               </div>
               <div className="field" onClick={(e)=>handleClick(e,"history")}>
                Diseases History
               </div>
               <div className="field" onClick={(e)=>handleClick(e,"radios")}>
                Radios
               </div>
                <div className="field" onClick={(e)=>handleClick(e,"analyses")}>
                Analyses
               </div>
                <div className="field" onClick={(e)=>handleClick(e,"operations")}>
                Operations
               </div>
                <div className="field" onClick={(e)=>handleClick(e,"consultation")}>
                Consultation informations
               </div>
              </div>
            </div>



             {/* MOBILE NAVIGATION */}
             <div className="mobile">
             <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="sideBarDivMobile">
              <div className="fieldsParent">
               <div className="field selected" onClick={(e)=>handleClick(e,"generalInfos")}>
                General Informations
               </div>
               <div className="field" onClick={(e)=>handleClick(e,"modify")}>
                Modify Informations
               </div>
               <div className="field" onClick={(e)=>handleClick(e,"history")}>
                Diseases History
               </div>
               <div className="field" onClick={(e)=>handleClick(e,"radios")}>
                Radios
               </div>
                <div className="field" onClick={(e)=>handleClick(e,"analyses")}>
                Analyses
               </div>
                <div className="field" onClick={(e)=>handleClick(e,"operations")}>
                Operations
               </div>
                <div className="field" onClick={(e)=>handleClick(e,"consultation")}>
                Consultation informations
               </div>
              </div>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
             </div>




        </>
    )
}