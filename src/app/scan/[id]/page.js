'use client'
import "../../styles/scan.css"
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos"
import Navbar from "@/app/components/navbar/Navbar"
import { useEffect, useState } from "react";
import axiosService from "@/app/helpers/axios";


export default function Scan({ params }){

  
  const [patient,setPatient] = useState({});

     const id = params.id;

  useEffect(() => {
    
    
    axiosService.get(`/patient/${id}`).then((res) => {
      console.log(res.data);
      setPatient(res.data);
    }).catch((err) => {
      console.log(err);
    })

  }, []);



    return(
        <>
          <Navbar />
          <GeneralInfos isAdmin={false} patient={patient} />
        </>
    )
}