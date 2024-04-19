"use client";
import "../../../styles/doctor/patient/radios.css";
export default function Analyses() {


  const showRadio = (e, radio) => {
    e.preventDefault();
    const selected = document.getElementById("analyse" + radio);
    const parent = selected.parentNode;
    const analyses = document.getElementsByClassName("analyse");
    const analysesArray = Array.from(analyses);
    analysesArray.forEach(analyse => {
        if(analyse != parent){
           analyse.classList.toggle("unActive");
        }
    });
    parent.classList.toggle("fWidthAnalyse");
    selected.classList.toggle("unActive");
  };
  
  return (
    <>
      <div className="radiosDiv">
        <div className="analyse">
          <div className="firstDisplay" onClick={(e) => showRadio(e, 1)}>
            Analyse 1
          </div>
          <div id="analyse1" className="radioPDF unActive">
            <embed
              src="/test.pdf"
              type="application/pdf"
              width="50%"
              height="600px"
            />
          </div>
        </div>
        <div className="analyse">
          <div className="firstDisplay" onClick={(e) => showRadio(e, 2)}>
            Analyse 2
          </div>
          <div id="analyse2" className="radioPDF unActive">
            <embed
              src="/test.pdf"
              type="application/pdf"
              width="50%"
              height="600px"
            />
          </div>
        </div>
      </div>
    </>
  );
}


