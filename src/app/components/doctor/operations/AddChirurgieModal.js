'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/doctor/patient/radios.css";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function AddChirurgieModal({modalShowAdd, setModalShowAdd,patient_id}){

  const router = useRouter();

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
        categorie: "",
        rapport: "",
        date: formattedDate,
        isDemande: false
      })

      const handleChangeAddChirurgie = (e)=>{
        setChirurgieData((prev)=>({...prev,[e.target.name]:e.target.value}));
      }


      


        const handleSubmit = async (e)=>{
        e.preventDefault();
        const session = await getSession();

        if(selected === "demanderRadioTitle"){
          chirurgieData.isDemande = true;
        }

        await axios.post("/api/users/patient/addToArrayField",{data: chirurgieData , field: "chirurgies" , id: patient_id , centrerole: session.user.role ,centreid: session.user.id})
        .then((res)=>{
       if(res.data.success === true){
        setModalShowAdd(false);
       setChirurgieData({
        nom: "",
        categorie: "",
        rapport: "",
        date: formattedDate,
        isDemande: false
      });
       router.refresh();
     }
     else{
       console.log(res);
     }
    }).catch((err)=>{
     console.log(err);
    })
        
        }

        const [selected,setSelected] = useState("ajouterRadioTitle")

        const handleSwitch = (clicked)=>{
            if(selected != clicked){
              setSelected(clicked);
              const title1 = document.getElementsByClassName("ajouterRadioTitle");
              const title2 = document.getElementsByClassName("demanderRadioTitle");
        
              title1[0].classList.toggle("slctd");
              title2[0].classList.toggle("slctd");
            }
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
           <div className='d-flex'>
              <div className='ajouterRadioTitle slctd' onClick={()=>handleSwitch("ajouterRadioTitle")}>
                Ajouter Chirurgie
              </div>
              <div className='demanderRadioTitle' onClick={()=>handleSwitch("demanderRadioTitle")}>
                Demander Chirurgie
              </div>
             </div>
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
           {selected === "ajouterRadioTitle" && 
           <>
           <h4>Rapport : </h4>
           <textarea rows={7} onChange={(e)=>handleChangeAddChirurgie(e)} name='rapport' className="textArea"></textarea>
           </>
           }
         </Modal.Body>
         <Modal.Footer>
         <Button onClick={(e)=>handleSubmit(e)}>Ajouter</Button>
           <Button variant="secondary" onClick={()=>setModalShowAdd(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
    )
}