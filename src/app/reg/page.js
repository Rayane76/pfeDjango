'use client'
import { useState } from "react";
import "../styles/reg.css";

export default function Reg() {

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Nom : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Prénom : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Email : </label>
          <input className="input" />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Adresse : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Numéro de téléphone : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Contact d'urgence : </label>
          <input className="input" />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Date de naissance : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Sexe : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Groupe sanguin : </label>
          <input className="input" />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Numéro d'identification national : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Situation familiale : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Nombre d'enfants : </label>
          <input className="input" />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input className="input" />
        </div>
      </div>
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      };
    
      const handleBack = () => {
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        }
      };


  return (
    <div className="regPage">
      <div className="progressBar">
        <div className="d-flex flex-column align-items-center">
          Nom
          <div className="step activeStep">1</div>
          Contact
          <div className="step">2</div>
          Naissance
          <div className="step">3</div>
          Situation
          <div className="step">4</div>
          Soumettre
          <div className="stepl">5</div>
        </div>
      </div>




      <div className="regDiv">
        <h1 className="ttl">Inscription</h1>



        {steps.map((step, index) => (
        <div key={index} className={`inputStep ${index === currentStep ? 'inStep' : 'notInStep'}`}>
          {step}
        </div>
      ))}


        <div className="buttonsDiv">
          <button onClick={handleBack} disabled={currentStep === 0} className="retourBtn">Retour</button>
          <button onClick={handleNext} disabled={currentStep === steps.length - 1} className="continuerBtn">
          {currentStep === steps.length -1 ? "Submit" : "Continuer"}
          </button>
        </div>
      </div>
    </div>
  );
}
