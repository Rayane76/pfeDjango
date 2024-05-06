'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/doctor/patient/radios.css";
import { useState } from "react";




export default function AddDemandeChirModal({modalAddDemande,setModalAddDemande,chirurgie}){


    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1; // Month is zero-based, so we add 1
    let year = today.getFullYear();
    
    // Pad day and month with leading zeros if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    
    let formattedDate = `${day}-${month}-${year}`;


    const [rapport,setRapport] = useState("");
    const handleChangeAddRadio = (e)=>{
       setRapport(e.target.value);
    }

    return(
        <Modal
        show={modalAddDemande}
           onHide={() => setModalAddDemande(false)}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-vcenter">
             Ajouter Radio
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>

           <h4>Nom Chirurgie : {chirurgie != null && chirurgie.nom}</h4>
           <h4>Catégorie : {chirurgie != null && chirurgie.categorie}</h4>
           <h4>Demandé par : {chirurgie != null && chirurgie.centre}</h4>

   
           
            <h4>Rapport : </h4>
            <textarea rows={7} onChange={(e)=>handleChangeAddRadio(e)} className="textArea"></textarea>
           
         </Modal.Body>
         <Modal.Footer>
         <Button>Ajouter</Button>
           <Button variant="secondary" onClick={()=>setModalAddDemande(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
    )

}