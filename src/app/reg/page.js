'use client'
import { useEffect, useState } from "react";
import "../styles/reg.css";

export default function Reg() {

    const [currentStep, setCurrentStep] = useState(0);


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
        role:"P",
        situation: "",
        nbr_enfants: "",
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
            <option hidden>Choisir le sexe : </option>
            <option value="male">Homme</option>
            <option value="femele">Femme</option>
          </select>

        </div>
        <div className="oneInputDiv">
          <label className="label">Groupe sanguin : </label>
          <select required={currentStep === 2 ? true : false} name="blood_type" value={allInfos.blood_type} className="input" onChange={(e)=>handleInput(e)}>
            <option hidden>Choisir le groupe sanguin : </option>
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
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Numéro d'identification national : </label>
          <input required={currentStep === 3 ? true : false} name="carte_id" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Situation familiale : </label>
          <select required={currentStep === 3 ? true : false} name="situation" value={allInfos.situation} className="input" onChange={(e)=>handleInput(e)}>
            <option hidden>Choisir Situation familiale : </option>
            <option value="celibataire">Célibataire</option>
            <option value="mariee">Marié(e)</option>
            <option value="divorcee">Divorcé(e)</option>
            <option value="veuf">Veuf/Veuve</option>
          </select>
        </div>
        <div className="oneInputDiv">
          <label className="label">Nombre d'enfants : </label>
          <input required={currentStep === 3 ? true : false} onChange={(e)=>handleInput(e)} disabled={allInfos.situation === "" || allInfos.situation === "celibataire" ? true : false} name="nbr_enfants" type="number" className="input" />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input required={currentStep === 4 ? true : false} onChange={(e)=>handleInput(e)} name="password" className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input required={currentStep === 4 ? true : false} onChange={(e)=>setCfrm(e.target.value)} className="input" />
        </div>
      </div>
    ];


      const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
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
        <div className="d-flex flex-column align-items-center">
          Nom
          <div className={currentStep >= 1 ? "step activeStep" : "step"}>1</div>
          Contact
          <div className={currentStep >= 2 ? "step activeStep" : "step"}>2</div>
          Naissance
          <div className={currentStep >= 3 ? "step activeStep" : "step"}>3</div>
          Situation
          <div className={currentStep >= 4 ? "step activeStep" : "step"}>4</div>
          Soumettre
          <div className="stepl">5</div>
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
          <button type="submit" disabled={currentStep === steps.length - 1} className="continuerBtn">
          {currentStep === steps.length -1 ? "Submit" : "Continuer"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
