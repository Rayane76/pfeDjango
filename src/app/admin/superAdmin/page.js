import CartesPage from "@/app/components/superAdmin/cartes/CartesPage";
import "../../styles/doctor/patient/all.css"
import DemandesPage from "@/app/components/superAdmin/demandes/DemandesPage";
import MaladiesSuperAdmin from "@/app/components/superAdmin/maladies/MaladiesSuperAdmin";
import MedicamentsSuperAdmin from "@/app/components/superAdmin/medicaments/MedicamentSuperAdmin";


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



async function getDemandes(){
  const demandes = await fetch(`http://127.0.0.1:8000//api/cartes_demande/`,{
    cache:"no-store"
  });

 return demandes.json();
}
 


export default async function SuperAdmin(){


    const admins = await getAdmins();

    console.log(admins);

    const maladies = await getMaladies();

    const medicaments = await getMedicaments();

    const demandes = await getDemandes();




    return(
        <>
 <>
      <div className="doctorView">
      <div id="demandes" className="demandes active">
           <DemandesPage medecins={admins.doctors} labos={admins.labos} centres={admins.centres} />
        </div>
        <div id="cartes" className="cartes unActive">
            <CartesPage demandes={demandes}/>
        </div>
        <div id="maladies" className="maladies unActive">
             <MaladiesSuperAdmin maladies={maladies}/>
        </div>
        <div id="medicaments" className="medicaments unActive">
         <MedicamentsSuperAdmin medicaments={medicaments}/>
        </div>
      </div>
    </>
        </>
    )
}




