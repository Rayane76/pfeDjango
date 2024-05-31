'use client'
import ConsultationTitleSvg from "@/app/utils/svg/consultationTitle"
import "../../../styles/doctor/patient/consultation.css"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axiosService from "@/app/helpers/axios";
import { useRouter } from 'next/navigation';
import axios from "axios";


export default function Consultation({patient_id}){

  const router = useRouter();

    const [maladie,setMaladie] = useState({
        id : "",
        note: "",
      medicaments: [],
    })

    const [maladies,setMaladies] = useState([])
    const [med , setMed] = useState([])
  //   const  med = [
  //     {
  //     id:"993cf8a0-ba30-46bb-8b74-fed94aaa1b86",
  //     name: "Doliprane"
  //     } ,
  //     {
  //       name: "Bedelix"
  //       } ,
  //       {
  //         name: "Smecta"
  //         } ,
  //         {
  //           name: "Panadol"
  //           } ,

  // ]

  

    useEffect(()=>{
      axiosService.get("maladies").then((res)=>{
        setMaladies(res.data)


    }).catch((err)=>{console.log(err)}) ;

    
      
    },[])

    useEffect(()=>{
      axiosService.get("medicaments").then((res)=>{
        setMed(res.data)})
        .catch((err)=>{console.log(err)}) ;
      
      } ,[])


    

    

    const handleChange = (e) => {
        setMaladie((prev)=>({...prev,[e.target.name]:e.target.value}));
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      };


    
    const handleChangeMedicament = (e)=>{

        if(e.target.innerText != undefined && e.target.innerText != ""){
            const selectedMedicament = med.find(med => med.name === e.target.innerText);
            const medicamentExists = maladie.medicaments.some(
                (item) => item.medicament === selectedMedicament.id
              );
              if(!medicamentExists){
            setMaladie((prev)=>({...prev,medicaments:[...prev.medicaments,{medicament: selectedMedicament.id,name:selectedMedicament.name , qte: "", duree: ""}]}))
              }
        }

    }

    const handleNumChange = (e,medicament)=>{
        const { name, value } = e.target;

        setMaladie((prev) => ({
          ...prev,
          medicaments: prev.medicaments.map((item) =>
            item.medicament === medicament.medicament ? { ...item, [name]: value } : item
          ),
        }));
    }

    const handleDeleteAdded = (e,medicament)=>{
        setMaladie((prev) => ({
            ...prev,
            medicaments: prev.medicaments.filter(
              (med) => med.medicament !== medicament.medicament
            ),
          }));
    }






    const handleSave = async (e) => {
      e.preventDefault();
      
      let consultation = {
        maladie: maladie.id,
        note: maladie.note,
        medicaments: maladie.medicaments
      }
      console.log(consultation)

      axiosService.post(`add_consultation/${patient_id}`,consultation)
      .then((res) => {
       router.refresh();
       }).catch((err) => {
         console.log(err);
       })
    }


      


    return(
        <div className='consultationDiv'>
        <div className='consultationDivTitleDiv'>
        <ConsultationTitleSvg />
        <h1 className='consultationDivTitle'>Consultation</h1>
        </div>
        <div className="consultationInfosDiv">
         <div className="d-flex align-items-center ms-4">
         <h4 className="fw-bold me-4">Maladie : </h4>
         {/* <input name="name" onChange={(e)=>handleChange(e)} placeholder="name maladie ... "></input>
         <input name="maladie_type" onChange={(e)=>handleChange(e)} placeholder="maladie_type maladie ..."></input> */}
         <Autocomplete
      disablePortal
      onChange={(event, value) => {
        const selectedMaladie = maladies.find(maladie => maladie.name === value);
        if (selectedMaladie) {
          setMaladie((prev) => ({...prev, id: selectedMaladie.id}));
        }
      }}
      id="combo-box-demo"
      options={maladies.map((option) => option.name)}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Maladie" />}
    />
    <input className="ms-4 me-2" onChange={(e)=>setMaladie((prev)=>({...prev,isChronic: e.target.checked}))} type="checkbox"></input>
    <label>Afficher sur la carte ? </label>

         </div>
         <div className="ms-4">
         <h4 className="fw-bold">Note : </h4>
            <textarea
        className="auto-height-textarea"
        value={maladie.note}
        name="note"
        onChange={(e)=>handleChange(e)}
      />
         </div>
         <div className="d-flex align-items-center ms-4 mt-4">
            <h4 className="fw-bold me-4">Ajouter Ordonnance : </h4>
            <div>
            <Autocomplete
      disablePortal
      onChange={(e)=> handleChangeMedicament(e)}
      id="combo-box-demo"
      options={med.map((option) => option.name)}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Medicament" />}
    /> 
    </div>
            </div>
            {maladie.medicaments.length > 0 && 
            <div className="medicamentDiv">
        <div className="medicamentTitleDiv">
          <label className="tableTitleLabel">Médicament</label>
          <label className="tableTitleLabel">Comprimé/jr</label>
          <label className="tableTitleLabelF">Durée</label>
        </div>
        <div className="tableRowsMedicament mb-4">
          {maladie.medicaments.map((medicament,index)=>{
            return(
              <div key={index} className="tableRow">
            <label className="labelRowFamilial2 d-flex gap-4">
            {medicament.name}
            </label>
            <label className="labelRowFamilial1"><input onChange={(e)=>handleNumChange(e,medicament)} name="qte" className="numInput" type="number"></input></label>
            <label className="labelRowFamilial"><input onChange={(e)=>handleNumChange(e,medicament)} name="duree" className="numInput" type="number"></input></label>
            <DeleteIcon 
            onClick={(e)=>handleDeleteAdded(e,medicament)}
             className="deleteIcon" /> 
          </div>
            )
            
          })}
      
        </div>
      </div>
            }
         </div>
        
     <div className="d-flex justify-content-center">
        <Button onClick={(e)=>handleSave(e)}>Enregistrer consultation</Button>
     </div>
     </div>
    )
}