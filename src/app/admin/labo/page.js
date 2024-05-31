'use client'
import { useRouter } from "next/navigation";
import "../../styles/doctor/home.css";
import { useState } from "react";

export default function Labo() {

  const router = useRouter();

  const [matricule,setMatricule] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    router.push("/admin/doctor/" + matricule);
    // const patient = await axios.post("/api/users/patient/findPatient",{carte: matricule})
    // .then((res)=>{
    //   if(res.data.success === true){
    //     router.push("/admin/doctor/" + res.data.id)
    //   }
    //   else{
    //     console.log(res.data.message)
    //   }
    // }).catch((err)=>{
    //   console.log(err);
    // })

  }

  return (
    <>
      <div>
        <div className="homeDiv">
          <form onSubmit={(e)=>handleSubmit(e)}>
          <label>
            Entrer Matricule du patient : 
          </label>
          <input onChange={(e)=>setMatricule(e.target.value)} placeholder="matricule ..." required></input>
          </form>

        </div>
      </div>
    </>
  );

}