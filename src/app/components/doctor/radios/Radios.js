"use client";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import AddDemandeeModal from "./AddDemandeeModal";
import Cookies from "universal-cookie";
import axiosService from "@/app/helpers/axios";
import { useRouter } from "next/navigation";

export default function Radios({ isAdmin , patient_id , radios }) {

  const router = useRouter();

  const cookies = new Cookies();

  const auth = cookies.get("auth");


  radios.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  const isWithinThreeDaysBeforeToday = (dateVar) => {
    const today = new Date();
    const inputDate = new Date(dateVar);
  
    // Calculate the difference in days
    const diffInTime = today - inputDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24);
  
    // Check if the date is within the range of 0 to 3 days before today
    return diffInDays >= 0 && diffInDays <= 3;
  };

  const uniqueCategories = [...new Set(radios.map((radio) => radio.demande === false && radio.radio_category))];
  const filteredArrayCats = uniqueCategories.filter(item => item !== false);



  const uniqueTypes = [...new Set(radios.map((radio)=> radio.demande === false && radio.radio_type))];
  const filteredArrayTypes = uniqueTypes.filter(item => item !== false);


  const [modalShowRadio, setModalShowRadio] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);


  const[filteredCat,setFilteredCat] = useState(undefined);
  const[filteredType,setFilteredType] = useState(undefined);
  const[selectedRadio,setSelectedRadio] = useState(null);

  const handleChangeFilterCat = (e)=>{
    setFilteredCat(e.target.innerText);
}

const handleChangeFilterType = (e)=>{
   setFilteredType(e.target.innerText);
}

const handleClickRadio = (e,radio) =>{
   setModalShowRadio(true);
   setSelectedRadio(radio);
}


const handleDeleteRadio = async () => {
  await axiosService.delete(`delete_doc/${selectedRadio.id}/`)
  .then((res)=>{
    setModalShowRadio(false);
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
      className="modalOfHistorique"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedRadio != null && selectedRadio.nom}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalDiv">
          <div className="modalBodyDiv1">
            <h5>{selectedRadio != null && "Ajoute par : " + selectedRadio.doctor}</h5>
            <h5>{selectedRadio != null && "le : " + selectedRadio.date}</h5>
            <h5>{selectedRadio != null && "Type : " + selectedRadio.radio_type}</h5>
            <h5>{selectedRadio != null && "Categorie : " + selectedRadio.radio_category}</h5>
            {selectedRadio != null && selectedRadio.note!="" && 
            <>
            <h5>Rapport : </h5>
            <p>{selectedRadio.note}</p>
            </>
            }
          </div>
          <div className="modalBodyDiv2">
          {selectedRadio != null && 
            <embed
          src={`http://127.0.0.1:8000/media/${selectedRadio.document}/`}
          type="application/pdf"
              width="100%"
              height="100%"
            />
            
          }
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Fermer</Button>
        {selectedRadio != null && isWithinThreeDaysBeforeToday(selectedRadio.date) && selectedRadio.doctor_id === auth.id && <Button onClick={()=>handleDeleteRadio()} variant="danger">Supprimer radio</Button>}
      </Modal.Footer>
    </Modal>
  );
}


