import "../../styles/scan.css"
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos"
import Navbar from "@/app/components/navbar/Navbar"




async function getPatient(id){
  const patient = await fetch(`http://127.0.0.1:8000//api/patient/card/${id}`,{
    cache: "no-store"
  })

  return patient.json();
}


export default async function Scan({ params }){

     const id = params.id;
     
    const patient = await getPatient(id);


    return(
        <>
          <GeneralInfos isAdmin={false} patient={patient} />
        </>
    )
}