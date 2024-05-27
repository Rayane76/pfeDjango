'use client'
import "../../../styles/doctor/patient/generalInfos.css"
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function GeneralInfos(props) {
  const handleFlip = (e) => {
    e.preventDefault();
    var cards = document.querySelectorAll(".card");
    [...cards].forEach((card) => {
      card.classList.toggle("is-flipped");
    });
  };

  const handleShow = (e,type)=>{
    e.preventDefault();
    const allergies = document.getElementsByClassName(type);
    const moreAllergies = document.getElementsByClassName("more" + type);
    [...allergies].forEach((allergie)=>{
      allergie.classList.toggle("hiddenFirst");
    });
    [...moreAllergies].forEach((moreAllergie)=>{
      moreAllergie.classList.toggle("hiddenFirst");
    });
  }

  return (
    <>
      <div className="scanDiv">
        <div className="scene scene--card">
          <div className="card">
            <div className="card__face card__face--front">
              <div className="frontCard">
              <h1 className="titleInfos">Informations Générales</h1>
                <div className="nameInfosDiv">
                  <h4 className="nameInfos">
                    <span className="fw-bold me-2">
                      Nom Complet: 
                    </span> {props.patient.first_name} {props.patient.last_name}
                    <br></br>
                    <span className="fw-bold me-2">
                      Naissance:
                    </span>{props.patient.birth_date}
                    <br></br>
                    <span className="fw-bold me-2">
                      Sexe:
                    </span>
                    {props.patient.gender} <br></br>
                    <span className="fw-bold me-2">
                      Adresse:
                    </span>
                    {props.patient.address} <br></br>
                    <span className="fw-bold me-2">
                      Groupe sanguin:
                    </span>
                     {props.patient.blood_type} <br></br>
                     <span className="fw-bold me-2">
                      Contact d'urgence :
                    </span>
                     {props.patient.emergency_number} <br></br>
                     {props.isAdmin === true &&
                     <>
                     <span className="fw-bold me-2">
                     Situation: 
                     </span>
                     {props.patient.married} <br></br>
                                    <span className="fw-bold me-2">
                                    Nombre d'enfants: {props.patient.nbr_children} <br></br>
                                        </span>
                                            
                    </>
                     }
                  </h4>
                </div>
                <div className="more" onClick={(e) => handleFlip(e)}>
                  More Informations <TrendingFlatIcon />
                </div>
              </div>
            </div>
            <div className="card__face card__face--back">
              <div className="backCard">
               <h1 className="titleInfos">Maladies Informations</h1>
                <div className="allergiesMaladiesDiv">
                <div className="allergiesDiv">
                 <h4 className="alrgTitle">Allergies :</h4>
                 <ul>
                  <li className="allergie">Cow’s milk</li>
                  <li className="allergie">Eggs</li>
                  <li className="allergie">Tree nuts</li>
                  <li className="allergie">Peanuts</li>
                  <li className="allergie showMore" onClick={(e)=> handleShow(e,"allergie")}>Show more <ExpandMoreIcon /></li>
                  <li className="hiddenFirst moreallergie">Shellfish</li>
                  <li className="hiddenFirst moreallergie">Shellfish</li>
                  <li className="hiddenFirst moreallergie showMore" onClick={(e)=> handleShow(e,"allergie")}>Back <ExpandLessIcon /></li>
                 </ul>
                 
                </div>
                <div className="maladiesDiv">
                <h4 className="nameInfos">Maladies :</h4>
                 <ul>
                  {props.patient.maladies.map((maladie,index)=>{
                    if(maladie.isChronic === true){
                      return(
                        <li key={index} className="disease">{maladie.name}</li>
                      )
                    }
                  })}
                  <li className="disease showMore" onClick={(e)=> handleShow(e,"disease")}>Show more <ExpandMoreIcon /></li>
                  <li className="hiddenFirst moredisease showMore" onClick={(e)=> handleShow(e,"disease")}>Back <ExpandLessIcon /></li>
                 </ul>
                </div>
                </div>
                <div className="flipBack" onClick={(e) => handleFlip(e)}>
                  <KeyboardBackspaceIcon /> Back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
