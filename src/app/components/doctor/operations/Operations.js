"use client";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddChirurgieModal from "./AddChirurgieModal";
import AddDemandeChirModal from "./AddDemandeChirModal";
import { useState } from "react";


export default function Operations({ isAdmin , patient_id , chirurgies }){

    chirurgies.sort((a, b) => {
        // Convert dates to Date objects for comparison
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        // Sort in descending order (most recent first)
        return dateB - dateA;
      });

      const uniqueCategories = [...new Set(chirurgies.map((chirurgie) => chirurgie.demande === false && chirurgie.radio_category))];
      const filteredArrayCategories = uniqueCategories.filter(item => item !== false);

      const [modalShowChirurgie, setModalShowChirurgie] = useState(false);
      const [modalShowAdd, setModalShowAdd] = useState(false);
      const [filteredCat,setFilteredCat] = useState(undefined);
      const[selectedChirurgie,setSelectedChirurgie] = useState(null);

      const handleChangeFilterCat = (e)=>{
        setFilteredCat(e.target.innerText);
    }

    const handleClickChirurgie = (e,chirurgie) =>{
        setModalShowChirurgie(true);
        setSelectedChirurgie(chirurgie);
     }

     function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modalOfHistorique"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {selectedChirurgie != null && selectedChirurgie.nom}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <h5>{selectedChirurgie != null && "Realisee par : " + selectedChirurgie.doctor}</h5>
                  <h5>{selectedChirurgie != null && "le : " + selectedChirurgie.date}</h5>
                  <h5>{selectedChirurgie != null && "Categorie : " + selectedChirurgie.radio_category}</h5>
                  {selectedChirurgie != null && selectedChirurgie.note!="" && 
                  <>
                  <h5>Rapport : </h5>
                  <p>{selectedChirurgie.note}</p>
                  </>
                  }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      const [activeDiv,setActiveDiv] = useState("chirRealises");

      const handleSwitch = (e, selected, button, otherBtn) => {
        e.preventDefault();
        const clickedOne = document.getElementById(selected);
        const activeOne = document.getElementsByClassName("activeOneInChirurgies");
        const selectedbtn = document.getElementById(button);
        const notSelected = document.getElementById(otherBtn);
        const nvBtn = document.getElementById("nouveauBtnChir");
        setActiveDiv(selected);
        if(isAdmin === true){
        if(selected != 'chirRealises'){
          nvBtn.style.display = 'none'
       }
       else{
         nvBtn.style.display = 'flex';
       }
      }
    
        if (clickedOne.classList.contains("unActive")) {
          activeOne[0].classList.add("unActive");
          activeOne[0].classList.remove("activeOneInChirurgies");
          clickedOne.classList.remove("unActive");
          clickedOne.classList.add("activeOneInChirurgies");
    
          selectedbtn.classList.toggle("activeHistoriqueBtn");
          selectedbtn.classList.toggle("notActiveHistoriqueBtn");
    
          notSelected.classList.toggle("activeHistoriqueBtn");
          notSelected.classList.toggle("notActiveHistoriqueBtn");
          setFilteredCat(undefined);
        }
      };

      const [modalAddDemande,setModalAddDemande] = useState(false);

      const handleAddDemandee = (e,chirurgie) =>{
         setSelectedChirurgie(chirurgie);
         setModalAddDemande(true);
      }
      


    return(
        <div className="radiosDiv">
        <div className="radiosDivTitleDiv">
          <div className="d-flex justify-content-center align-items-center">
          <DocumentSvg />
          <h1 className="radiosDivTitle">Chirurgies</h1>
          </div>
          {isAdmin === true && 
          <button
            onClick={() => setModalShowAdd(true)}
            title="Add"
            className="cssbuttons-io-button"
            id="nouveauBtnChir"
          >
            <svg
              height="25"
              width="25"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Nouveau</span>
          </button>
          }
          {isAdmin === true && <AddChirurgieModal modalShowAdd={modalShowAdd} setModalShowAdd={setModalShowAdd} patient_id={patient_id}  /> }
        </div>
        <div className="historiquebtnsDiv">
        <button
          id="realisesChirBtn"
          onClick={(e) =>
            handleSwitch(
              e,
              "chirRealises",
              "realisesChirBtn",
              "demandesChirBtn"
            )
          }
          className="historiqueBtns activeHistoriqueBtn"
        >
          Realisées
        </button>
        <button
          id="demandesChirBtn"
          onClick={(e) =>
            handleSwitch(e, "chirDemandes", "demandesChirBtn", "realisesChirBtn")
          }
          className="historiqueBtns notActiveHistoriqueBtn"
        >
          Demandées
        </button>
      </div>
      {activeDiv === "chirRealises" && 
        <div className="radiosFilterDiv">
        <Autocomplete
        disablePortal
        onChange={(e)=>handleChangeFilterCat(e)}
        id="combo-box-demo"
        options={filteredArrayCategories}
        autoHighlight
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Categorie" />}
      />
        </div>
      }
        <div id="chirRealises" className="allRadiosDiv activeOneInChirurgies">
        <div className="tableTitleDivPersonnel">
            <label className="tableTitleLabel">Nom</label>
            <label className="tableTitleLabel">Date</label>
            <label className="tableTitleLabel">Medecin</label>
            <label className="tableTitleLabell">Catégorie</label>
          </div>
          <div className="tableRowsPersonnel">
            { 
              chirurgies.map((chirurgie,index)=>{
              if((chirurgie.radio_category === filteredCat || filteredCat === undefined) && chirurgie.demande === false){  
              return(
                <div onClick={(e)=>handleClickChirurgie(e,chirurgie)} key={index} className="tableRowPers">
              <label className="labelRowPers2">{chirurgie.nom}</label>
              <label className="labelRowPers1">{chirurgie.date}</label>
              <label className="labelRowPers">{chirurgie.doctor}</label>
              <label className="labellast">{chirurgie.radio_category}</label>
            </div>
              )
              }
            }) 
            }
          </div>
        </div>
        <div id="chirDemandes" className="allRadiosDiv unActive">
        <div className="tableTitleDivPersonnel">
            <label className="tableTitleLabel">Nom</label>
            <label className="tableTitleLabel">Date</label>
            <label className="tableTitleLabel">Medecin</label>
            <label className="tableTitleLabell">Catégorie</label>
          </div>
          <div className="tableRowsPersonnel">
          { 
              chirurgies.map((chirurgie,index)=>{
              if(chirurgie.demande === true){  
              return(
                <div onClick={(e)=>handleAddDemandee(e,chirurgie)} key={index} className="tableRowPers">
              <label className="labelRowPers2">{chirurgie.nom}</label>
              <label className="labelRowPers1">{chirurgie.date}</label>
              <label className="labelRowPers">{chirurgie.doctor}</label>
              <label className="labellast">{chirurgie.radio_category}</label>
            </div>
              )
              }
            }) 
            }
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={modalShowChirurgie}
          onHide={() => setModalShowChirurgie(false)}
        />
        <AddDemandeChirModal modalAddDemande={modalAddDemande} patient_id={patient_id}  setModalAddDemande={setModalAddDemande}  chirurgie={selectedChirurgie} />
        </div>

    )
}