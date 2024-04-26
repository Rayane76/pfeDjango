'use client'
import "../../styles/scan.css"
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos"
import Navbar from "@/app/components/navbar/Navbar"


export default function Scan(){
    return(
        <>
          <Navbar />
          <GeneralInfos />
        </>
    )
}