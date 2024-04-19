"use client";
import "../../../styles/doctor/patient/radios.css";
export default function Radios() {


  const showRadio = (e, radio) => {
    e.preventDefault();
    const selected = document.getElementById("radio" + radio);
    const parent = selected.parentNode;
    const radios = document.getElementsByClassName("radio");
    const radiosArray = Array.from(radios);
    radiosArray.forEach(radio => {
        if(radio != parent){
           radio.classList.toggle("unActive");
        }
    });
    parent.classList.toggle("fWidth");
    selected.classList.toggle("unActive");
  };
  
  return (
    <>
      <div className="radiosDiv">
        <div className="radio" onClick={(e) => showRadio(e, 1)}>
          <div className="firstDisplay">
            Radio 1
          </div>
          <div id="radio1" className="radioPDF unActive">
            <embed
              src="/test.pdf"
              type="application/pdf"
              width="50%"
              height="600px"
            />
          </div>
        </div>
        <div className="radio" onClick={(e) => showRadio(e, 2)}>
          <div className="firstDisplay">
            Radio 2
          </div>
          <div id="radio2" className="radioPDF unActive">
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
