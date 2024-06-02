'use client'
import "../../../styles/doctor/patient/historique.css";
import HistoriqueSvg from "@/app/utils/svg/historique";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

export default function History({ maladies , antecedents }) {

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

  const uniqueCategories = [...new Set(maladies.map((maladie) => maladie.maladie.maladie_type))];
  const uniqueMedecins = [...new Set(maladies.map((maladie)=>maladie.doctor))];
  const uniqueFam = [...new Set(antecedents.map((ant)=>ant.cateogry))];


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
            {selectedMaladie != null && selectedMaladie.maladie.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{selectedMaladie != null && "Ajoute par : " + selectedMaladie.doctor}</h4>
          <h4>{selectedMaladie != null && "Date : " + selectedMaladie.date}</h4>
          <h4>{selectedMaladie != null && "Categorie : " + selectedMaladie.maladie.maladie_type}</h4>
          {selectedMaladie != null && selectedMaladie.note != "" && 
          <>
          <h4>Note : </h4>
          <p>{selectedMaladie.note}</p>
          </>
          }
          {selectedMaladie != null && selectedMaladie.medicaments.length > 0 && <>
            <h4>Ordonnance : </h4>
          <ul>
             {selectedMaladie.medicaments.map((med,index)=>{
              return(
                <li key={index}>{med.medicament} : {med.qte} comprimé(s) par jour pendant {med.duree} jours </li>
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
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.maladie.affiche === true ? "importantRow" : "normalMaladie")}>
            <label className="labelRowPers2">{maladie.maladie.name}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.doctor}</label>
            <label className="labellast">{maladie.maladie.maladie_type}</label>
          </div>
            )
            
          }) : 
           filteredCat != undefined && filteredMed === undefined ?
           maladies.map((maladie,index)=>{
            if(maladie.categorie === filteredCat){
            return(
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.maladie.affiche === true ? "importantRow" : "normalMaladie")}>
                <label className="labelRowPers2">{maladie.maladie.name}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.doctor}</label>
            <label className="labellast">{maladie.maladie.maladie_type}</label>
          </div>
            )
            }
        }) : 
            filteredCat === undefined && filteredMed != undefined ?
            maladies.map((maladie,index)=>{
            if(maladie.medecin === filteredMed){    
            return(
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.maladie.affiche === true ? "importantRow" : "normalMaladie")}>
                <label className="labelRowPers2">{maladie.maladie.name}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.doctor}</label>
            <label className="labellast">{maladie.maladie.maladie_type}</label>
          </div>
            )
            }
        }) : 
            maladies.map((maladie,index)=>{
            if(maladie.categorie === filteredCat && maladie.medecin === filteredMed){    
            return(
                <div onClick={(e)=>handleClickedMaladie(e,maladie)} key={index} className={"tableRowPersH " + (maladie.maladie.affiche === true ? "importantRow" : "normalMaladie")}>
                <label className="labelRowPers2">{maladie.maladie.name}</label>
            <label className="labelRowPers1">{maladie.date}</label>
            <label className="labelRowPers">{maladie.doctor}</label>
            <label className="labellast">{maladie.maladie.maladie_type}</label>
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
          {antecedents.map((ant,index)=>{
            if(ant.categorie === filteredCat || filteredCat === undefined){
            return(
              <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{ant.name}</label>
            <label className="labelRowFamilial1">{ant.membre}</label>
            <label className="labelRowFamilial">{ant.cateogry}</label>
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
