'use client'
import DeleteIcon from "@mui/icons-material/Delete";
import "../../../styles/doctor/patient/modify.css";
import ModifyTitleSvg from "@/app/utils/svg/modifyTitle";

export default function Modify() {


   const handleSwitch = (e,selected,button,otherBtn)=>{
    e.preventDefault();
    const clickedOne = document.getElementById(selected);
    const activeOne = document.getElementsByClassName("activeOneInModify");
    const selectedbtn = document.getElementById(button);
    const notSelected = document.getElementById(otherBtn);

    if(clickedOne.classList.contains("unActive")){
        activeOne[0].classList.add("unActive");
        activeOne[0].classList.remove("activeOneInModify");
        clickedOne.classList.remove("unActive");
        clickedOne.classList.add("activeOneInModify");
        
        selectedbtn.classList.toggle("activeModifyBtn");
        selectedbtn.classList.toggle("notActiveModifyBtn");
        
        notSelected.classList.toggle("activeModifyBtn");
        notSelected.classList.toggle("notActiveModifyBtn");

    }
   }


  return (
    <div className="modifyDiv">
      <div className="modifyDivTitleDiv">
        <ModifyTitleSvg />
        <h1 className="modifyDivTitle">Modifier les informations</h1>
      </div>

      <div className="modifybtnsDiv">
        <button id="allergieBtn" onClick={(e)=>handleSwitch(e,"modifyAllergies","allergieBtn","antBtn")} className="modifyBtns activeModifyBtn">Allergies</button>
        <button id="antBtn" onClick={(e)=>handleSwitch(e,"modifyAntecedents","antBtn","allergieBtn")} className="modifyBtns notActiveModifyBtn">
          Antécédents Familiaux
        </button>
      </div>
      <div id="modifyAllergies" className="tableDivAllergie activeOneInModify">
        <div className="tableTitleDivAllergie">
          <label className="tableTitleLabel">Allergie</label>
          <label className="tableTitleLabel">Afficher sur la carte ?</label>
          <label style={{height:"24px",width:"24px"}}></label>
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
          <label style={{height:"24px",width:"24px"}}></label>
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
