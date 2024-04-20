import "../../../styles/doctor/patient/generalInfos.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function GeneralInfos() {
  const handleFlip = (e) => {
    e.preventDefault();
    var cards = document.querySelectorAll(".card");
    [...cards].forEach((card) => {
      card.classList.toggle("is-flipped");
    });
  };

  return (
    <>
      <div className="scanDiv">
        <div className="scene scene--card">
          <div className="card">
            <div className="card__face card__face--front">
              <div className="frontCard">
                <div className="nameInfosDiv">
                  <h4 className="nameInfos">
                    <span className="fw-bold me-2">
                      Full Name : 
                    </span>
                    Rayane Hiouani <br></br>
                    <span className="fw-bold me-2">
                      Birth:
                    </span>
                    14/08/2003 <br></br>
                    <span className="fw-bold me-2">
                      Gender:
                    </span>
                    Male <br></br>
                    <span className="fw-bold me-2">
                      Address:
                    </span>
                    Aadl Belle Vue Ain Benian Algiers <br></br>
                    <span className="fw-bold me-2">
                      Blood Type:
                    </span>
                     O+
                  </h4>
                </div>
                <div className="more" onClick={(e) => handleFlip(e)}>
                  More Informations <TrendingFlatIcon />
                </div>
              </div>
            </div>
            <div className="card__face card__face--back">
              <div className="backCard">
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
