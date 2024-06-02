'use client'
import ModifyTitleSvg from "@/app/utils/svg/modifyTitle";
import "../../../styles/doctor/patient/personnelles.css";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosService from "@/app/helpers/axios";




export default function Personnelles({patient}){


    const cookies = new Cookies();

    const router = useRouter();

    const [modalShow,setModalShow] = useState(false);
    const [password,setPassword] = useState("");
    const [openBtn,setOpenBtn] = useState(false);

    const [allInfos,setAllInfos] = useState({
        address: patient.address,
        numero_tel: patient.numero_tel,
        emergency_number: patient.emergency_number,
        married: patient.married,
        nbr_children: patient.nbr_children,
    });


    const [newInfos,setNewInfos] = useState({});


    const handleChange = (e) => {
        setAllInfos((prev)=>({...prev,[e.target.name]: e.target.value}));
        setNewInfos((prev)=>({...prev,[e.target.name]: e.target.value}));
    }

    


    const handleLoggout = () => {

        cookies.remove("auth",{path: "/"});
        router.push("/");

    }

    const handleDeleteAccount = async () => {
        await axiosService.delete(`delete/${patient.id}/`,{
            data: {
                password: password
            }
        })
        .then((res)=>{
            cookies.remove("auth",{path: "/"});
            router.push("/");
        })
        .catch((err)=>{
            console.log(err);
        })
        

    }

    const handleOpenChanges = () => {
      const inputs = document.getElementsByClassName("inpt");
      [...inputs].map((input)=>{
        input.disabled = false;
      })
      setOpenBtn(true);
    }

    const handleSaveChanges = async (e) => {
       e.preventDefault();
       await axiosService.put(`edit/${patient.id}/`,newInfos)
       .then((res)=>{
        router.refresh();
        const inputs = document.getElementsByClassName("inpt");
      [...inputs].map((input)=>{
        input.disabled = true;
      })
        setOpenBtn(false);
       }).catch((err)=>{
        console.log(err);
       })



    }

    return(
        <div style={{height:"100vh",width:"100%",overflowY:"auto"}}>
            <div className="personnellesDiv">


               <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                 <ModifyTitleSvg />
                 <h1 className="title">Informations Personnelles</h1>
                 </div>
         <Dropdown>
         <Dropdown.Toggle  className="cssbuttons-io-button">
         Compte
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as="button" onClick={()=>handleLoggout()}>Se déconnecter</Dropdown.Item>
        <Dropdown.Item as="button" onClick={()=>setModalShow(true)} style={{color:"red"}}>Supprimer le compte</Dropdown.Item>
      </Dropdown.Menu>
        </Dropdown>
               </div>
   
               <form onSubmit={(e)=>handleSaveChanges(e)} style={{display:"flex",flexDirection:"column"}}>
               <div className="d-flex mb-4 flex-column">
                 <label className="me-4 mb-2">Addresse : </label>
                 <input onChange={(e)=>handleChange(e)} className="inpt" name="address" value={allInfos.address} disabled={true}></input>
               </div>
   
   
               <div className="d-flex flex-column mb-4">
                 <label className="me-4 mb-2">Numero de telephone : </label>
                 <input onChange={(e)=>handleChange(e)} className="inpt" name="numero_tel" value={allInfos.numero_tel} disabled={true}></input>
               </div>
   
   
               <div className="d-flex flex-column mb-4">
                 <label className="me-4 mb-2">Numero d'urgence : </label>
                 <input onChange={(e)=>handleChange(e)} className="inpt" name="emergency_number" value={allInfos.emergency_number} disabled={true}></input>
               </div>
   
   
               <div className="d-flex flex-column mb-4">
                 <label className="me-4 mb-2">Situation : </label>
                 <select onChange={(e)=>handleChange(e)} disabled={true} name="married" value={allInfos.married} className="inpt">
            <option value="" hidden>Choisir Situation familiale :  *</option>
            <option value="Célibataire">Célibataire</option>
            <option value="Marié(e)">Marié(e)</option>
            <option value="Divorcé(e)">Divorcé(e)</option>
            <option value="Veuf/Veuve">Veuf/Veuve</option>
          </select>
               </div>
   
               <div className="d-flex flex-column mb-4">
                 <label className="me-4 mb-2">Nombre d'enfants : </label>
                 <input onChange={(e)=>handleChange(e)} className="inpt" type="number" name="nbr_children" value={allInfos.nbr_children} disabled={true}></input>
               </div>
               
               {patient.carte_id === null && 
               <div className="d-flex flex-column mb-4">
                 <label className="me-4 mb-2">Numero d'identification national : </label>
                 <input onChange={(e)=>handleChange(e)} name="carte_id" className="inpt" disabled={true}></input>
               </div>
               }



               <div className="d-flex justify-content-center mt-4">
               {openBtn === false ? <button onClick={(e)=>{e.preventDefault();handleOpenChanges()}} className="btn btn-primary">Ouvrir Modifications</button>
                : 
                <button type="submit" className="btn btn-primary">Enregister Modifications</button>
            }
            </div>



               </form>


            </div>

            <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Supprimer compte</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <label className="me-4 mb-2">Entrer votre mot de passe : </label>
        <input style={{width:"250px"}} type="password" onChange={(e)=>setPassword(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
           <Button variant="secondary" onClick={()=>setModalShow(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={()=>handleDeleteAccount()}>Supprimer le compte</Button>
        </Modal.Footer>
      </Modal>

        </div>
    )
}