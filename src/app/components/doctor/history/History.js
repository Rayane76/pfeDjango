"use client";
import "../../../styles/doctor/patient/historique.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HistoriqueSvg from "@/app/utils/svg/historique";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function History() {
  const maladies = [
    {
      nom: "maladie1",
      date: "14-02-2012",
      medecin: "Dr. Bendriss Asma",
      categorie: "cardiaque",
    },
    {
      nom: "maladie2",
      date: "11-06-2012",
      medecin: "Dr. Omar Fouad",
      categorie: "renal",
    },
  ];

  const [filteredCat,setFilteredCat] = useState(undefined);
  const [filteredMed,setFilteredMed] = useState(undefined);

  
  const handleSwitch = (e, selected, button, otherBtn) => {
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInHistorique");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);

    if (clickedOne.classList.contains("unActive")) {
      activeOne[0].classList.add("unActive");
      activeOne[0].classList.remove("activeOneInHistorique");
      clickedOne.classList.remove("unActive");
      clickedOne.classList.add("activeOneInHistorique");

      selectedbtn.classList.toggle("activeHistoriqueBtn");
      selectedbtn.classList.toggle("notActiveHistoriqueBtn");

      notSelected.classList.toggle("activeHistoriqueBtn");
      notSelected.classList.toggle("notActiveHistoriqueBtn");
    }
  };

  const handleChangeFilterCat = (e)=>{
      console.log(e.target.innerText);
      setFilteredCat(e.target.innerText);
  }

  const handleChangeFilterMed = (e)=>{
     setFilteredMed(e.target.innerText);
  }

  return (
    <div className="historiqueDiv">
      <div className="historiqueDivTitleDiv">
        <HistoriqueSvg />
        <h1 className="historiqueDivTitle">Historique des maladies</h1>
      </div>
      <div className="historiquebtnsDiv">
        <button
          id="personnelBtn"
          onClick={(e) =>
            handleSwitch(
              e,
              "historiquePersonnel",
              "personnelBtn",
              "familialBtn"
            )
          }
          className="historiqueBtns activeHistoriqueBtn"
        >
          Personnelles
        </button>
        <button
          id="familialBtn"
          onClick={(e) =>
            handleSwitch(e, "historiqueFamilial", "familialBtn", "personnelBtn")
          }
          className="historiqueBtns notActiveHistoriqueBtn"
        >
          Familiaux
        </button>
      </div>
      <div className="historiqueFilterDiv">
        <Autocomplete
        //   value={filteredCat}
          onChange={(e)=>handleChangeFilterCat(e)}
          disablePortal
          id="combo-box-demo"
          sx={{ width: 300 }}
          options={maladies}
          autoHighlight
          getOptionLabel={(option) => option.categorie}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.categorie}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categorie"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Autocomplete
          id="country-select-demo"
          onChange={(e)=>handleChangeFilterMed(e)}
          sx={{ width: 300 }}
          options={maladies}
          autoHighlight
          getOptionLabel={(option) => option.medecin}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.medecin}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Medecin"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </div>
      <div
        id="historiquePersonnel"
        className="historiquePersonnelDiv activeOneInHistorique"
      >
        <div className="tableTitleDivPersonnel">
          <label className="tableTitleLabel">Nom</label>
          <label className="tableTitleLabel">Date</label>
          <label className="tableTitleLabel">Ajouté par</label>
          <label className="tableTitleLabell">Catégorie</label>
        </div>
        <div className="tableRowsPersonnel">
          { filteredCat === undefined && filteredMed === undefined ?
            maladies.map((maladie)=>{
            return(
                <div className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            
          }) : 
           filteredCat != undefined && filteredMed === undefined ?
           maladies.map((maladie)=>{
            if(maladie.categorie === filteredCat){
            return(
                <div className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            }
        }) : 
            filteredCat === undefined && filteredMed != undefined ?
            maladies.map((maladie)=>{
            if(maladie.medecin === filteredMed){    
            return(
                <div className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            }
        }) : 
            maladies.map((maladie)=>{
            if(maladie.categorie === filteredCat && maladie.medecin === filteredMed){    
            return(
                <div className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            }
          })
          }
        </div>
      </div>
      <div id="historiqueFamilial" className="historiqueFamilialDiv unActive">
        <div className="tableTitleDivFamilial">
          <label className="tableTitleLabel">Antécédent</label>
          <label className="tableTitleLabel">Membre Famille</label>
          <label className="tableTitleLabelF">Catégorie</label>
        </div>
        <div className="tableRowsFamilial">
          <div className="tableRow">
            <label className="labelRowFamilial2">Cancer du côlon</label>
            <label className="labelRowFamilial1">Pere</label>
            <label className="labelRowFamilial">Cardiaque</label>
          </div>
        </div>
      </div>
    </div>
  );
}
