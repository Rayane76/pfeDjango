import GeneralInfos from "@/app/components/doctor/generalInfos/GeneralInfos";
import "../../styles/doctor/patient/all.css"
import Radios from "@/app/components/doctor/radios/Radios";
import Analyses from "@/app/components/doctor/analyses/Analyses";
import History from "@/app/components/doctor/history/History";
import Operations from "@/app/components/doctor/operations/Operations";
import Modify from "@/app/components/doctor/modify/Modify";
import DemandesPage from "@/app/components/superAdmin/demandes/DemandesPage";



async function getAdmins(){
    const admins = await fetch("http://127.0.0.1:8000//api/non_valide/",{
        cache:"no-store"
    });
  
    return admins.json();
  }

export default async function SuperAdmin(){


    const admins = await getAdmins();


    return(
        <>
 <>
      <div className="doctorView">
      <div id="demandes" className="demandes active">
           <DemandesPage medecins={admins.doctors} labos={admins.labos} centres={admins.centres} />
        </div>
        <div id="medicaments" className="medicaments unActive">
             <div>
               Medicaments
             </div>
        </div>
        <div id="maladies" className="maladies unActive">
             <div>
               Maladies
             </div>
        </div>
        <div id="allergies" className="allergies unActive">
             <div>
               Allergies
             </div>
        </div>
        <div id="documents" className="documents unActive">
             <div>
               Documents
             </div>
        </div>
      </div>
    </>
        </>
    )
}




