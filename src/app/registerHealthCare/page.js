'use client'
import { useState } from "react";
import "../styles/reg.css";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function RegisterHealthCare() {

    const [currentStep, setCurrentStep] = useState(0);

    const router = useRouter();

    const [role,setRole]= useState("");


    const [allInfos,setAllInfos] = useState({
        first_name: "",  //medecin
        last_name: "",   //medecin
        name: "",       //labo
        email: "",    
        labo_number: "",
        address: "",
        carte_id: "",   //medecin
        password: "",
        certeficat: "",
        specialite: "",   //medecin
        valide: false,
    })

    const handleInput = (e) => {
        setAllInfos((prev)=>({...prev,[e.target.name]:e.target.value}));
      }

      const [cfrm,setCfrm] = useState("");

      const handleChangeCertificat = (e) => {
        setAllInfos((prev)=>({...prev,certeficat:e.target.files[0]}));
      }

    const medecinSteps = [
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
          <input  required={currentStep === 1 ? true : false}  name="labo_number" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Spécialité : </label>
          <input  required={currentStep === 1 ? true : false}  name="specialite" className="input" onChange={(e)=>handleInput(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Diplome : </label>
          <input required={currentStep === 2 ? true : false}  name="certeficat" className="input" type="file" onChange={(e)=>handleChangeCertificat(e)} />
        </div>
      </div>,
  
      <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Numéro d'identification national : </label>
          <input required={currentStep === 3 ? true : false} name="carte_id" className="input" onChange={(e)=>handleInput(e)} />
        </div>
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>handleInput(e)} name="password" className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>setCfrm(e.target.value)} className="input" />
        </div>
      </div>
    ];


    
    const laboSteps = [
        <div className="inputStep">
          <div className="oneInputDiv">
            <label className="label">Nom : </label>
            <input required name="name" className="input" onChange={(e)=>handleInput(e)} />
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
            <input  required={currentStep === 1 ? true : false}  name="labo_number" className="input" onChange={(e)=>handleInput(e)} />
          </div>
        </div>,
    
        <div className="inputStep">
          <div className="oneInputDiv">
          <label className="label">Certificat : </label>
          <input required={currentStep === 2 ? true : false}  name="certeficat" className="input" type="file" onChange={(e)=>handleChangeCertificat(e)} />
        </div>
        </div>,
    
        <div className="inputStep">
        <div className="oneInputDiv">
          <label className="label">Mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>handleInput(e)} name="password" className="input" />
        </div>
        <div className="oneInputDiv">
          <label className="label">Confirmer mot de passe : </label>
          <input type="password" required={currentStep === 3 ? true : false} onChange={(e)=>setCfrm(e.target.value)} className="input" />
        </div>
        </div>
      ];


      // first_name: "",  //medecin
      // last_name: "",   //medecin
      // name: "",       //labo
      // email: "",    
      // labo_number: "",
      // address: "",
      // carte_id: "",   //medecin
      // password: "",
      // certeficat: "",
      // specialite: "",   //medecin
      // valide: false,


      const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentStep < medecinSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
        else{
        if(allInfos.password === cfrm){
        if(role === "medecin"){
          const formData = new FormData();
          formData.append("first_name", allInfos.first_name);
          formData.append("last_name", allInfos.last_name);
          formData.append("email",allInfos.email);
          formData.append("labo_number", allInfos.labo_number);
          formData.append("address", allInfos.address);
          formData.append("carte_id", allInfos.carte_id);
          formData.append("specialite", allInfos.specialite);
          formData.append("password", allInfos.password);
          formData.append("certeficat", allInfos.certeficat);
          axios.post("http://127.0.0.1:8000/api/register/doctor/",formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
         .then((res) => {
         alert("Demande enregistre avec success ! vous pouvez vous connecter une fois votre compte a ete valide")
         router.push("/");
          }).catch((err) => {
            console.log(err);
          })
        }

        else if (role === "labo" || role === "centre"){
          const formData = new FormData();
          formData.append("name", allInfos.name);
          formData.append("email",allInfos.email);
          formData.append("labo_number", allInfos.labo_number);
          formData.append("address", allInfos.address);
          formData.append("password", allInfos.password);
          formData.append("certeficat", allInfos.certeficat);
          axios.post("http://127.0.0.1:8000/api/register/labo/",formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
         .then((res) => {
         alert("Demande enregistre avec success ! vous pouvez vous connecter une fois votre compte a ete valide")
         router.push("/");
          }).catch((err) => {
            console.log(err);
          })
        }
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
          <div className="stepTitle">
          Certificat
          <div className={currentStep >= 3 ? "step activeStep" : "step"}>3</div>
          </div>
          <div className="stepTitle">
          Soumettre
          <div className="stepl">4</div>
          </div>
        </div>
      </div>



     <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="regDiv">
        
        <h1 className="ttl">Inscription</h1>

        <div className="oneInputDiv">
            <label className="label">Choisir specialite : </label>
            <select required name="role" value={role} className="input" onChange={(e)=>{setRole(e.target.value);setAllInfos({
        first_name: "",  //medecin
        last_name: "",   //medecin
        name: "",       //labo
        email: "",    
        labo_number: "",
        address: "",
        carte_id: "",   //medecin
        password: "",
        certeficat: "",
        specialite: "",   //medecin
        isValide: false,
            })}}>
            <option value="" hidden>Choisir specialite : </option>
            <option value="medecin">Medecin</option>
            <option value="labo">Laboratoire d'analyses</option>
            <option value="centre">Centre d'imagerie</option>
          </select>
            </div>


        {role === "" ? "" 
        : 
        role === "medecin" ? 
        medecinSteps.map((step, index) => (
        <div key={index} className={`inputStep ${index === currentStep ? 'inStep' : 'notInStep'}`}>
          {step}
        </div>
      ))
       : 
       laboSteps.map((step, index) => (
        <div key={index} className={`inputStep ${index === currentStep ? 'inStep' : 'notInStep'}`}>
          {step}
        </div>
      ))
        }


        <div className="buttonsDiv">
          <button onClick={handleBack} disabled={currentStep === 0} className="retourBtn">Retour</button>
          <button type="submit" className="continuerBtn">
          {currentStep === medecinSteps.length -1 ? "Submit" : "Continuer"}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}
