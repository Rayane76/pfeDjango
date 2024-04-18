'use client'
import "../../../styles/doctor/sideBarAdmin.css"

export default function SideBarAdmin(){
    
    const handleGeneralInfos = (e) =>{
        e.preventDefault();
        const div = document.getElementById("generalInfos");
        const active = document.getElementsByClassName("active");
        active[0].classList.add("unActive");
        active[0].classList.remove("active");
        div.classList.remove("unActive");
        div.classList.add("active");
        }

    const handleRadios = (e) =>{
        e.preventDefault();
        const div = document.getElementById("radios");
        const active = document.getElementsByClassName("active");
        active[0].classList.add("unActive");
        active[0].classList.remove("active");
        div.classList.remove("unActive");
        div.classList.add("active");
    }

    const handleAnalyses = (e) =>{
        e.preventDefault();
        const div = document.getElementById("analyses");
        const active = document.getElementsByClassName("active");
        active[0].classList.add("unActive");
        active[0].classList.remove("active");
        div.classList.remove("unActive");
        div.classList.add("active");
    }

    const handleOperations = (e) =>{
        e.preventDefault();
        const div = document.getElementById("operations");
        const active = document.getElementsByClassName("active");
        active[0].classList.add("unActive");
        active[0].classList.remove("active");
        div.classList.remove("unActive");
        div.classList.add("active");
    }

    const handleConsultation = (e) =>{
        e.preventDefault();
        const div = document.getElementById("consultation");
        const active = document.getElementsByClassName("active");
        active[0].classList.add("unActive");
        active[0].classList.remove("active");
        div.classList.remove("unActive");
        div.classList.add("active");
    }


    return(
        <>
            <div className="sideBarDiv">
              <div className="fieldsParent">
               <div className="field" onClick={(e)=>handleGeneralInfos(e)}>
                General Informations
               </div>
               <div className="field" onClick={(e)=>handleRadios(e)}>
                Radios
               </div>
                <div className="field" onClick={(e)=>handleAnalyses(e)}>
                Analyses
               </div>
                <div className="field" onClick={(e)=>handleOperations(e)}>
                Operations
               </div>
                <div className="field" onClick={(e)=>handleConsultation(e)}>
                Consultation informations
               </div>
              </div>
            </div>
        </>
    )
}