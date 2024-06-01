'use client'
import "../../../styles/superAdmin/demandes.css"
import "../../../styles/doctor/patient/historique.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from "@mui/icons-material/Delete";
import axiosService from "@/app/helpers/axios";
import { useRouter } from "next/navigation";


export default function MaladiesSuperAdmin({maladies}){


  const itemsPerPage = 50;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the current set of items to display
  const currentItems = maladies.slice(currentIndex, currentIndex + itemsPerPage);


  // Function to show the next set of items
  const showMore = () => {
    if (currentIndex + itemsPerPage < maladies.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };
  

  // Function to show the previous set of items
  const showLess = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };


    const router = useRouter();

    const [filteredCat,setFilteredCat] = useState(undefined);

    const [filteredChronique,setFilteredChronique] = useState(undefined)

    const uniqueCategories = [...new Set(maladies.map((maladie) => maladie.maladie_type))];
  const uniqueIsChronique = ["true","false"];


  const [modalShowAdd,setModalShowAdd] = useState(false);

  const [newMaladie,setNewMaladie] = useState({
    name: "",
    maladie_type: "",
    isChronic: false, 
  })


  const handleAddMaladie = async () => {
    await axiosService.post(`maladies/`,newMaladie)
    .then((res)=>{
       setModalShowAdd(false); 
       router.refresh();
    })
    .catch((err)=>{
       console.log(err);
    })
  }


  const handleDelete = async (maladie) => {
     await axiosService.delete(`maladies/${maladie.id}`)
     .then((res)=>{
        router.refresh();
     })
     .catch((err)=>{
        console.log(err);
     })
  }

    return(
        <div className="demandesPage">

        <div className="d-flex justify-content-between mt-4 ms-4 me-4">
       <h1>Maladies</h1>
       <button
          onClick={() => setModalShowAdd(true)}
          title="Add"
          className="cssbuttons-io-button"
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
        </div>
        
        <div className="historiqueFilterDiv">
        <Autocomplete
      disablePortal
      onChange={(e)=> setFilteredCat(e.target.innerText)}
      id="combo-box-demo"
      options={uniqueCategories}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Categorie" />}
    /> 

<Autocomplete
      disablePortal
      onChange={(e)=> setFilteredChronique(e.target.innerText)}
      id="combo-box-demo"
      options={uniqueIsChronique}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Chronique" />}
    /> 
        </div>




         <div id="historiqueFamilial" className="historiqueFamilialDiv">
        <div className="tableTitleDivFamilial">
          <label className="tableTitleLabel">Maladie</label>
          <label className="tableTitleLabel">Catégorie</label>
          <label className="tableTitleLabelF">Chronique</label>
        </div>
        <div className="tableRowsFamilial">
        { (filteredCat === undefined || filteredCat === "") && (filteredChronique === undefined || filteredChronique === "") ?
          currentItems.map((maladie,index)=>{
              
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            
          }) : 
           filteredCat != undefined && (filteredChronique === undefined || filteredChronique === "") ?
           maladies.map((maladie,index)=>{
            if(maladie.maladie_type === filteredCat){
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            }
        }) : 
            (filteredCat === undefined || filteredCat === "") && filteredChronique != undefined ?
            maladies.map((maladie,index)=>{
            if(maladie.isChronic.toString() === filteredChronique){    
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            }
        }) : 
            maladies.map((maladie,index)=>{
            if(maladie.maladie_type === filteredCat && maladie.isChronic.toString() === filteredChronique){    
            return(
                <div key={index} className="tableRow">
            <label className="labelRowFamilial2">{maladie.name}</label>
            <label className="labelRowFamilial1">{maladie.maladie_type}</label>
            <label className="labelRowFamilial">{maladie.isChronic.toString()}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(maladie)} />
          </div>
            )
            }
          })
          }
      
        </div>


        {(filteredCat === undefined || filteredCat === "") && (filteredChronique === undefined || filteredChronique === "") ?   
          <div className="d-flex justify-content-center gap-4">
        {currentIndex > 0 && (
          <button onClick={showLess}>Show Less</button>
        )}
        {currentIndex + itemsPerPage < maladies.length && (
          <button onClick={showMore}>Show More</button>
        )}
      </div>
         : "" }
        </div>
        <Modal
      show={modalShowAdd}
      onHide={() => setModalShowAdd(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Maladie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ajouter nouvelle maladie</h4>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex">
              <label className="me-2">Maladie : </label>
              <input
                name="name"
                type="text"
                onChange={(e)=>setNewMaladie((prev)=>({...prev,name:e.target.value}))}
                required
                placeholder="maladie ..."
              ></input>
            </div>
            <div className="d-flex">
              <label className="me-2">Categorie : </label>
              <input
                name="maladie_type"
                onChange={(e)=>setNewMaladie((prev)=>({...prev,maladie_type:e.target.value}))}
                type="text"
                required
                placeholder="maladie_type"
              ></input>
            </div>
            <div className="d-flex">
              <label className="me-2">Chronique ? : </label>
              <input
                name="isChronic"
                onChange={(e)=>setNewMaladie((prev)=>({...prev,isChronic:e.target.checked}))}
                type="checkbox"
                required
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>handleAddMaladie()}>Ajouter</Button>
          <Button variant="secondary" onClick={() => setModalShowAdd(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}