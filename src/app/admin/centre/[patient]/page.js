import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Modify from "@/app/components/doctor/modify/Modify";

async function getPatient(id){
  const patient = await fetch(`${process.env.WEBSITE_URL}/api/users/patient/getPatient?id=${id}`);

  return patient.json();
}



export default async function Patient({ params }) {

  const id = params.patient;


   const patient = await getPatient(id);

    console.log(patient)


  return (
    <>
      <div className="doctorView">
        <div id="generalInfos" className="generalInfos active">
           <GeneralInfos isAdmin={true} patient={patient.data} />
        </div>
        <div id="modify" className="modify unActive">
           <Modify patient_id={patient.data._id} allergies={patient.data.allergies} antecedents={patient.data.antecedents} />
        </div>
        <div id="history" className="history unActive">
         <History maladies={patient.data.maladies} antecedents={patient.data.antecedents} />
        </div>
        <div id="radios" className="radios unActive">
         <Radios isAdmin={true} patient_id={patient.data._id} radios={patient.data.radios} />
        </div>
        <div id="analyses" className="analyses unActive">
          <Analyses isAdmin={false} patient_id={patient.data._id} analyses={patient.data.analyses} />
        </div>
        <div id="operations" className="operations unActive">
         <Operations isAdmin={false} patient_id={patient.data._id} chirurgies={patient.data.chirurgies} />
        </div>
      </div>
    </>
  );
}
