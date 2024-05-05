"use client";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import AddModal from "./AddModal";



export default function Radios() {


  const radios = [
    {
      nom: "Radio1",
      date: "14-12-2018",
      type: "irm",
      categorie: "Vasculaire",
      document: "test.pdf",
      rapport: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      centre: "YAKER"
    },
    {
      nom: "Radio2",
      date: "05-11-2020",
      type: "scanner",
      categorie: "Thorax-Abdomen-Pelvis",
      document: "test.pdf",
      rapport: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
      centre: "MASSINISSA"
    },
    {
      nom: "Radio3",
      date: "12-01-2023",
      type: "radiologie",
      categorie: "Thorax-Abdomen-Pelvis",
      document: "test.pdf",
      rapport: "",
      centre: "MASSINISSA"
    }
  
  
  ];

  radios.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });

  const uniqueCategories = [...new Set(radios.map((radio) => radio.categorie))];
  const uniqueTypes = [...new Set(radios.map((radio)=>radio.type))];
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
            <h5>{selectedRadio != null && "Ajoute par : " + selectedRadio.centre}</h5>
            <h5>{selectedRadio != null && "le : " + selectedRadio.date}</h5>
            <h5>{selectedRadio != null && "Type : " + selectedRadio.type}</h5>
            <h5>{selectedRadio != null && "Categorie : " + selectedRadio.categorie}</h5>
            {selectedRadio != null && selectedRadio.rapport!="" && 
            <>
            <h5>Rapport : </h5>
            <p>{selectedRadio.rapport}</p>
            </>
            }
          </div>
          <div className="modalBodyDiv2">
          {selectedRadio != null && 
          <embed
              src={"/" + selectedRadio.document}
              type="application/pdf"
              width="100%"
              height="100%"
            />
          }
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
  
  return (
    <>
      <div className="radiosDiv">
      <div className="radiosDivTitleDiv">
        <div className="d-flex justify-content-center align-items-center">
        <DocumentSvg />
        <h1 className="radiosDivTitle">Radios</h1>
        </div>
        <button
          onClick={() => setModalShowAdd(true)}
          title="Add"
          className="cssbuttons-io-button"
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
        <AddModal modalShowAdd={modalShowAdd} setModalShowAdd={setModalShowAdd}   />
      </div>
      <div className="radiosFilterDiv">
      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterType(e)}
      // className="medecinFilter"
      id="combo-box-demo1"
      options={uniqueTypes}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />

      <Autocomplete
      disablePortal
      onChange={(e)=>handleChangeFilterCat(e)}
      id="combo-box-demo"
      options={uniqueCategories}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    />
      </div>
      <div className="allRadiosDiv">
      <div className="tableTitleDivPersonnel">
          <label className="tableTitleLabel">Nom</label>
          <label className="tableTitleLabel">Date</label>
          <label className="tableTitleLabel">Type</label>
          <label className="tableTitleLabell">Catégorie</label>
        </div>
        <div className="tableRowsPersonnel">
          { filteredCat === undefined && filteredType === undefined ?
            radios.map((radio,index)=>{
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
          }) :
          filteredCat != undefined && filteredType === undefined ?
          radios.map((radio,index)=>{
            if(radio.categorie === filteredCat){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          }) : 
          filteredCat === undefined && filteredType != undefined ?
          radios.map((radio,index)=>{
            if(radio.type === filteredType){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
          </div>
            )
            }
          }) : 
          radios.map((radio,index)=>{
            if(radio.type === filteredType && radio.categorie === filteredCat){
            return(
              <div onClick={(e)=>handleClickRadio(e,radio)} key={index} className="tableRowPers">
            <label className="labelRowPers2">{radio.nom}</label>
            <label className="labelRowPers1">{radio.date}</label>
            <label className="labelRowPers">{radio.type}</label>
            <label className="labellast">{radio.categorie}</label>
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
      </div>
    </>
  );
}
