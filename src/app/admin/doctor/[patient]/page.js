'use client'
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Consultation from "@/app/components/doctor/consultation/Consultation";
import Modify from "@/app/components/doctor/modify/Modify";

export default function Patient() {
  return (
    <>
      <div className="doctorView">
        <div id="generalInfos" className="generalInfos active">
           <GeneralInfos />
        </div>
        <div id="modify" className="modify unActive">
           <Modify />
        </div>
        <div id="history" className="history unActive">
         <History />
        </div>
        <div id="radios" className="radios unActive">
         <Radios />
        </div>
        <div id="analyses" className="analyses unActive">
          <Analyses />
        </div>
        <div id="operations" className="operations unActive">
         <Operations />
        </div>
        <div id="consultation" className="consultation unActive">
         <Consultation />
        </div>
      </div>
    </>
  );
}
