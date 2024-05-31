'use client'
import "../../../styles/superAdmin/demandes.css"
import "../../../styles/doctor/patient/historique.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from "@mui/icons-material/Delete";


export default function MaladiesSuperAdmin({maladies}){

    const [filteredCat,setFilteredCat] = useState(undefined);

    const [filteredChronique,setFilteredChronique] = useState(undefined)

    const uniqueCategories = [...new Set(maladies.map((maladie) => maladie.maladie_type))];
  const uniqueIsChronique = ["true","false"];


  const handleDelete = (maladie) => {
    
  }

    return(
        <div className="demandesPage">
        
        <div className="historiqueFilterDiv">
        <Autocomplete
      disablePortal
      onChange={(e)=> setFilteredCat(e.target.innerText)}
      id="combo-box-demo"
      options={uniqueCategories}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    /> 

<Autocomplete
      disablePortal
      onChange={(e)=> setFilteredChronique(e.target.innerText)}
      id="combo-box-demo"
      options={uniqueIsChronique}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Chronique" />}
    /> 
        </div>




         <div id="historiqueFamilial" className="historiqueFamilialDiv">
        <div className="tableTitleDivFamilial">
          <label className="tableTitleLabel">Maladie</label>
          <label className="tableTitleLabel">Catégorie</label>
          <label className="tableTitleLabelF">Chronique</label>
        </div>
        <div className="tableRowsFamilial">
        { filteredCat === undefined && filteredChronique === undefined ?
            maladies.map((maladie,index)=>{
              
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            
          }) : 
           filteredCat != undefined && filteredChronique === undefined ?
           maladies.map((maladie,index)=>{
            if(maladie.maladie_type === filteredCat){
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            }
        }) : 
            filteredCat === undefined && filteredChronique != undefined ?
            maladies.map((maladie,index)=>{
            if(maladie.isChronic.toString() === filteredChronique){    
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            }
        }) : 
            maladies.map((maladie,index)=>{
            if(maladie.maladie_type === filteredCat && maladie.isChronic.toString() === filteredChronique){    
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            }
          })
          }
      
        </div>
        </div>
        </div>
    )
}