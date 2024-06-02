'use client'
import "../../../styles/doctor/patient/historique.css";
import HistoriqueSvg from "@/app/utils/svg/historique";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import Cookies from "universal-cookie";
import axiosService from "@/app/helpers/axios";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';

export default function History({ maladies , antecedents , medicaments }) {

   maladies.sort((a, b) => {
    // Convert dates to Date objects for comparison
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });


  const router = useRouter();

  const cookies = new Cookies();

  const auth = cookies.get("auth");

  // console.log(sortedMaladies);

  const [filteredCat,setFilteredCat] = useState(undefined);
  const [filteredMed,setFilteredMed] = useState(undefined);
  const [activeDiv,setActiveDiv] = useState("historiquePersonnel");

  const isWithinThreeDaysBeforeToday = (dateVar) => {
    const today = new Date();
    const inputDate = new Date(dateVar);
  
    // Calculate the difference in days
    const diffInTime = today - inputDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24);
  
    // Check if the date is within the range of 0 to 2 days before today
    return diffInDays >= 0 && diffInDays <= 2;
  };

  
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

  const [modalEdit,setModalEdit] = useState(false);


  const handleDeleteMaladie = async () => {
    await axiosService.delete(`delete_cons/${selectedMaladie.id}/`)
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
          <Modal.Title id="titleMaladieModal">
            {selectedMaladie != null && selectedMaladie.maladie.maladie}
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
          {selectedMaladie != null && selectedMaladie.doctor_id === auth.id && selectedMaladie.maladie.affiche === true && <Button variant="primary" onClick={()=>{setModalShow(false);setModalEdit(true)}}>Modifier maladie</Button>}
          {selectedMaladie != null && isWithinThreeDaysBeforeToday(selectedMaladie.date) && selectedMaladie.doctor_id === auth.id && <Button onClick={()=>handleDeleteMaladie()} variant="danger">Supprimer maladie</Button>}
        </Modal.Footer>
      </Modal>
    );
  }

  const [maladie,setMaladie] = useState({
    id : "",
    note: "",
    affiche: false,
  medicaments: [],
})

const handleChangeMedicament = (e)=>{

  if(e.target.innerText != undefined && e.target.innerText != ""){
      const selectedMedicament = medicaments.find(med => med.name === e.target.innerText);
      const medicamentExists = maladie.medicaments.some(
          (item) => item.medicament === selectedMedicament.id
        );
        if(!medicamentExists){
      setMaladie((prev)=>({...prev,medicaments:[...prev.medicaments,{medicament: selectedMedicament.id,name:selectedMedicament.name , qte: "", duree: ""}]}))
        }
  }

}

const handleNumChange = (e,medicament)=>{
  const { name, value } = e.target;

  setMaladie((prev) => ({
    ...prev,
    medicaments: prev.medicaments.map((item) =>
      item.medicament === medicament.medicament ? { ...item, [name]: value } : item
    ),
  }));
}


  const handleClickedMaladie = (e,maladie) =>{
    setModalShow(true);
    setSelectedMaladie(maladie);
    setMaladie({
      id: maladie.maladie.id,
      note: maladie.note,
      affiche: maladie.maladie.affiche,
      medicaments: maladie.medicaments
    })
  }

  const handleDeleteAdded = (e,medicament)=>{
    setMaladie((prev) => ({
        ...prev,
        medicaments: prev.medicaments.filter(
          (med) => med.medicament !== medicament.medicament
        ),
      }));
}

const handleSave = async (e) => {
  e.preventDefault();

  const fieldToRemove = 'name';

  const updatedArray = maladie.medicaments.map(obj => {
    const { [fieldToRemove]: _, ...rest } = obj;
    return rest;
  });
  
  let consultation = {
    maladie: {
      affiche: maladie.affiche,
      id: maladie.id,
    },
    note: maladie.note,
    medicaments: updatedArray
  }

  console.log(consultation);

  axiosService.put(`update_cons/${selectedMaladie.id}/`,consultation)
  .then((res) => {
   setSelectedMaladie(null);
   setMaladie({
    id : "",
    note: "",
    affiche: false,
  medicaments: [],
});
setModalEdit(false);
   router.refresh(); 
   }).catch((err) => {
     console.log(err);
   })
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
            <label className="labelRowPers2">{maladie.maladie.maladie}</label>
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
            <label className="labelRowPers2">{maladie.maladie.maladie}</label>
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
            <label className="labelRowPers2">{maladie.maladie.maladie}</label>
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
            <label className="labelRowPers2">{maladie.maladie.maladie}</label>
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





<Modal
        show={modalEdit}
           onHide={() => setModalEdit(false)}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-vcenter">
           {selectedMaladie != null && selectedMaladie.maladie.maladie}
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
        {selectedMaladie != null && <input onChange={(e)=>setMaladie((prev)=>({...prev,affiche: e.target.checked}))}  className="ms-4 me-2" type="checkbox" checked={maladie.affiche}></input>}
        <label>Afficher sur la carte ? </label>

        <div className="ms-4 mt-4 mb-4">
         <h6>Note : </h6>
          {selectedMaladie != null &&   <textarea
        className="auto-height-textarea"
        value={maladie.note}
        name="note"
        onChange={(e)=>setMaladie((prev)=>({...prev,note: e.target.value}))}
      />
          }
         </div>

         <div className="d-flex align-items-center ms-4 mt-4">
            <h6 className="me-4">Ajouter Ordonnance : </h6>
            <div>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={medicaments.map((option) => option.name)}
      onChange={(e)=> handleChangeMedicament(e)}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Medicament" />}
    /> 
    </div>
            </div>


            {selectedMaladie != null && maladie.medicaments.length > 0 && 
            <div className="medicamentDiv">
        <div className="medicamentTitleDiv">
          <label className="tableTitleLabel">Médicament</label>
          <label className="tableTitleLabel">Comprimé/jr</label>
          <label className="tableTitleLabelF">Durée</label>
        </div>
        <div className="tableRowsMedicament mb-4">
          {maladie.medicaments.map((medicament,index)=>{
            return(
              <div key={index} className="tableRow">
            <label className="labelRowFamilial2 d-flex gap-4">
            {medicament.name}
            </label>
            <label className="labelRowFamilial1"><input onChange={(e)=>handleNumChange(e,medicament)} value={medicament.qte} name="qte" className="numInput" type="number"></input></label>
            <label className="labelRowFamilial"><input onChange={(e)=>handleNumChange(e,medicament)} value={medicament.duree} name="duree" className="numInput" type="number"></input></label>
            <DeleteIcon 
             onClick={(e)=>handleDeleteAdded(e,medicament)}
             className="deleteIcon" /> 
          </div>
            )
            
          })}
      
        </div>
      </div>
            }

         </Modal.Body>
         <Modal.Footer>
         <Button onClick={(e)=>handleSave(e)}>Enregistrer modifications</Button>
           <Button variant="secondary" onClick={()=>setModalEdit(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
    </div>
  );
}
