import "../../styles/doctor/patient/all.css"
import DemandesPage from "@/app/components/superAdmin/demandes/DemandesPage";
import MaladiesSuperAdmin from "@/app/components/superAdmin/maladies/MaladiesSuperAdmin";



async function getAdmins(){
    const admins = await fetch("http://127.0.0.1:8000//api/non_valide/",{
        cache:"no-store"
    });
  
    return admins.json();
  }

  async function getMaladies(){
    const maladies = await fetch(`http://127.0.0.1:8000//api/maladies`,{
      cache:"no-store"
    });
 
   return maladies.json();
 }
 
 
 async function getMedicaments(){
    const medicaments = await fetch(`http://127.0.0.1:8000//api/medicaments`,{
      cache:"no-store"
    });
 
   return medicaments.json();
 }


export default async function SuperAdmin(){


    const admins = await getAdmins();

    const maladies = await getMaladies();

    const medicaments = await getMedicaments();


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
             <MaladiesSuperAdmin maladies={maladies}/>
        </div>
      </div>
    </>
        </>
    )
}




