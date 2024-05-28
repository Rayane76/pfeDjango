import mongoose from "mongoose";


const Schema = mongoose.Schema;

const MedecinSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    carte_id:{
        type: String,
        required: true,
     },
    certificat: {
        type: String,
        required: true,
    },
    specialite: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isValide: {
        type: Boolean,
        required: true,
    } 

})


const Medecin =
  mongoose.models.Medecin || mongoose.model("Medecin", MedecinSchema);

export default Medecin;