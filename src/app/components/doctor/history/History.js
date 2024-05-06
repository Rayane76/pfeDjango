"use client";
import "../../../styles/doctor/patient/historique.css";
import HistoriqueSvg from "@/app/utils/svg/historique";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

export default function History() {
  const maladies = [
    {
      id: "1",
      affiche: false,
      nom: "maladie1",
      date: "14-02-2009",
      medecin: "Dr. Bendriss Asma",
      categorie: "cardiaque",
      note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      ordonnance: [
        {
          medicament: "Medicament 1",
          ratio: "2/jr",
          duree: "7 jours",
        },
        {
          medicament: "Medicament 2",
          ratio: "2/jr",
          duree: "10 jours",
        },
        {
          medicament: "Medicament 3",
          ratio: "1/jr",
          duree: "3 jours",
        }

      ]
    },
    {
      id: "2",
      nom: "maladie2",
      affiche: true,
      date: "11-06-2012",
      medecin: "Dr. Omar Fouad",
      categorie: "renal",
      note: "Note maladie 2",
      ordonnance: [
        {
          medicament: "Medicament 1",
          ratio: "2/jr",
          duree: "7 jours",
        },
        {
          medicament: "Medicament 2",
          ratio: "2/jr",
          duree: "10 jours",
        },
      ]
    },
    {
      id: "3",
      nom: "maladie3",
      affiche: false,
      date: "30-12-2019",
      medecin: "Dr. Bougara Ali",
      categorie: "osseuse",
      note: "",
      ordonnance: [],
    },
    {
      id: "4",
      nom: "maladie4",
      affiche: true,
      date: "05-01-2023",
      medecin: "Dr. Djeha Hakim",
      categorie: "abcd",
      note: "Note maladie 4",
      ordonnance: [],
    },
    {
      id: "5",
      affiche: false,
      nom: "maladie5",
      date: "12-11-2020",
      medecin: "Dr. Assim Ahmed",
      categorie: "osseuse",
      note: "",
      ordonnance: [
        {
          medicament: "Medicament 1",
          ratio: "2/jr",
          duree: "5 jours",
        },
        {
          medicament: "Medicament 2",
          ratio: "2/jr",
          duree: "10 jours",
        },
      ],
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
      setFilteredCat(e.target.innerText);
  }

  const handleChangeFilterMed = (e)=>{
     setFilteredMed(e.target.innerText);
  }

  const uniqueCategories = [...new Set(maladies.map((maladie) => maladie.categorie))];
  const uniqueMedecins = [...new Set(maladies.map((maladie)=>maladie.medecin))];
  const uniqueFam = [...new Set(familiaux.map((ant)=>ant.categorie))];


  const [modalShow, setModalShow] = useState(false);
  const [selectedMaladie,setSelectedMaladie] = useState(null);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="titleMaladieModal">
            {selectedMaladie != null && selectedMaladie.nom}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{selectedMaladie != null && "Ajoute par : " + selectedMaladie.medecin}</h4>
          <h4>{selectedMaladie != null && "Date : " + selectedMaladie.date}</h4>
          <h4>{selectedMaladie != null && "Categorie : " + selectedMaladie.categorie}</h4>
          {selectedMaladie != null && selectedMaladie.note != "" && 
          <>
          <h4>Note : </h4>
          <p>{selectedMaladie.note}</p>
          </>
          }
          {selectedMaladie != null && selectedMaladie.ordonnance.length > 0 && <>
            <h4>Ordonnance : </h4>
          <ul>
             {selectedMaladie.ordonnance.map((med,index)=>{
              return(
                <li key={index}>{med.medicament} : {med.ratio} pendant {med.duree} </li>
              )
             })}
          </ul>
          </>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  const handleClickedMaladie = (e,maladie) =>{
    setModalShow(true);
    setSelectedMaladie(maladie);
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
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.affiche === true ? "importantRow" : "normalMaladie")}>
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
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.affiche === true ? "importantRow" : "normalMaladie")}>
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
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.affiche === true ? "importantRow" : "normalMaladie")}>
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
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.affiche === true ? "importantRow" : "normalMaladie")}>
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
          {familiaux.map((ant,index)=>{
            if(ant.categorie === filteredCat || filteredCat === undefined){
            return(
              <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{ant.antecedent}</label>
            <label className="labelRowFamilial1">{ant.membre}</label>
            <label className="labelRowFamilial">{ant.categorie}</label>
          </div>
            )
            }
          })}
      
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
