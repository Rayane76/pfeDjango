'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../../styles/doctor/patient/radios.css";
import { useState } from "react";
import axiosService from '@/app/helpers/axios';
import { useRouter } from 'next/navigation';


export default function AddModal({modalShowAdd,setModalShowAdd,patient_id}){

  const router = useRouter();

    const typeEtCategories = [
        {
          nomType: "IRM",
          categories: ["Neuro","ORL","Abdomino-pelvien","Cœur","Urinaire","Génital masculin et féminin","Ostéo Articulaire","Vasculaire","Sein"]
        },
        {
          nomType: "Scanner",
          categories: ["Neuro-Imagerie","ORL","Thorax-Abdomen-Pelvis","Uro-imagerie","Ostéo-articulaire","Vasculaire","Cœur"]
        },
        {
          nomType: "Radiologie Numerique",
          categories: ["Radiologie osseuse et articulaire","Radiologie pulmonaire","Radiographie de l’abdomen sans préparation","Neuro radiologique, Rachis"]
        },
        {
          nomType: "Echographie",
          categories: ["Viscéral","Musculo-tendineux","Vasculaires : echo-doppler","Thyroïde"]
        },
        {
          nomType: "Imagerie de la femme",
          categories: ["Mammographie","Echographie mammaire","IRM Mammaire","Hystérosalpingographie","Echographie Pelvienne","Echographie endo-vaginale","IRM Pelvienne","Ostéodensitométrie-DMO","Cytoponction mammaire","Mise en place de clip mammaire","Microbiopsie mammaire"]
        },
        {
          nomType: "Panoramique dentaire",
          categories: ["Panoramique Dentaire","Scanner Dentaire","Radiographie des Sinus","CONE BEAM"]
        },
        {
          nomType: "Médecine nucléaire",
          categories: ["Myocarde","Osseuse","Thyroïde","DMSA","DTPA","MAG 3","MIBG","Balayage à l’iode 131","Parathyroïde","Poumon","Abdomen","Transit du LCR"]
        },
        {
          nomType: "Densitométrie osseuse",
          categories: ["Densitométrie osseuse"]
        }
      ]
      

const [cats,setCats] = useState([]);
let array = [];


const [radioData,setRadioData] = useState({
  nom: "",
  radio_type: "",
  radio_category: "",
  document: null,
  note:"",
  demande: false,
})

const handleChangeAddRadio = (e)=>{
  setRadioData((prev)=>({...prev,[e.target.name]:e.target.value}));
  if(e.target.name === "radio_type"){
     array = [];
     for (let index = 0; index < typeEtCategories.length; index++) {
      if(typeEtCategories[index].nomType === e.target.value){
        typeEtCategories[index].categories.map((categ)=>{
          array.push(categ);
        })
      }
      
     }
     setCats(array);
  }
}

const handleAddDocument = (e)=>{
    setRadioData((prev)=>({...prev,document:e.target.files[0]}));
}


const handleSubmit = async (e)=>{
  e.preventDefault();

  if(selected === "demanderRadioTitle"){
    radioData.demande = true;
  }

          if(selected === "ajouterRadioTitle"){
            const formData = new FormData();
          formData.append("nom", radioData.nom);
          formData.append("radio_type",radioData.radio_type);
          formData.append("radio_category", radioData.radio_category);
          formData.append("document", radioData.document);
          formData.append("note", radioData.note);
          formData.append("demande", radioData.demande);

          
          axiosService.post(`doctor/add_document/${patient_id}`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
         .then((res) => {
          setModalShowAdd(false);
          setRadioData({
            nom: "",
            radio_type: "",
            radio_category: "",
            document: null,
            note:"",
            demande: false,
         })
          router.refresh();
          }).catch((err) => {
            console.log(err);
          })
        }
        else if (selected === "demanderRadioTitle"){
          axiosService.post(`doctor/add_document/${patient_id}`,radioData)
         .then((res) => {
          setModalShowAdd(false);
          setRadioData({
            nom: "",
            radio_type: "",
            radio_category: "",
            document: null,
            note:"",
            demande: false,
         })
          router.refresh();
          }).catch((err) => {
            console.log(err);
          })
        }
}

const [selected,setSelected] = useState("ajouterRadioTitle")

const handleSwitch = (clicked)=>{
    if(selected != clicked){
      setSelected(clicked);
      const title1 = document.getElementsByClassName("ajouterRadioTitle");
      const title2 = document.getElementsByClassName("demanderRadioTitle");

      title1[0].classList.toggle("slctd");
      title2[0].classList.toggle("slctd");
    }
}


    return(
        <Modal
        show={modalShowAdd}
           onHide={() => setModalShowAdd(false)}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title-vcenter">
             <div className='d-flex'>
              <div className='ajouterRadioTitle slctd' onClick={()=>handleSwitch("ajouterRadioTitle")}>
                Ajouter Radio
              </div>
              <div className='demanderRadioTitle' onClick={()=>handleSwitch("demanderRadioTitle")}>
                Demander Radio
              </div>
             </div>
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <div className="d-flex justify-content-start align-items-center gap-4">
           <h4>Nom Radio : </h4>
           <input onChange={(e)=>handleChangeAddRadio(e)} placeholder="Nom Radio ... " required name="nom"></input>
           </div>
           <div className="d-flex justify-content-start align-items-center gap-4">
           <h4>Type : </h4>
           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
         <InputLabel id="demo-select-small-label">Type</InputLabel>
         <Select
           labelId="demo-select-small-label"
           id="demo-select-small"
           value={radioData.radio_type}
           label="Type"
           onChange={(e)=>handleChangeAddRadio(e)}
           name="radio_type"
           required
         >
           {typeEtCategories.map((type,index)=>{
             return(
               <MenuItem key={index} value={type.nomType}>{type.nomType}</MenuItem>
             )
           })}
         </Select>
       </FormControl>
           </div>
   
           <div className="d-flex justify-content-start align-items-center gap-4">
             <h4>Categorie : </h4>
             <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
         <InputLabel id="demo-select-small-label">Categorie</InputLabel>
         <Select
           labelId="demo-select-small-label"
           id="demo-select-small"
           value={radioData.radio_category}
           label="Categorie"
           onChange={(e)=>handleChangeAddRadio(e)}
           name="radio_category"
           required
         >
         {cats.length > 0 && 
          cats.map((categorie,index)=>{
           return(
               <MenuItem key={index} value={categorie}>{categorie}</MenuItem>
             )
          })
         }
         
         </Select>
       </FormControl>
           </div>
   
           {selected === "ajouterRadioTitle" && 
           <>
            <h4>Rapport : </h4>
            <textarea rows={7} onChange={(e)=>handleChangeAddRadio(e)} className="textArea" name='rapport'>
          </textarea>
   
            <h4>Document : </h4>
            <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="file" className="labelFile">
            <span>
           <svg xmlSpace="preserve" viewBox="0 0 184.69 184.69" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" version="1.1" width="60px" height="60px">
         <g>
           <g>
             <g>
               <path
                 d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813
                   C102.609,16.43,88.713,7.576,73.087,7.576c-22.117,0-40.112,17.994-40.112,40.115c0,0.913,0.036,1.854,0.118,2.834
                   C14.004,54.875,0,72.11,0,91.959c0,23.456,19.082,42.535,42.538,42.535h33.623v-7.025H42.538
                   c-19.583,0-35.509-15.929-35.509-35.509c0-17.526,13.084-32.621,30.442-35.105c0.931-0.132,1.768-0.633,2.326-1.392
                   c0.555-0.755,0.795-1.704,0.644-2.63c-0.297-1.904-0.447-3.582-0.447-5.139c0-18.249,14.852-33.094,33.094-33.094
                   c13.703,0,25.789,8.26,30.803,21.04c0.63,1.621,2.351,2.534,4.058,2.14c15.425-3.568,29.919,3.883,36.604,17.168
                   c0.508,1.027,1.503,1.736,2.641,1.897c17.368,2.473,30.481,17.569,30.481,35.112c0,19.58-15.937,35.509-35.52,35.509H97.391
                   v7.025h44.761c23.459,0,42.538-19.079,42.538-42.535C184.69,71.545,169.884,53.901,149.968,50.186z"
                 style={{fill:"#010002"}}
               ></path>
             </g>
             <g>
               <path
                 d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541,65.078
                   c-0.701-0.698-1.614-1.045-2.534-1.045l-0.064,0.011c-0.018,0-0.036-0.011-0.054-0.011c-0.931,0-1.85,0.361-2.534,1.045
                   L63.31,85.127c-1.403,1.403-1.403,3.672,0,5.075c1.403,1.406,3.672,1.406,5.075,0L82.296,76.29v97.227
                   c0,1.99,1.603,3.597,3.593,3.597c1.979,0,3.59-1.607,3.59-3.597V76.165l14.033,14.036
                   C104.91,91.608,107.183,91.608,108.586,90.201z"
           style={{fill:"#010002"}}
               ></path>
             </g>
           </g>
         </g></svg>
   
   
     </span>
     <p>{
       radioData.document === null ?
       "Drag and drop your file here or click to select a file!"
       :
       radioData.document.name
       }</p></label>
   <input required onChange={(e)=>handleAddDocument(e)} className="inputR" name="document" id="file" type="file" />
           
   </div>
</>
           }
   
           
           
         </Modal.Body>
         <Modal.Footer>
         <Button onClick={(e)=>handleSubmit(e)} >Ajouter</Button>
           <Button variant="secondary" onClick={()=>setModalShowAdd(false)}>Fermer</Button>
         </Modal.Footer>
       </Modal>
    )
}