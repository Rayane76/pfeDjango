"use client";
import "../../../styles/doctor/patient/radios.css";
import DocumentSvg from "@/app/utils/svg/documentSvg";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddChirurgieModal from "./AddChirurgieModal";
import { useState } from "react";


export default function Operations(){

    const chirurgies = [
        {
            nom: "Chirurgie 1",
            date: "14-02-2018",
            categorie: "Vasculaire",
            rapport: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio tempor orci dapibus ultrices. Tellus id interdum velit laoreet. Et ultrices neque ornare aenean euismod elementum nisi. Non blandit massa enim nec dui. Lobortis mattis aliquam faucibus purus in massa tempor nec. Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis. Sed nisi lacus sed viverra. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat. Eget dolor morbi non arcu risus. Feugiat sed lectus vestibulum mattis ullamcorper velit. Risus pretium quam vulputate dignissim suspendisse in. Auctor urna nunc id cursus metus aliquam.",
            medecin: "DR. Bouras Ahmed"
        },
        {
            nom: "Chirurgie 2",
            date: "11-10-2020",
            categorie: "Thoracique",
            rapport: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis vel eros donec ac odio tempor orci dapibus ultrices. Tellus id interdum velit laoreet. Et ultrices neque ornare aenean euismod elementum nisi. Non blandit massa enim nec dui. Lobortis mattis aliquam faucibus purus in massa tempor nec. Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis. Sed nisi lacus sed viverra. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat. Eget dolor morbi non arcu risus. Feugiat sed lectus vestibulum mattis ullamcorper velit. Risus pretium quam vulputate dignissim suspendisse in. Auctor urna nunc id cursus metus aliquam.",
            medecin: "DR. Bekkat Said"
        },

    ]

    chirurgies.sort((a, b) => {
        // Convert dates to Date objects for comparison
        const dateA = new Date(a.date.split('-').reverse().join('-'));
        const dateB = new Date(b.date.split('-').reverse().join('-'));
        // Sort in descending order (most recent first)
        return dateB - dateA;
      });

      const uniqueCategories = [...new Set(chirurgies.map((chirurgie) => chirurgie.categorie))];

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
                  <h5>{selectedChirurgie != null && "Realisee par : " + selectedChirurgie.medecin}</h5>
                  <h5>{selectedChirurgie != null && "le : " + selectedChirurgie.date}</h5>
                  <h5>{selectedChirurgie != null && "Categorie : " + selectedChirurgie.categorie}</h5>
                  {selectedChirurgie != null && selectedChirurgie.rapport!="" && 
                  <>
                  <h5>Rapport : </h5>
                  <p>{selectedChirurgie.rapport}</p>
                  </>
                  }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }




    return(
        <div className="radiosDiv">
        <div className="radiosDivTitleDiv">
          <div className="d-flex justify-content-center align-items-center">
          <DocumentSvg />
          <h1 className="radiosDivTitle">Chirurgies</h1>
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
          <AddChirurgieModal modalShowAdd={modalShowAdd} setModalShowAdd={setModalShowAdd}   />
        </div>
        <div className="radiosFilterDiv">
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
            <label className="tableTitleLabel">Medecin</label>
            <label className="tableTitleLabell">Catégorie</label>
          </div>
          <div className="tableRowsPersonnel">
            { 
              chirurgies.map((chirurgie,index)=>{
              if(chirurgie.categorie === filteredCat || filteredCat === undefined){  
              return(
                <div onClick={(e)=>handleClickChirurgie(e,chirurgie)} key={index} className="tableRowPers">
              <label className="labelRowPers2">{chirurgie.nom}</label>
              <label className="labelRowPers1">{chirurgie.date}</label>
              <label className="labelRowPers">{chirurgie.medecin}</label>
              <label className="labellast">{chirurgie.categorie}</label>
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
        </div>

    )
}