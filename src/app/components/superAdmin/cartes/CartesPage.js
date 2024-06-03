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




export default function CartesPage({demandes}){

    const router = useRouter();

    const cartescolumns = [
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
           field: 'address',
           headerName: 'Adresse',
           width: 200,
         },
         {
           field: 'numero_tel',
           headerName: 'Numero tel',
           width: 200,
         },
     ];

     const [modalShow,setModalShow] = useState(false);

     const [clicked,setClicked] = useState(null);

     const handleConfirmDemande = async ()=>{
      await axiosService.post(`donner_carte/${clicked.id}/`)
      .then((res)=>{
        setModalShow(false);
        router.refresh();
      }).catch((err)=>{
        console.log(err);
      })
  }

    return(
        <div className="demandesPage">
        <div style={{height:"100vh",display:"flex",alignItems:"center"}}>
<Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={demandes}
        getRowId={(row)=>row.id}
        columns={cartescolumns}
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
          {clicked === null ? "" : clicked.first_name + " " + clicked.last_name + " carte" }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {clicked === null ? "" :
        <div>
          <img className="qrcodeImg" src={"http://127.0.0.1:8000/media/"+clicked.id+"card.png"}></img>
         </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button className='me-4' variant='secondary' onClick={()=>{setModalShow(false);setClicked(null)}}>Fermer</Button>
         {clicked === null ? "" : <Button variant='primary' onClick={()=>handleConfirmDemande()}>Imprimer carte</Button>}
      </Modal.Footer>
    </Modal>
        </div>
    )
}