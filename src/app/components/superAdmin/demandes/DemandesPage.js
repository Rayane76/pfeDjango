'use client'
import "../../../styles/superAdmin/demandes.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';




export default function DemandesPage({ medecins , labos , centres }){

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
            field: 'numero_tel',
            headerName: 'Numero tel',
            width: 200,
          },
          {
            field: 'createdAt',
            headerName: 'Date',
            width: 110,
          },
      ];
 

      const labocolumns = [
        {
            field: 'nom',
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
              field: 'numero_tel',
              headerName: 'Numero tel',
              width: 170,
            },
            {
              field: 'createdAt',
              headerName: 'Date',
              width: 110,
            },
      ]

      const [success,setSuccess] = useState(null);

      const [successMessage,setSuccessMessage] = useState("");

      const [selected,setSelected] = useState("medecin");



    return(
        <div className="demandesPage">
          {success === null ? "" :
      success === true ? (
        <Alert style={{position:"absolute",top:"75px",right:"40%",zIndex:"100"}} icon={<CheckIcon fontSize="inherit" />} severity="success">
      {successMessage}.
    </Alert>
      ) : 
      (
        <Alert style={{position:"absolute",top:"75px",right:"40%",zIndex:"100"}} severity="error">{successMessage}.</Alert>
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
        getRowId={(row)=>row._id}
        columns={medecincolumns}
        // onRowClick={(row)=>{setModalShow(true);setArticles(row.row)}}
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
        getRowId={(row)=>row._id}
        columns={labocolumns}
        // onRowClick={(row)=>{setModalShow(true);setArticles(row.row)}}
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
        getRowId={(row)=>row._id}
        columns={labocolumns}
        // onRowClick={(row)=>{setModalShow(true);setArticles(row.row)}}
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
        </div>
    )
}