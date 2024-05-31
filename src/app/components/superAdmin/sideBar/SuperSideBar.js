"use client";
import "../../../styles/doctor/sideBarAdmin.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import GeneralSvg from "@/app/utils/svg/sidebarIcons/generalsvg";
import ModifySvg from "@/app/utils/svg/sidebarIcons/modifysvg";
import DiseasesSvg from "@/app/utils/svg/sidebarIcons/diseasessvg";
import Xray from "@/app/utils/svg/sidebarIcons/xray";
import AnalysesSvg from "@/app/utils/svg/sidebarIcons/analyses";
import OperationsSvg from "@/app/utils/svg/sidebarIcons/operationsSvg";

export default function SuperSideBar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (e, clicked) => {
    e.preventDefault();
    const div = document.getElementById(clicked);
    const active = document.getElementsByClassName("active");
    const fields = document.getElementsByClassName("field");
    [...fields].forEach((field) => {
      if (field.classList.contains("selected")) {
        field.classList.remove("selected");
      }
    });
    e.target.classList.add("selected");
    active[0].classList.add("unActive");
    active[0].classList.remove("active");
    div.classList.remove("unActive");
    div.classList.add("active");
    setShow(false);
  };

  return (
    <>
      <div className="sideBarDiv">
        <div className="sideBarTitle">Accueil</div>
        <div className="fieldsParent">
          <div
            className="field selected"
            onClick={(e) => handleClick(e, "demandes")}
          >
            <GeneralSvg />
            Demandes d'inscription
          </div>
          <div className="field" onClick={(e) => handleClick(e, "medicaments")}>
            <DiseasesSvg />
             Medicaments
          </div>
          <div className="field" onClick={(e) => handleClick(e, "maladies")}>
            <Xray />
            Maladies
          </div>
          <div className="field" onClick={(e) => handleClick(e, "allergies")}>
            <AnalysesSvg />
            Allergies
          </div>
          <div className="field" onClick={(e) => handleClick(e, "documents")}>
            <OperationsSvg />
            Radios/Analyses
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="mobile">
        <Button variant="primary" onClick={handleShow}>
          Launch
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sideBarDivMobile">
              <div className="fieldsParent">
                <div
                  className="field selected"
                  onClick={(e) => handleClick(e, "demandes")}
                >
                  <GeneralSvg />
                  Demandes d'inscription
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "medicaments")}
                >
                 <DiseasesSvg />
                  Medicaments
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "maladies")}
                >
                  <Xray />
                  Maladies
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "allergies")}
                >
                  <AnalysesSvg />
                  Allergies
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "documents")}
                > 
                  <OperationsSvg />
                  Radios/Analyses
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
