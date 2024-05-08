'use client'
import ConsultationTitleSvg from "@/app/utils/svg/consultationTitle"
import "../../../styles/doctor/patient/consultation.css"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Consultation(){

    const maladies = ["maladie1","maladie2","maladie3","maladie4","maladie5"];

    const medicament = ["medicament1","medicament2","medicament3","medicament4","medicament5"];

    
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1; // Month is zero-based, so we add 1
    let year = today.getFullYear();
    
    // Pad day and month with leading zeros if needed
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    
    let formattedDate = `${day}-${month}-${year}`;

    const [maladie,setMaladie] = useState({
        nom: "",
        affiche: false,
        date: formattedDate,
        medecin: "",
        note:"",
        ordonnance: []
    })

    const [demande,setDemande] = useState({
        type: "",
        categorie: "",
        nom: "",
        date: formattedDate,
        medecin: "",
    });
    

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

    const [allDemandes,setAllDemandes] = useState([]);

    const handleAddDemande = (e) => {
        if((demande.type === "radio" || demande.type === "chirurgie") && demande.categorie != "" && demande.nom != ""){
           setAllDemandes((prev)=>([...prev,demande]));
           setDemande({
            type: "",
            categorie: "",
            nom: "",
            date: formattedDate,
            medecin: "",
        })

        }else if(demande.type === "analyse" && demande.nom != ""){
            setAllDemandes((prev)=>([...prev,demande]));
            setDemande({
             type: "",
             categorie: "",
             nom: "",
             date: formattedDate,
             medecin: "",
         })
        }
    }






    const handleSave = (e) => {
       //maladie === nouvelle maladie postiha
       //alldemandes === fiha les demandes ta3 radio analyse chirurgie
       if(maladie.nom != ""){
        //hadi normalement l only required field bach t'posti
       }

       if(allDemandes.length > 0){
        //hna dir l post ta3 les demandes
       }
    }


        


    return(
        <div className='consultationDiv'>
        <div className='consultationDivTitleDiv'>
        <ConsultationTitleSvg />
        <h1 className='consultationDivTitle'>Consultation</h1>
        </div>
        <div className="consultationInfosDiv">
         <div className="d-flex align-items-center">
         <h4>Maladie : </h4>
         <Autocomplete
      disablePortal
      onChange={(e)=>setMaladie((prev)=>({...prev,nom:e.target.innerText}))}
      id="combo-box-demo"
      options={maladies}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Maladie" />}
    />
    <input onChange={(e)=>setMaladie((prev)=>({...prev,affiche: e.target.checked}))} type="checkbox"></input>
    <label>Afficher sur la carte ? </label>

         </div>
         <div className="">
         <h4>Note : </h4>
            <textarea
        className="auto-height-textarea"
        value={maladie.note}
        name="note"
        onChange={handleChange}
      />
         </div>
         <div className="addDemandeMedicamentDiv">
         <div className="addOrdonnanceDiv">
         <div className="d-flex justify-content-center align-items-center flex-column">
            <h4>Ajouter Ordonnance : </h4>
            <div>
            <Autocomplete
      disablePortal
      onChange={(e)=> handleChangeMedicament(e)}
      id="combo-box-demo"
      options={medicament}
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
        <div className="tableRowsMedicament">
          {maladie.ordonnance.map((medicament,index)=>{
            return(
              <div key={index} className="tableRow">
            <label className="labelRowFamilial2 d-flex gap-4">
            {/* <DeleteIcon 
            onClick={(e)=>handleDeleteAdded(e,medicament)}
             className="deleteIcon" /> */}
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
         <div className="addDemandeDiv">
         <div className="d-flex justify-content-center align-items-center flex-column gap-2">
           <h4>Demander Documents : </h4>
           <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
           value={demande.type}
          label="Type"
          onChange={(e)=>setDemande((prev)=>({...prev,type:e.target.value}))}
        >
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="analyse">Analyse</MenuItem>
          <MenuItem value="chirurgie">Chirurgie</MenuItem>
        </Select>
      </FormControl>
    </Box>
    {demande.type === "" ? "" :
     demande.type === "radio" ?
     <>
     <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
           value={demande.categorie}
          label="Type"
          onChange={(e)=>setDemande((prev)=>({...prev,categorie:e.target.value}))}
        >
          <MenuItem value="IRM">IRM</MenuItem>
          <MenuItem value="Scanner">Scanner</MenuItem>
          <MenuItem value="RadiologieNumerique">RadiologieNumerique</MenuItem>
          <MenuItem value="Echographie">Echographie</MenuItem>
          <MenuItem value="ImagerieDeLaFemme">ImagerieDeLaFemme</MenuItem>
          <MenuItem value="PanoramiqueDentaire">PanoramiqueDentaire</MenuItem>
          <MenuItem value="MédecineNucléaire">MédecineNucléaire</MenuItem>
          <MenuItem value="DensitométrieOsseuse">DensitométrieOsseuse</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    <div>
    <h6>Nom : </h6>
    <input name="nom" onChange={(e)=>setDemande((prev)=>({...prev,nom:e.target.value}))}></input>
    </div>
    <Button onClick={(e)=>handleAddDemande(e)}>Confirmer Demande</Button>

    </>
     : 
     demande.type === "analyse" ? 
     <>
     <div>
    <h6>Nom : </h6>
    <input name="nom" onChange={(e)=>setDemande((prev)=>({...prev,nom:e.target.value}))}></input>
    </div>
    <Button onClick={(e)=>handleAddDemande(e)}>Confirmer Demande</Button>
    </>

     : 
     demande.type === "chirurgie" ?
     <>
     <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
           value={demande.categorie}
          label="Type"
          onChange={(e)=>setDemande((prev)=>({...prev,categorie:e.target.value}))}
        >
          <MenuItem value="IRM">IRM</MenuItem>
          <MenuItem value="Scanner">Scanner</MenuItem>
          <MenuItem value="RadiologieNumerique">RadiologieNumerique</MenuItem>
          <MenuItem value="Echographie">Echographie</MenuItem>
          <MenuItem value="ImagerieDeLaFemme">ImagerieDeLaFemme</MenuItem>
          <MenuItem value="PanoramiqueDentaire">PanoramiqueDentaire</MenuItem>
          <MenuItem value="MédecineNucléaire">MédecineNucléaire</MenuItem>
          <MenuItem value="DensitométrieOsseuse">DensitométrieOsseuse</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    <div>
    <h6>Nom : </h6>
    <input name="nom" onChange={(e)=>setDemande((prev)=>({...prev,nom:e.target.value}))}></input>
    </div>
    <Button onClick={(e)=>handleAddDemande(e)}>Confirmer Demande</Button>
     </>
     :
     ""
    }
    {allDemandes.length > 0 && 
    <div>
        {allDemandes.map((demande,index)=>{
            return(
                <div className="border " key={index}>
                   <h6>Type : {demande.type}</h6>
                   {demande.categorie != "" && <h6>Categorie : {demande.categorie}</h6>}
                   <h6>Nom : {demande.nom}</h6>
                   <DeleteIcon onClick={()=>setAllDemandes((prev) => prev.filter((dem) => dem.nom !== demande.nom))} className="deleteIcon" />
                </div>
            )
        })}
    </div>
    }
           </div>
         </div>
        </div>
        
     </div>
     <div className="d-flex justify-content-center">
        <Button onClick={(e)=>handleSave(e)}>Enregistrer consultation</Button>
     </div>
     </div>
    )
}