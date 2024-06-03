'use client'
import axiosService from "@/app/helpers/axios"
import { useRouter } from "next/navigation"
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";



export default function QrPage({patient_id, can_demande}){

    const router = useRouter();

    const [success,setSuccess] = useState(false);


    const handleClick = async () => {
      await axiosService.post(`demande_carte/${patient_id}/`)
      .then((res)=>{
        setSuccess(true);
        router.refresh();
      }).catch((err)=>{
        console.log(err);
      })
    }


    return(
    <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}}>
    {can_demande === true && <button onClick={()=>handleClick()} className="btn btn-primary" style={{position:"absolute",top:"30px",right:"30px"}}>Demander la carte</button>}
    {success === false ? "" : <Alert style={{position:"absolute",top:"30px",right:"50px"}} icon={<CheckIcon fontSize="inherit" />} severity="success">
      Demande enregistre avec success !
    </Alert>}
       <img className="qrcodeImg" src={"http://127.0.0.1:8000/media/"+patient_id+"card.png"} alt="qrcode"></img>
    </div>
    )
}