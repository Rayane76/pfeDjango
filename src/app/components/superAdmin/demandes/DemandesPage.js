'use client'
import "../../../styles/superAdmin/demandes.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosService from "@/app/helpers/axios";




export default function DemandesPage({ medecins , labos , centres }){

    const router = useRouter();

    const medecincolumns = [
         {
          field: 'first_name',
          headerName: 'Prenom',
          width: 150,
         },
        {
          field: 'last_name',
          headerName: 'Nom',
          width: 150,
        },
          {
            field: 'specialite',
            headerName: 'Specialite',
            width: 150,
          },
          {
            field: 'email',
            headerName: 'Email',
            width: 200,
          },
          {
            field: 'labo_number',
            headerName: 'Numero tel',
            width: 200,
          },
      ];
 

      const labocolumns = [
        {
            field: 'name',
            headerName: 'Nom',
            width: 180,
           },
           {
            field: 'address',
            headerName: 'Addresse',
            width: 200,
           },
           {
              field: 'email',
              headerName: 'Email',
              width: 200,
            },
            {
              field: 'labo_number',
              headerName: 'Numero tel',
              width: 170,
            },
      ]

      const [success,setSuccess] = useState(null);

      const [successMessage,setSuccessMessage] = useState("");

      const [selected,setSelected] = useState("medecin");

      const [modalShow,setModalShow] = useState(false);

      const [clicked,setClicked] = useState(null);


      const handleDeleteDemande = async ()=>{
         await axiosService.delete(`refuse/${clicked.id}/`)
         .then((res)=>{
          setSuccessMessage("Demande supprimee avec success")
          setSuccess(true);
          setClicked(null);
          setModalShow(false);
          router.refresh();
         }).catch((err)=>{
          setSuccessMessage("Un probleme est survenu lors de la suppression")
               setSuccess(false);
               setModalShow(false);
         })
      }

      const handleConfirmDemande = async ()=>{
            await axiosService.post(`validate/${clicked.id}/`)
            .then((res)=>{
              setSuccessMessage("Valide avec success")
              setSuccess(true);
              setClicked(null);
              setModalShow(false);
              router.refresh();
            }).catch((err)=>{
              setSuccessMessage("Un probleme est survenu lors de la validation")
              setSuccess(false);
              setModalShow(false);
            })
      }



    return(
        <div className="demandesPage">
          {success === null ? "" :
      success === true ? (
        <Alert style={{position:"absolute",top:"120px",right:"30%",zIndex:"100"}} icon={<CheckIcon fontSize="inherit" />} severity="success">
      {successMessage}.
    </Alert>
      ) : 
      (
        <Alert style={{position:"absolute",top:"120px",right:"30%",zIndex:"100"}} severity="error">{successMessage}.</Alert>
      )
      }
      
      <div className="slct">
     <label>Choisir Specialite : </label>
     <select value={selected} onChange={(e)=>setSelected(e.target.value)} name="role">
            <option value="" hidden>Choisir specialite : </option>
            <option value="medecin">Medecin</option>
            <option value="labo">Laboratoire d'analyses</option>
            <option value="centre">Centre d'imagerie</option>
          </select>
      </div>


      <div className="selectGrid">
       {selected === "medecin" ?    
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={medecins}
        getRowId={(row)=>row.id}
        columns={medecincolumns}
        onRowClick={(row)=>{setModalShow(true);setClicked(row.row)}}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    : 
    selected === "labo" ? 
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={labos}
        getRowId={(row)=>row.id}
        columns={labocolumns}
        onRowClick={(row)=>{setModalShow(true);setClicked(row.row)}}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box> : selected === "centre" ?
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={centres}
        getRowId={(row)=>row.id}
        columns={labocolumns}
        onRowClick={(row)=>{setModalShow(true);setClicked(row.row)}}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    : "" }

    </div>


    <Modal
      show={modalShow}
      onHide={() => {setModalShow(false);setClicked(null)}}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {clicked === null ? "" : selected === "medecin" ? selected + " " + clicked.specialite : selected}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {clicked === null ? "" :
        <div>
         <h6><span className='text-black fw-bold'>{selected} :</span> {selected === "medecin" ? clicked.first_name + " " + clicked.last_name : clicked.name}</h6>
         <h6><span className='text-black fw-bold'>email:</span> {clicked.email}</h6>
         <h6><span className='text-black fw-bold'>Numero tel:</span> {clicked.labo_number}</h6>
         <h6><span className='text-black fw-bold'>Address :</span> {clicked.address}</h6>
        {selected === "medecin" && <h6><span className='text-black fw-bold'>Carte_id :</span> {clicked.carte_id}</h6>}
        <img style={{width:"100%",maxWidth:"100%"}} src={"http://127.0.0.1:8000/"+ clicked.certeficat} alt="qrcode"></img>
         </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button className='me-4' variant='secondary' onClick={()=>{setModalShow(false);setClicked(null)}}>Fermer</Button>
         {clicked === null ? "" : <Button variant='danger' onClick={()=>handleDeleteDemande()}>Refuser Demande</Button>}
         {clicked === null ? "" : <Button variant='primary' onClick={()=>handleConfirmDemande()}>Valider Demande</Button>}
      </Modal.Footer>
    </Modal>








        </div>
    )
}