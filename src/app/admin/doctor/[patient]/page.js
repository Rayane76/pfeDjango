'use client'
import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../../styles/doctor/patient/all.css"

export default function Patient() {
  return (
    <>
      <div style={{ marginLeft: "275px" }}>
        <div id="generalInfos" className="generalInfos active">
           <GeneralInfos />
        </div>
        <div id="radios" className="radios unActive">
         <h1>Radios</h1>
        </div>
        <div id="analyses" className="analyses unActive">
          <h1>Analyses</h1>
        </div>
        <div id="operations" className="operations unActive">
         <h1>Operations</h1>
        </div>
        <div id="consultation" className="consultation unActive">
         <h1>Consultation</h1>
        </div>
      </div>
    </>
  );
}
