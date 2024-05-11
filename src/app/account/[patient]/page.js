'use client'
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Consultation from "@/app/components/doctor/consultation/Consultation";
import Modify from "@/app/components/doctor/modify/Modify";
import { useEffect , useState } from "react";
import axiosService from "@/app/helpers/axios";

export default function Patient({ params }) {

  const [patient,setPatient] = useState({});

     const id = params.patient;

  useEffect(() => {
    
    
    axiosService.get(`/patient/${id}`).then((res) => {
      console.log(res.data);
      setPatient(res.data);
    }).catch((err) => {
      console.log(err);
    })


  }, []);
  return (
    <>
      <div className="doctorView">
        <div id="generalInfos" className="generalInfos active">
           <GeneralInfos isAdmin={true} patient={patient} />
        </div>
        <div id="modify" className="modify unActive">
           <Modify />
        </div>
        <div id="history" className="history unActive">
         <History />
        </div>
        <div id="radios" className="radios unActive">
         <Radios isAdmin={false} patient_id={id}/>
        </div>
        <div id="analyses" className="analyses unActive">
          <Analyses isAdmin={false} patient_id={id} />
        </div>
        <div id="operations" className="operations unActive">
         <Operations isAdmin={false} patient_id={id} />
        </div>
      </div>
    </>
  );
}
