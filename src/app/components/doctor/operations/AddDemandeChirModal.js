'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/doctor/patient/radios.css";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axiosService from '@/app/helpers/axios';



export default function AddDemandeChirModal({modalAddDemande,setModalAddDemande,chirurgie,patient_id}){

  const router = useRouter();


    const [rapport,setRapport] = useState("");
    const handleChangeAddRadio = (e)=>{
       setRapport(e.target.value);
    }


    const handleSubmit = (e)=>{
      e.preventDefault();

      axiosService.put(`medical_doc/${chirurgie.id}`,{note : rapport})
      .then((res) => {
        setModalAddDemande(false);
       router.refresh();
       }).catch((err) => {
         console.log(err);
       })
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
           <h4>Catégorie : {chirurgie != null && chirurgie.radio_category}</h4>
           <h4>Demandé par : {chirurgie != null && chirurgie.doctor}</h4>

   
           
            <h4>Rapport : </h4>
            <textarea rows={7} onChange={(e)=>handleChangeAddRadio(e)} className="textArea"></textarea>
           
         </Modal.Body>
         <Modal.Footer>
         <Button onClick={(e)=>handleSubmit(e)}>Ajouter</Button>
           <Button variant="secondary" onClick={()=>setModalAddDemande(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
    )

}