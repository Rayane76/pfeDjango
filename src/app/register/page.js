'use client'
import { useEffect, useState } from "react";
import "../styles/reg.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'universal-cookie';

export default function Reg() {

  const cookies = new Cookies();

    const [currentStep, setCurrentStep] = useState(0);

    const router = useRouter();


    const [allInfos,setAllInfos] = useState({
        first_name: "",
        last_name: "",
        email: "",
        numero_tel: "",
        emergency_number: "",
        birth_date: "",
        gender: "",
        blood_type: "",
        address: "",
        carte_id: "",
        password: "",
        married: "",
        nbr_children: "0",
    })

    const handleInput = (e) => {
        setAllInfos((prev)=>({...prev,[e.target.name]:e.target.value}));
      }

      const [cfrm,setCfrm] = useState("");

    const steps = [
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Nom : </label>
          <input required name="last_name" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Prénom : </label>
          <input required name="first_name" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Email : </label>
          <input required name="email" type="email" className="input" onChange={(e)=>handleInput(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Adresse : </label>
          <input required={currentStep === 1 ? true : false} name="address" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Numéro de téléphone : </label>
          <input  required={currentStep === 1 ? true : false}  name="numero_tel" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Contact d'urgence : </label>
          <input  required={currentStep === 1 ? true : false}  name="emergency_number" className="input" onChange={(e)=>handleInput(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Date de naissance : </label>
          <input  required={currentStep === 2 ? true : false}  name="birth_date" className="input" type="date" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Sexe : </label>
          <select required={currentStep === 2 ? true : false} value={allInfos.gender} name="gender" className="input" onChange={(e)=>handleInput(e)}>
            <option value="" hidden>Choisir le sexe : </option>
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
          </select>

        </div>
        <div className="oneInputDiv">
          <label className="label">Groupe sanguin : </label>
          <select required={currentStep === 2 ? true : false} name="blood_type" value={allInfos.blood_type} className="input" onChange={(e)=>handleInput(e)}>
            <option value="" hidden>Choisir le groupe sanguin : </option>
            <option value="O+">O +</option>
            <option value="O-">O -</option>
            <option value="A+">A +</option>
            <option value="A-">A -</option>
            <option value="B+">B +</option>
            <option value="B-">B -</option>
            <option value="AB+">AB +</option>
            <option value="AB-">AB -</option>
          </select>
        </div>
      </div>,

// CELIBATAIRE = "Célibataire"
// MARIE = "Marié(e)"
// DIVORCE = "Divorcé(e)"
// VEUF = "Veuf/Veuve"
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Numéro d'identification national : </label>
          <input required={currentStep === 3 ? true : false} name="carte_id" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Situation familiale : </label>
          <select required={currentStep === 3 ? true : false} name="married" value={allInfos.situation} className="input" onChange={(e)=>{handleInput(e);setAllInfos((prev)=>({...prev,nbr_children:"0"}))}}>
            <option value="" hidden>Choisir Situation familiale : </option>
            <option value="Célibataire">Célibataire</option>
            <option value="Marié(e)">Marié(e)</option>
            <option value="Divorcé(e)">Divorcé(e)</option>
            <option value="Veuf/Veuve">Veuf/Veuve</option>
          </select>
        </div>
        <div className="oneInputDiv">
          <label className="label">Nombre d'enfants : </label>
          <input required={currentStep === 3 ? true : false} onChange={(e)=>handleInput(e)} value={allInfos.nbr_children} disabled={allInfos.situation === "" || allInfos.situation === "celibataire" ? true : false} name="nbr_children" type="number" className="input" />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input type="password" required={currentStep === 4 ? true : false} onChange={(e)=>handleInput(e)} name="password" className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input type="password" required={currentStep === 4 ? true : false} onChange={(e)=>setCfrm(e.target.value)} className="input" />
        </div>
      </div>
    ];




      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(allInfos)
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
        else{
          if(allInfos.password === cfrm){
           await axios
           .post("http://127.0.0.1:8000/api/register/",allInfos)
           .then((res)=>{
            console.log(res);
            cookies.set("auth",JSON.stringify({
              id:res.data.id ,
              refresh:res.data.refresh,
              access:res.data.access,
              role:res.data.role
            }));
          router.push("/account/" + res.data.id);
              
      }).catch((err)=>{
        console.log('err',err)
      })
          }
          else{
             
          }
        }
      }
    
      const handleBack = (e) => {
        e.preventDefault();
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        }
      };


  return (
    <div className="regPage">
      <div className="progressBar">
        <div className="pBarSteps">
          <div className="stepTitle">
          Nom
          <div className={currentStep >= 1 ? "step activeStep" : "step"}>1</div>
          </div>
          <div  className="stepTitle">
          Contact
          <div className={currentStep >= 2 ? "step activeStep" : "step"}>2</div>
          </div>
          <div  className="stepTitle">
          Naissance
          <div className={currentStep >= 3 ? "step activeStep" : "step"}>3</div>
          </div>
          <div className="stepTitle">
          Situation
          <div className={currentStep >= 4 ? "step activeStep" : "step"}>4</div>
          </div>
          <div className="stepTitle">
          Soumettre
          <div className="stepl">5</div>
          </div>
        </div>
      </div>



     <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="regDiv">
        
        <h1 className="ttl">Inscription</h1>



        {steps.map((step, index) => (
        <div key={index} className={`inputStep ${index === currentStep ? 'inStep' : 'notInStep'}`}>
          {step}
        </div>
      ))}


        <div className="buttonsDiv">
          <button onClick={handleBack} disabled={currentStep === 0} className="retourBtn">Retour</button>
          <button type="submit" className="continuerBtn">
          {currentStep === steps.length -1 ? "Submit" : "Continuer"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
