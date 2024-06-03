"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../../styles/doctor/patient/modify.css";
import ModifyTitleSvg from "@/app/utils/svg/modifyTitle";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosService from "@/app/helpers/axios";

export default function Modify({ patient_id , allergies , antecedents }) {
  const router = useRouter();
  const [selectedDiv, setSelectedDiv] = useState("modifyAllergies");
  const [modalShowAllergie, setModalShowAllergie] = useState(false);
  const [modalShowAnt, setModalShowAnt] = useState(false);

  const handleSwitch = (e, selected, button, otherBtn) => {
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInModify");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);
    setSelectedDiv(selected);

    if (clickedOne.classList.contains("unActive")) {
      activeOne[0].classList.add("unActive");
      activeOne[0].classList.remove("activeOneInModify");
      clickedOne.classList.remove("unActive");
      clickedOne.classList.add("activeOneInModify");

      selectedbtn.classList.toggle("activeModifyBtn");
      selectedbtn.classList.toggle("notActiveModifyBtn");

      notSelected.classList.toggle("activeModifyBtn");
      notSelected.classList.toggle("notActiveModifyBtn");
    }
  };

  const handleAdd = (e) => {
    if (selectedDiv === "modifyAllergies") {
      setModalShowAllergie(true);
    } else {
      setModalShowAnt(true);
    }
  };

  const [antecedent,setAntecedent] = useState({name:"",membre:"",cateogry:""});

  const [allergie,setAllergie] = useState({
    name: "",
    affiche: false,
  })


  
  const handleAjouterAllergie = async (e)=>{
    axiosService.post(`add_allergie/${patient_id}/`,allergie)
    .then((res) => {
      setModalShowAllergie(false);
      router.refresh();

    }).catch((err) => {
      console.log(err);
    })
    
  }

  const handleAjouterAntecedent = async (e)=>{
    
    axiosService.post(`add_antecedent/${patient_id}/`,antecedent)
    .then((res) => {
      setModalShowAnt(false);
      router.refresh();

    }).catch((err) => {
      console.log(err);
    })
  }


  
  const handleDeleteAntecedent = async (antecedentVar)=>{
    axiosService.delete(`add_antecedent/${patient_id}/`,{
      data: {
        antecedent: antecedentVar.id
      }
    })
    .then((res) => {
      setModalShowAnt(false);
      router.refresh();

    }).catch((err) => {
      console.log(err);
    })
  }

  const handleDeleteAllergie = async (allergieVar)=>{
    axiosService.delete(`add_allergie/${patient_id}/`,{
      data: {
        allergie: allergieVar.id
      }
    })
    .then((res) => {
      setModalShowAllergie(false);
      router.refresh();

    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className="modifyDiv">
      <div className="modifyDivTitleDiv">
        <div className="d-flex justify-content-center align-items-center">
          <ModifyTitleSvg />
          <h1 className="modifyDivTitle">Modifier les informations</h1>
        </div>
        <button
          onClick={(e) => handleAdd(e)}
          title="Add"
          className="cssbuttons-io-buttonR"
        >
          <svg
            className="css-btn-svg"
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
        <Modal
        show={modalShowAllergie}
        onHide={() => setModalShowAllergie(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Allergie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ajouter nouvelle allergie :</h4>
          <input
            onChange={(e)=>setAllergie((prev)=>({...prev,name:e.target.value}))}
            className="me-4"
            name="name"
            type="text"
            required
            placeholder="allergie ..."
          ></input>
          <input name="affiche" className="me-2" onChange={(e)=>setAllergie((prev)=>({...prev,affiche: e.target.checked}))} type="checkbox"></input>
          <label>Afficher sur la carte ?</label>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e)=>handleAjouterAllergie(e)}>Ajouter</Button>
          <Button variant="secondary" onClick={()=>setModalShowAllergie(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>

<Modal
      show={modalShowAnt}
      onHide={() => setModalShowAnt(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Antécédent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ajouter nouvel antécédent</h4>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex">
              <label className="me-2">Antécédent : </label>
              <input
                name="name"
                type="text"
                onChange={(e)=>setAntecedent((prev)=>({...prev,name:e.target.value}))}
                required
                placeholder="antecedent ..."
              ></input>
            </div>
            <div className="d-flex">
              <label className="me-2">Membre : </label>
              <input
                name="membre"
                onChange={(e)=>setAntecedent((prev)=>({...prev,membre:e.target.value}))}
                type="text"
                required
                placeholder="membre"
              ></input>
            </div>
            <div className="d-flex">
              <label className="me-2">Catégorie : </label>
              <input
                name="cateogry"
                onChange={(e)=>setAntecedent((prev)=>({...prev,cateogry:e.target.value}))}
                type="text"
                required
                placeholder="categorie"
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>handleAjouterAntecedent()}>Ajouter</Button>
          <Button variant="secondary" onClick={() => setModalShowAnt(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

      <div className="modifybtnsDiv">
        <button
          id="allergieBtn"
          onClick={(e) =>
            handleSwitch(e, "modifyAllergies", "allergieBtn", "antBtn")
          }
          className="modifyBtns activeModifyBtn"
        >
          Allergies
        </button>
        <button
          id="antBtn"
          onClick={(e) =>
            handleSwitch(e, "modifyAntecedents", "antBtn", "allergieBtn")
          }
          className="modifyBtns notActiveModifyBtn"
        >
          Antécédents Familiaux
        </button>
      </div>
      <div id="modifyAllergies" className="tableDivAllergie activeOneInModify">
        <div className="tableTitleDivAllergie">
          <label className="tableTitleLabel">Allergie</label>
          <label className="tableTitleLabel">Afficher sur la carte ?</label>
          <label style={{ height: "24px", width: "24px" }}></label>
        </div>
        <div className="tableRows">
         {allergies.map((allergie,index)=>{
          return(
            <div key={index} className="tableRow">
            <label className="labelRow">{allergie.name}</label>
            <label className="labelRow">{allergie.affiche.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDeleteAllergie(allergie)} />
          </div>
          )
         })}
        </div>
      </div>
      <div id="modifyAntecedents" className="tableDivAntecedents unActive">
        <div className="tableTitleDivAntecedents">
          <label className="tableTitleLabel">Antécédent</label>
          <label className="tableTitleLabel">Membre Famille</label>
          <label className="tableTitleLabel">Catégorie</label>
          <label style={{ height: "24px", width: "24px" }}></label>
        </div>
        <div className="tableRowsAnt">
         {antecedents.map((antecedent,index)=>{
          return(
            <div key={index} className="tableRow">
            <label className="labelRowAnt2">{antecedent.name}</label>
            <label className="labelRowAnt1">{antecedent.membre}</label>
            <label className="labelRowAnt">{antecedent.cateogry}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDeleteAntecedent(antecedent)} />
          </div>
          )
         })}
        </div>
      </div>
    </div>
  );
}
