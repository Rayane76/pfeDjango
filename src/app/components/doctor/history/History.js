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
      date: "14-02-2009",
      medecin: "Dr. Bendriss Asma",
      categorie: "cardiaque",
    },
    {
      nom: "maladie2",
      date: "11-06-2012",
      medecin: "Dr. Omar Fouad",
      categorie: "renal",
    },
    {
      nom: "maladie3",
      date: "30-12-2019",
      medecin: "Dr. Bougara Ali",
      categorie: "osseuse",
    },
    {
      nom: "maladie4",
      date: "05-01-2023",
      medecin: "Dr. Djeha Hakim",
      categorie: "abcd",
    },
    {
      nom: "maladie5",
      date: "12-11-2020",
      medecin: "Dr. Assim Ahmed",
      categorie: "osseuse",
    },
  ];

  const familiaux = [
    {
    antecedent: "Cancer du colon",
    membre: "pere",
    categorie: "cardiaque"
    },
      {
      antecedent: "diabete",
      membre: "mere",
      categorie: "chronique"
      },

]

   maladies.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  // console.log(sortedMaladies);

  const [filteredCat,setFilteredCat] = useState(undefined);
  const [filteredMed,setFilteredMed] = useState(undefined);
  const [activeDiv,setActiveDiv] = useState("historiquePersonnel");

  
  const handleSwitch = (e, selected, button, otherBtn) => {
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInHistorique");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);
    setActiveDiv(selected);
    const medFilter = document.getElementsByClassName("medecinFilter");
    if(selected === "historiqueFamilial"){
      medFilter[0].classList.add("unActive");
    }
    else{
      medFilter[0].classList.remove("unActive");
    }

    if (clickedOne.classList.contains("unActive")) {
      activeOne[0].classList.add("unActive");
      activeOne[0].classList.remove("activeOneInHistorique");
      clickedOne.classList.remove("unActive");
      clickedOne.classList.add("activeOneInHistorique");

      selectedbtn.classList.toggle("activeHistoriqueBtn");
      selectedbtn.classList.toggle("notActiveHistoriqueBtn");

      notSelected.classList.toggle("activeHistoriqueBtn");
      notSelected.classList.toggle("notActiveHistoriqueBtn");
      setFilteredCat(undefined);
    }
  };

  const handleChangeFilterCat = (e)=>{
      console.log(e.target.innerText);
      setFilteredCat(e.target.innerText);
  }

  const handleChangeFilterMed = (e)=>{
     setFilteredMed(e.target.innerText);
  }

  const uniqueCategories = [...new Set(maladies.map((maladie) => maladie.categorie))];
  const uniqueMedecins = [...new Set(maladies.map((maladie)=>maladie.medecin))];
  const uniqueFam = [...new Set(familiaux.map((ant)=>ant.categorie))];


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
      {  activeDiv === "historiquePersonnel" ? 

        <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterCat(e)}
      id="combo-box-demo"
      options={uniqueCategories}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    />
         : 
          <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterCat(e)}
      id="combo-box-demo"
      options={uniqueFam}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    />
        
      }
      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterMed(e)}
      className="medecinFilter"
      id="combo-box-demo1"
      options={uniqueMedecins}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Medecin" />}
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
            maladies.map((maladie,index)=>{
            return(
                <div key={index} className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            
          }) : 
           filteredCat != undefined && filteredMed === undefined ?
           maladies.map((maladie,index)=>{
            if(maladie.categorie === filteredCat){
            return(
                <div key={index} className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            }
        }) : 
            filteredCat === undefined && filteredMed != undefined ?
            maladies.map((maladie,index)=>{
            if(maladie.medecin === filteredMed){    
            return(
                <div key={index} className="tableRowPers">
            <label className="labelRowPers2">{maladie.nom}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.medecin}</label>
            <label className="labellast">{maladie.categorie}</label>
          </div>
            )
            }
        }) : 
            maladies.map((maladie,index)=>{
            if(maladie.categorie === filteredCat && maladie.medecin === filteredMed){    
            return(
                <div key={index} className="tableRowPers">
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
          {familiaux.map((ant)=>{
            if(ant.categorie === filteredCat || filteredCat === undefined){
            return(
              <div className="tableRow">
            <label className="labelRowFamilial2">{ant.antecedent}</label>
            <label className="labelRowFamilial1">{ant.membre}</label>
            <label className="labelRowFamilial">{ant.categorie}</label>
          </div>
            )
            }
          })}
      
        </div>
      </div>
    </div>
  );
}
