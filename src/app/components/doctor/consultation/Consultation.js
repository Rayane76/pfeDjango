'use client'
import ConsultationTitleSvg from "@/app/utils/svg/consultationTitle"
import "../../../styles/doctor/patient/consultation.css"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axiosService from "@/app/helpers/axios";


export default function Consultation(){


    const [maladies,setMaladies] = useState([])
    const [medicaments,setMedicaments] = useState([])

    useEffect(()=>{
      axiosService.get("/maladies").then((res)=>{
        setMaladies(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    },[])


    useEffect(()=>{
      axiosService.get("/medicaments").then((res)=>{

        setMedicaments(res.data);
      }).catch((err)=>{
        console.log(err);
      })


    },[])

    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1; // Month is zero-based, so we add 1
    let year = today.getFullYear();
    
    // Pad day and month with leading zeros if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    
    let formattedDate = `${day}-${month}-${year}`;

    const [maladie,setMaladie] = useState({
        id: [],
        affiche: false,
        note:"",
        ordonnance: []
    })
    

    const handleChange = (e) => {
        setMaladie((prev)=>({...prev,[e.target.name]:e.target.value}));
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      };

      useEffect(()=>{
         console.log(maladie);
      },[maladie])
    
    const handleChangeMedicament = (e)=>{
        if(e.target.innerText != undefined && e.target.innerText != ""){ 
            const medicamentExists = maladie.ordonnance.some(
                (item) => item.medicament === e.target.innerText
              );
              if(!medicamentExists){
            setMaladie((prev)=>({...prev,ordonnance:[...prev.ordonnance,{medicament: e.target.innerText , ratio: "", duree: ""}]}))
              }
        }

    }

    const handleNumChange = (e,medicament)=>{
        const { name, value } = e.target;

        setMaladie((prev) => ({
          ...prev,
          ordonnance: prev.ordonnance.map((item) =>
            item.medicament === medicament.medicament ? { ...item, [name]: value } : item
          ),
        }));
    }

    const handleDeleteAdded = (e,medicament)=>{
        setMaladie((prev) => ({
            ...prev,
            ordonnance: prev.ordonnance.filter(
              (med) => med.medicament !== medicament.medicament
            ),
          }));
    }






    const handleSave = (e) => {
       //maladie === nouvelle maladie postiha
       if(maladie.nom != ""){
        //hadi normalement l only required field bach t'posti
       }
    }


      const  med = [
          {
          name: "Doliprane"
          } ,
          {
            name: "Bedelix"
            } ,
            {
              name: "Smecta"
              } ,
              {
                name: "Panadol"
                } ,

      
      ]


    return(
        <div className='consultationDiv'>
        <div className='consultationDivTitleDiv'>
        <ConsultationTitleSvg />
        <h1 className='consultationDivTitle'>Consultation</h1>
        </div>
        <div className="consultationInfosDiv">
         <div className="d-flex align-items-center ms-4">
         <h4 className="fw-bold me-4">Maladie : </h4>
         <Autocomplete
      disablePortal
      onChange={(e)=>setMaladie((prev)=>({...prev,nom:e.target.innerText}))}
      id="combo-box-demo"
      options={maladies.map((option) => option.name)}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Maladie" />}
    />
    <input className="ms-4 me-2" onChange={(e)=>setMaladie((prev)=>({...prev,affiche: e.target.checked}))} type="checkbox"></input>
    <label>Afficher sur la carte ? </label>

         </div>
         <div className="ms-4">
         <h4 className="fw-bold">Note : </h4>
            <textarea
        className="auto-height-textarea"
        value={maladie.note}
        name="note"
        onChange={handleChange}
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
            {maladie.ordonnance.length > 0 && 
            <div className="medicamentDiv">
        <div className="medicamentTitleDiv">
          <label className="tableTitleLabel">Médicament</label>
          <label className="tableTitleLabel">Comprimé/jr</label>
          <label className="tableTitleLabelF">Durée</label>
        </div>
        <div className="tableRowsMedicament mb-4">
          {maladie.ordonnance.map((medicament,index)=>{
            return(
              <div key={index} className="tableRow">
            <label className="labelRowFamilial2 d-flex gap-4">
            {medicament.medicament}
            </label>
            <label className="labelRowFamilial1"><input onChange={(e)=>handleNumChange(e,medicament)} name="ratio" className="numInput" type="number"></input></label>
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