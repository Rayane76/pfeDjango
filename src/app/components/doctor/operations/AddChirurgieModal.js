'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/doctor/patient/radios.css";
import { useState } from "react";



export default function AddChirurgieModal({modalShowAdd, setModalShowAdd}){

    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1; // Month is zero-based, so we add 1
    let year = today.getFullYear();
    
    // Pad day and month with leading zeros if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    
    let formattedDate = `${day}-${month}-${year}`;

    const [chirurgieData,setChirurgieData] = useState({
        nom: "",
        date: formattedDate,
        categorie: "",
        rapport: "",
        medecin: "",
      })

      const handleChangeAddChirurgie = (e)=>{
        setAnalyseData((prev)=>({...prev,[e.target.name]:e.target.value}));
      }



    return(
        <Modal
        show={modalShowAdd}
           onHide={() => setModalShowAdd(false)}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-vcenter">
             Ajouter Chirurgie
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <div className="d-flex justify-content-start align-items-center gap-4">
           <h4>Nom Chirurgie : </h4>
           <input onChange={(e)=>handleChangeAddChirurgie(e)} placeholder="Nom Chirurgie ... " required name="nom"></input>
           </div>   
           <div className="d-flex justify-content-start align-items-center gap-4">
           <h4>Categorie Chirurgie : </h4>
           <input onChange={(e)=>handleChangeAddChirurgie(e)} placeholder="Categorie Chirurgie ... " required name="categorie"></input>
           </div>  
           <h4>Rapport : </h4>
           <textarea rows={7} onChange={(e)=>handleChangeAddChirurgie(e)} className="textArea"></textarea>
           
         </Modal.Body>
         <Modal.Footer>
         <Button>Ajouter</Button>
           <Button variant="secondary" onClick={()=>setModalShowAdd(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
    )
}