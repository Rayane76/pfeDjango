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
import ConsultationSvg from "@/app/utils/svg/sidebarIcons/consultationSvg";
import { BsQrCode } from "react-icons/bs";

export default function SideBarAdmin(props) {
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
            onClick={(e) => handleClick(e, "generalInfos")}
          >
            <GeneralSvg />
            Informations générales
          </div>
          {props.qrCodeSection === true &&
          <div className="field" onClick={(e) => handleClick(e, "personnelles")}>
            <ModifySvg />
            Informations Personnelles
          </div>
          }

          <div className="field" onClick={(e) => handleClick(e, "modify")}>
            <ModifySvg />
            Modifier Informations
          </div>
          <div className="field" onClick={(e) => handleClick(e, "history")}>
            <DiseasesSvg />
             Historique Maladies
          </div>
          <div className="field" onClick={(e) => handleClick(e, "radios")}>
            <Xray />
            Radios
          </div>
          <div className="field" onClick={(e) => handleClick(e, "analyses")}>
            <AnalysesSvg />
            Analyses
          </div>
          <div className="field" onClick={(e) => handleClick(e, "operations")}>
            <OperationsSvg />
            Chirurgies
          </div>
          {props.isAdmin === true && 
          <div
            className="field"
            onClick={(e) => handleClick(e, "consultation")}
          >
            <ConsultationSvg />
            Consultation
          </div>
          }
          {props.qrCodeSection === true &&
                <div 
                className="field"
                onClick={(e)=>handleClick(e, "qrCode")}
                >
                                <BsQrCode />
                  Qrcode
                </div>
                
                
                }
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
                  onClick={(e) => handleClick(e, "generalInfos")}
                >
                  <GeneralSvg />
                  Informations générales
                </div>
                {props.qrCodeSection === true &&                
            <div className="field" onClick={(e) => handleClick(e, "personnelles")}>
            <ModifySvg />
            Informations Personnelles
          </div>
                }

                <div
                  className="field"
                  onClick={(e) => handleClick(e, "modify")}
                >
                  <ModifySvg />
                  Modifier Informations
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "history")}
                >
                 <DiseasesSvg />
                  Historique Maladies
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "radios")}
                >
                  <Xray />
                  Radios
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "analyses")}
                >
                  <AnalysesSvg />
                  Analyses
                </div>
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "operations")}
                > 
                  <OperationsSvg />
                  Chirurgies
                </div>
                {props.isAdmin === true && 
                <div
                  className="field"
                  onClick={(e) => handleClick(e, "consultation")}
                >
                  <ConsultationSvg />
                  Consultation
                </div>
                }
                {props.qrCodeSection === true &&
                <div 
                className="field"
                onClick={(e)=>handleClick(e, "qrCode")}
                >
                  <BsQrCode />
                  Qrcode
                </div>
                
                
                }
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
}
