import mongoose from "mongoose";


const Schema = mongoose.Schema;

const RadioSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    categories: [String],
})

const Radio =
  mongoose.models.Radio || mongoose.model("Radio", RadioSchema);

export default Radio;




// {
//     nomType: "IRM",
//     categories: ["Neuro","ORL","Abdomino-pelvien","Cœur","Urinaire","Génital masculin et féminin","Ostéo Articulaire","Vasculaire","Sein"]
//   },
//   {
//     nomType: "Scanner",
//     categories: ["Neuro-Imagerie","ORL","Thorax-Abdomen-Pelvis","Uro-imagerie","Ostéo-articulaire","Vasculaire","Cœur"]
//   },
//   {
//     nomType: "Radiologie Numerique",
//     categories: ["Radiologie osseuse et articulaire","Radiologie pulmonaire","Radiographie de l’abdomen sans préparation","Neuro radiologique, Rachis"]
//   },
//   {
//     nomType: "Echographie",
//     categories: ["Viscéral","Musculo-tendineux","Vasculaires : echo-doppler","Thyroïde"]
//   },
//   {
//     nomType: "Imagerie de la femme",
//     categories: ["Mammographie","Echographie mammaire","IRM Mammaire","Hystérosalpingographie","Echographie Pelvienne","Echographie endo-vaginale","IRM Pelvienne","Ostéodensitométrie-DMO","Cytoponction mammaire","Mise en place de clip mammaire","Microbiopsie mammaire"]
//   },
//   {
//     nomType: "Panoramique dentaire",
//     categories: ["Panoramique Dentaire","Scanner Dentaire","Radiographie des Sinus","CONE BEAM"]
//   },
//   {
//     nomType: "Médecine nucléaire",
//     categories: ["Myocarde","Osseuse","Thyroïde","DMSA","DTPA","MAG 3","MIBG","Balayage à l’iode 131","Parathyroïde","Poumon","Abdomen","Transit du LCR"]
//   },
//   {
//     nomType: "Densitométrie osseuse",
//     categories: ["Densitométrie osseuse"]
//   }