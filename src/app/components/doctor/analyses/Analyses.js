"use client";
import { useState , useEffect } from "react";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalAddAnalyse from "./ModalAddAnalyse";
import AddDemandeeAnalyseModal from "./AddDemandeeAnalyseModal";
import Cookies from "universal-cookie";
import axiosService from "@/app/helpers/axios";
import { useRouter } from "next/navigation";


export default function Analyses({ isAdmin , patient_id , analyses }) {

  const router = useRouter();

  const cookies = new Cookies();

  const auth = cookies.get("auth");


  analyses.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split("-").reverse().join("-"));
    const dateB = new Date(b.date.split("-").reverse().join("-"));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  const uniqueNoms = [...new Set(analyses.map((analyse) => analyse.demande === false && analyse.nom))];
  const filteredArrayNoms = uniqueNoms.filter(item => item !== false);

  const [filteredNom, setFilteredNom] = useState(undefined);
  const [selectedAnalyse,setSelectedAnalyse] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleChangeFilterNom = (e) => {
    setFilteredNom(e.target.innerText);
  };

  const handleClickAnalyse = (e,analyse)=>{
     setModalShow(true);
     setSelectedAnalyse(analyse);
  }


  const isWithinThreeDaysBeforeToday = (dateVar) => {
    const today = new Date();
    const inputDate = new Date(dateVar);
  
    // Calculate the difference in days
    const diffInTime = today - inputDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24);
  
    // Check if the date is within the range of 0 to 3 days before today
    return diffInDays >= 0 && diffInDays <= 3;
  };



  const handleDeleteAnalyse = async () => {
    await axiosService.delete(`delete_doc/${selectedAnalyse.id}/`)
    .then((res)=>{
      setModalShow(false);
      router.refresh();
    }).catch((err)=>{
      console.log(err);
    })
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedAnalyse != null && selectedAnalyse.nom}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="analyseModalDiv">
             {selectedAnalyse != null && 
              <embed
          src={`http://127.0.0.1:8000/media/${selectedAnalyse.document}/`}
          type="application/pdf"
              width="100%"
              height="100%"
            />
             
             }
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Fermer</Button>
          {selectedAnalyse != null && isWithinThreeDaysBeforeToday(selectedAnalyse.date) && selectedAnalyse.doctor_id === auth.id && <Button onClick={()=>handleDeleteAnalyse()} variant="danger">Supprimer analyse</Button>}
        </Modal.Footer>
      </Modal>
    );
  }

  const [showModalAdd,setShowModalAdd] = useState(false);
  const [activeDiv,setActiveDiv] = useState("analysesRealises");



  const handleSwitch = (e, selected, button, otherBtn) => {
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInAnalyses");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);
    const nvBtn = document.getElementById("nouveauBtnAnalyses");
    setActiveDiv(selected);
    if(isAdmin === true){
    if(selected != 'analysesRealises'){
      nvBtn.style.display = 'none'
   }
   else{
     nvBtn.style.display = 'flex';
   }
  }

    if (clickedOne.classList.contains("unActive")) {
      activeOne[0].classList.add("unActive");
      activeOne[0].classList.remove("activeOneInAnalyses");
      clickedOne.classList.remove("unActive");
      clickedOne.classList.add("activeOneInAnalyses");

      selectedbtn.classList.toggle("activeHistoriqueBtn");
      selectedbtn.classList.toggle("notActiveHistoriqueBtn");

      notSelected.classList.toggle("activeHistoriqueBtn");
      notSelected.classList.toggle("notActiveHistoriqueBtn");
      setFilteredNom(undefined);
    }
  };

  const [modalAddDemande,setModalAddDemande] = useState(false);

  const handleAddDemandee = (e,analyse) =>{
     setSelectedAnalyse(analyse);
     setModalAddDemande(true);
  }
  


  return (
    <>
      <div className="radiosDiv">
        <div className="radiosDivTitleDiv">
          <div className="d-flex justify-content-center align-items-center">
          <DocumentSvg />
          <h1 className="radiosDivTitle">Analyses</h1>
          </div>
          {isAdmin === true && 
          <button
           onClick={() => setShowModalAdd(true)}
          title="Add"
          className="cssbuttons-io-button"
          id="nouveauBtnAnalyses"
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
        </div>
        {isAdmin === true && <ModalAddAnalyse showModalAdd={showModalAdd} setShowModalAdd={setShowModalAdd} patient_id={patient_id}/> }
        <div className="historiquebtnsDiv">
        <button
          id="realisesAnalysesBtn"
          onClick={(e) =>
            handleSwitch(
              e,
              "analysesRealises",
              "realisesAnalysesBtn",
              "demandesAnalysesBtn"
            )
          }
          className="historiqueBtns activeHistoriqueBtn"
        >
          Realisées
        </button>
        <button
          id="demandesAnalysesBtn"
          onClick={(e) =>
            handleSwitch(e, "analysesDemandes", "demandesAnalysesBtn", "realisesAnalysesBtn")
          }
          className="historiqueBtns notActiveHistoriqueBtn"
        >
          Demandées
        </button>
      </div>
        {activeDiv === "analysesRealises" && 
        <div className="analysesFilterDiv">
          <Autocomplete
            disablePortal
            onChange={(e) => handleChangeFilterNom(e)}
            id="combo-box-demo1"
            options={filteredArrayNoms}
            autoHighlight
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Nom" />}
          />
        </div>
        }
        <div id="analysesRealises" className="allRadiosDiv activeOneInAnalyses">
          <div className="tableTitleDivAnalyses">
            <label className="tableTitleLabel">Nom</label>
            <label className="tableTitleLabell">Date</label>
          </div>
          <div className="tableRowsAnalyses">
            {analyses.map((analyse,index)=>{
              if((filteredNom === analyse.nom || filteredNom === undefined) && analyse.demande === false){
              return(
              <div onClick={(e)=>handleClickAnalyse(e,analyse)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{analyse.nom}</label>
            <label className="labelRowPers1">{analyse.date}</label>
          </div>
              )
              }
            })}
          </div>
        </div>
        <div id="analysesDemandes" className="allRadiosDiv unActive">
        <div className="tableTitleDivAnalyses">
            <label className="tableTitleLabel">Nom</label>
            <label className="tableTitleLabell">Date</label>
          </div>
          <div className="tableRowsAnalyses">
          {analyses.map((analyse,index)=>{
              if(analyse.demande === true){
              return(
              <div onClick={(e)=>handleAddDemandee(e,analyse)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{analyse.nom}</label>
            <label className="labelRowPers1">{analyse.date}</label>
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
      <AddDemandeeAnalyseModal modalAddDemande={modalAddDemande} patient_id={patient_id} setModalAddDemande={setModalAddDemande}  analyse={selectedAnalyse} />
      </div>
    </>
  );
}
