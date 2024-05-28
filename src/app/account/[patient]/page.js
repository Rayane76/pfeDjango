import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Modify from "@/app/components/doctor/modify/Modify";


// async function getPatient(id){
//   const patient = await fetch(`http://127.0.0.1:8000//api/patient/${id}`);

//   return patient.json();
// }

export default async function Patient({ params }) {

 

     const id = params.patient;


    //  const patient = await getPatient(id);

    //   console.log(patient)
  return (
    <>
      <div className="doctorView">
        {/* <div id="generalInfos" className="generalInfos active">
           <GeneralInfos isAdmin={true} patient={patient} />
        </div>
        <div id="modify" className="modify unActive">
           <Modify patient={patient} />
        </div>
        <div id="history" className="history unActive">
         <History patient={patient} />
        </div>
        <div id="radios" className="radios unActive">
         <Radios isAdmin={false} patient={patient}/>
        </div>
        <div id="analyses" className="analyses unActive">
          <Analyses isAdmin={false} patient={patient} />
        </div>
        <div id="operations" className="operations unActive">
         <Operations isAdmin={false} patient={patient} />
        </div> */}
      </div>
    </>
  );
}