const [activeDiv,setActiveDiv] = useState("realises");

  
  const handleSwitch = (e, selected, button, otherBtn) => {
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInRadios");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);
    const nvBtn = document.getElementById("nouveauBtnRadios");
    setActiveDiv(selected);
    if(isAdmin === true){
    if(selected != 'realises'){
       nvBtn.style.display = 'none'
    }
    else{
      nvBtn.style.display = 'flex';
    }
  }

    if (clickedOne.classList.contains("unActive")) {
      activeOne[0].classList.add("unActive");
      activeOne[0].classList.remove("activeOneInRadios");
      clickedOne.classList.remove("unActive");
      clickedOne.classList.add("activeOneInRadios");

      selectedbtn.classList.toggle("activeHistoriqueBtn");
      selectedbtn.classList.toggle("notActiveHistoriqueBtn");

      notSelected.classList.toggle("activeHistoriqueBtn");
      notSelected.classList.toggle("notActiveHistoriqueBtn");
      setFilteredCat(undefined);
      setFilteredType(undefined);
    }
  };

  const [modalAddDemande,setModalAddDemande] = useState(false);

  const handleAddDemandee = (e,radio) =>{
     setSelectedRadio(radio);
     setModalAddDemande(true);
  }
  



  return (
    <>
      <div className="radiosDiv">
      <div className="radiosDivTitleDiv">
        <div className="d-flex justify-content-center align-items-center">
        <DocumentSvg />
        <h1 className="radiosDivTitle">Radios</h1>
        </div>
        {isAdmin === true && 
        <button
          onClick={() => setModalShowAdd(true)}
          title="Add"
          className="cssbuttons-io-buttonR"
          id="nouveauBtnRadios"
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
        {isAdmin === true && <AddModal modalShowAdd={modalShowAdd} setModalShowAdd={setModalShowAdd} patient_id={patient_id}  />}
      </div>
      <div className="historiquebtnsDiv">
        <button
          id="realisesBtn"
          onClick={(e) =>
            handleSwitch(
              e,
              "realises",
              "realisesBtn",
              "demandesBtn"
            )
          }
          className="historiqueBtns activeHistoriqueBtn"
        >
          Realisées
        </button>
        <button
          id="demandesBtn"
          onClick={(e) =>
            handleSwitch(e, "demandes", "demandesBtn", "realisesBtn")
          }
          className="historiqueBtns notActiveHistoriqueBtn"
        >
          Demandées
        </button>
      </div>
      {activeDiv === "realises" && 
      <div className="radiosFilterDiv">
      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterType(e)}
      // className="medecinFilter"
      id="combo-box-demo1"
      options={filteredArrayTypes}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />

      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterCat(e)}
      id="combo-box-demo"
      options={filteredArrayCats}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    />
      </div>
      }

      <div id="realises" className="allRadiosDiv activeOneInRadios">
      <div className="tableTitleDivPersonnel">
          <label className="tableTitleLabel">Nom</label>
          <label className="tableTitleLabel">Date</label>
          <label className="tableTitleLabel">Type</label>
          <label className="tableTitleLabell">Catégorie</label>
        </div>
        <div className="tableRowsPersonnel">
          { filteredCat === undefined && filteredType === undefined ?
            radios.map((radio,index)=>{
            if(radio.demande === false){ 
              {/* const formattedDate = radio.date.substring(0, 10); */}
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.radio_type}</label>
            <label className="labellast">{radio.radio_category}</label>
          </div>
            )
            }
          }) :
          filteredCat != undefined && filteredType === undefined ?
          radios.map((radio,index)=>{
            if(radio.radio_category === filteredCat && radio.demande === false){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.radio_type}</label>
            <label className="labellast">{radio.radio_category}</label>
          </div>
            )
            }
          }) : 
          filteredCat === undefined && filteredType != undefined ?
          radios.map((radio,index)=>{
            if(radio.type === filteredType && radio.demande === false){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.radio_type}</label>
            <label className="labellast">{radio.radio_category}</label>
          </div>
            )
            }
          }) : 
          radios.map((radio,index)=>{
            if(radio.type === filteredType && radio.radio_category=== filteredCat && radio.demande === false){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.radio_type}</label>
            <label className="labellast">{radio.radio_category}</label>
          </div>
            )
            }
          }) 
          }
        </div>
      </div>
      
      <div id="demandes" className="allRadiosDiv unActive">
      <div className="tableTitleDivPersonnel">
          <label className="tableTitleLabel">Nom</label>
          <label className="tableTitleLabel">Date</label>
          <label className="tableTitleLabel">Type</label>
          <label className="tableTitleLabell">Catégorie</label>
        </div>
        <div className="tableRowsPersonnel">
        {radios.map((radio,index)=>{
            if(radio.demande === true){  
            return(
              <div onClick={(e)=>handleAddDemandee(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.radio_type}</label>
            <label className="labellast">{radio.radio_category}</label>
          </div>
            )
            }
          })
        }
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShowRadio}
        onHide={() => setModalShowRadio(false)}
      />
      <AddDemandeeModal modalAddDemande={modalAddDemande} patient_id={patient_id}  setModalAddDemande={setModalAddDemande}  radio={selectedRadio} />
      </div>
    </>
  );
}
