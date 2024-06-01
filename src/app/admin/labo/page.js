'use client'
import { useRouter } from "next/navigation";
import "../../styles/doctor/home.css";
import { useState } from "react";

export default function Labo() {

  const router = useRouter();

  const [matricule,setMatricule] = useState("");


  const handleSubmit = async (e)=>{
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/exist/",{
        carte_id: matricule
    }).then((res)=>{
       if(res.data.exist === true){
         router.push("/admin/labo/" + res.data.id)
       }
       else{
        
       }
    }).catch((err)=>{
       console.log(err); 
    })
  }

  return (
    <>
        <div className="scanPage">
        <div className="homeDiv">
          <form className="homeDiv" onSubmit={(e)=>handleSubmit(e)}>
          <h6>
            Entrer le numéro d'identification national : 
          </h6>
          <input className="input" onChange={(e)=>setMatricule(e.target.value)} placeholder="numéro d'identification national ..." required></input>
          <button className="cssbuttons-io" type="submit">
  <span>
    Chercher
    <svg
      viewBox="0 0 19.9 19.7"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
      className="svg-icon search-icon"
    >
      <title>Search Icon</title>
      <desc id="desc">A magnifying glass icon.</desc>
      <g stroke="white" fill="none" className="search-path">
        <path d="M18.5 18.3l-5.4-5.4" strokeLinecap="square"></path>
        <circle r="7" cy="8" cx="8"></circle>
      </g>
    </svg>
  </span>
</button>
          </form>
        </div>
      </div>
    </>
  );

}