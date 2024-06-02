import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Consultation from "@/app/components/doctor/consultation/Consultation";
import Modify from "@/app/components/doctor/modify/Modify";


async function getPatient(id){
  const patient = await fetch(`http://127.0.0.1:8000//api/patient/${id}`,{
    cache: "no-store"
  });

  return patient.json();
}


async function getMaladies(){
   const maladies = await fetch(`http://127.0.0.1:8000//api/maladies`);

  return maladies.json();
}


async function getMedicaments(){
   const medicaments = await fetch(`http://127.0.0.1:8000//api/medicaments`);

  return medicaments.json();
}

export default async function Patient({ params }) {

   const id = params.patient;


   const patient = await getPatient(id);

   const maladies = await getMaladies();

   const medicaments = await getMedicaments();

   console.log(patient.consultations);


  return (
    <>
      <div className="doctorView">
        <div id="generalInfos" className="generalInfos active">
           <GeneralInfos isAdmin={true} patient={patient} />
        </div>
        <div id="modify" className="modify unActive">
           <Modify patient_id={patient.id} allergies={patient.allergies} antecedents={patient.antecedents} />
        </div>
        <div id="history" className="history unActive">
           <History maladies={patient.consultations} antecedents={patient.antecedents} medicaments={medicaments} />
        </div>
        <div id="radios" className="radios unActive">
           <Radios isAdmin={true} patient_id={patient.id} radios={patient.radios} />
        </div>
        <div id="analyses" className="analyses unActive">
           <Analyses isAdmin={true} patient_id={patient.id} analyses={patient.analyses} />
        </div>
        <div id="operations" className="operations unActive">
           <Operations isAdmin={true} patient_id={patient.id} chirurgies={patient.chirurgies} />
        </div>
        <div id="consultation" className="consultation unActive">
        <Consultation patient_id={patient.id} maladies={maladies} med={medicaments} />
        </div>
      </div>
    </>
  );
}

