'use client'
import "../../../styles/superAdmin/medicaments.css"
// import "../../../styles/doctor/patient/historique.css";
import "../../../styles/doctor/patient/radios.css"
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from "@mui/icons-material/Delete";
import axiosService from "@/app/helpers/axios";
import { useRouter } from "next/navigation";





export default function MedicamentsSuperAdmin({medicaments}){

  const itemsPerPage = 50;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the current set of items to display
  const currentItems = medicaments.slice(currentIndex, currentIndex + itemsPerPage);

  // Function to show the next set of items
  const showMore = () => {
    if (currentIndex + itemsPerPage < medicaments.length) {
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

    const [modalShowAdd,setModalShowAdd] = useState(false);

    const [medicament,setMedicament] = useState({name: ""});

    const handleDelete = async (medicament) =>{
        await axiosService.delete(`medicaments/${medicament.id}/`)
        .then((res)=>{
          router.refresh()
        })
        .catch((err)=>{
           console.log(err);
        })
    }

    const handleAdd = async () => {
        await axiosService.post(`medicaments/`,medicament)
        .then((res)=>{
           setModalShowAdd(false); 
           router.refresh();
        })
        .catch((err)=>{
           console.log(err);
        })
      }


    return(
        <div className="demandesPage">

       <div className="d-flex justify-content-between mt-4 ms-4 me-4">
       <h1>Medicaments</h1>
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
      options={medicaments.map((option) => option.name)}
      autoHighlight
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Medicaments" />}
      /> 
        </div>



        <div id="analysesRealises" className="allRadiosDiv activeOneInAnalyses">
          <div className="tableTitleDivAnalyses">
            <label className="tableTitleLabel">Nom</label>
            <label className="tableTitleLabell"></label>
          </div>
          <div className="tableRowsAnalyses">
            {
              filteredCat === undefined || filteredCat === "" ?
              currentItems.map((medicament,index)=>{
              return(
              <div key={index} className="tableRowPers">
            <label style={{fontWeight:"bolder",width:"80%"}}>{medicament.name}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(medicament)} />
          </div>
              )

            })
            : 
            medicaments.map((medicament,index)=>{
              if(medicament.name === filteredCat){
                return(
                  <div key={index} style={{width:"90%"}} className="tableRowPers">
            <label className="labelRowPers2">{medicament.name}</label>
            <DeleteIcon className="labelIcon" onClick={()=>handleDelete(medicament)} />
          </div>
                )
              }
            })
            }
          </div>

          {filteredCat === undefined || filteredCat === "" ?   
          <div className="d-flex justify-content-center gap-4">
        {currentIndex > 0 && (
          <button className="btn btn-secondary" onClick={showLess}>Show Less</button>
        )}
        {currentIndex + itemsPerPage < medicaments.length && (
          <button className="btn btn-primary" onClick={showMore}>Show More</button>
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
            Medicament
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ajouter nouveau medicament : </h4>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex">
              <label className="me-2">Medicament : </label>
              <input
                name="name"
                type="text"
                onChange={(e)=>setMedicament((prev)=>({...prev,name:e.target.value}))}
                required
                placeholder="medicament ..."
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>handleAdd()}>Ajouter</Button>
          <Button variant="secondary" onClick={() => setModalShowAdd(false)}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>

        </div>
    )
}