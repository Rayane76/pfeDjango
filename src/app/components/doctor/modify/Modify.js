"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../../styles/doctor/patient/modify.css";
import ModifyTitleSvg from "@/app/utils/svg/modifyTitle";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export default function Modify() {
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

  const [data,setData] = useState({nom:"",affiche:false})

  const handleChange = (e) => {
    setData((prev)=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleAjouter = (e)=>{
    console.log(data);
  }

  function MyVerticallyCenteredModalAnt(props) {
    return (
      <Modal
        {...props}
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
                name="ant"
                type="text"
                required
                placeholder="antecedent ..."
              ></input>
            </div>
            <div className="d-flex">
              <label className="me-2">Membre : </label>
              <input
                name="membre"
                type="text"
                required
                placeholder="membre"
              ></input>
            </div>
            <div className="d-flex">
              <label className="me-2">Catégorie : </label>
              <input
                name="categore"
                type="text"
                required
                placeholder="categorie"
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Ajouter</Button>
          <Button variant="secondary" onClick={props.onHide}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
            onChange={(e)=>handleChange(e)}
            className="me-4"
            name="allergie"
            type="text"
            required
            placeholder="allergie ..."
          ></input>
          <input className="me-2" type="checkbox"></input>
          <label>Afficher sur la carte ?</label>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e)=>handleAjouter(e)}>Ajouter</Button>
          <Button variant="secondary" onClick={()=>setModalShowAllergie(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
        <MyVerticallyCenteredModalAnt
          show={modalShowAnt}
          onHide={() => setModalShowAnt(false)}
        />
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
          <div className="tableRow">
            <label className="labelRow">Lait</label>
            <label className="labelRow">Oui</label>
            <DeleteIcon className="labelIcon" />
          </div>
          <div className="tableRow">
            <label className="labelRow">Graines de sésame</label>
            <label className="labelRow">Non</label>
            <DeleteIcon className="labelIcon" />
          </div>
          <div className="tableRow">
            <label className="labelRow">Poisson</label>
            <label className="labelRow">Oui</label>
            <DeleteIcon className="labelIcon" />
          </div>
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
          <div className="tableRow">
            <label className="labelRowAnt2">Cancer du côlon</label>
            <label className="labelRowAnt1">Pere</label>
            <label className="labelRowAnt">Cardiaque</label>
            <DeleteIcon className="labelIcon" />
          </div>
          <div className="tableRow">
            <label className="labelRowAnt2">Cancer du côlon</label>
            <label className="labelRowAnt1">Pere</label>
            <label className="labelRowAnt">Cardiaque</label>
            <DeleteIcon className="labelIcon" />
          </div>
          <div className="tableRow">
            <label className="labelRowAnt2">Cancer du côlon</label>
            <label className="labelRowAnt1">Pere</label>
            <label className="labelRowAnt">Cardiaque</label>
            <DeleteIcon className="labelIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
