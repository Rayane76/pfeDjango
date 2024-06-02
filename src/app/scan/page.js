'use client'
import { useRouter } from "next/navigation";
import "../styles/doctor/home.css";
import { useState } from "react";
import axios from "axios";

export default function Doctor() {

  const [matricule,setMatricule] = useState("");
  const [type,setType] = useState("");
  const router = useRouter();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(type === "id"){
    await axios.post("http://127.0.0.1:8000/api/exist/",{
        id: matricule
    }).then((res)=>{
       if(res.data.exist === true){
         router.push("/scan/" + res.data.id)
       }
       else{
        
       }
    }).catch((err)=>{
       console.log(err); 
    })
  }
  else if (type === "carte_id"){
    await axios.post("http://127.0.0.1:8000/api/exist/",{
        carte_id: matricule
    }).then((res)=>{
       if(res.data.exist === true){
         router.push("/scan/" + res.data.id)
       }
       else{
        
       }
    }).catch((err)=>{
       console.log(err); 
    })
  }
  else {

  }
  }

  return (
    <>
      <div className="scanPage">
        <div className="homeDiv">
          <form className="homeDiv" onSubmit={(e)=>handleSubmit(e)}>
          <select style={{height:"50px",borderRadius:"10px" , marginBottom:"50px"}} value={type} required onChange={(e)=>{setType(e.target.value);setMatricule("")}}>
            <option value="" hidden>Choisir Scan : </option>
            <option value="carte_id">Numéro d'identification national</option>
            <option value="id">ID Patient</option>
          </select>
          <input value={matricule} style={{display:"block"}} className="input" name={type} placeholder={type === "carte_id" ? "Numéro d'identification national ..." : type === "id" ? "ID Patient" : "Choisir type d'abord"} onChange={(e)=>setMatricule(e.target.value)} required></input>
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



