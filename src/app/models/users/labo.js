import mongoose from "mongoose";


const Schema = mongoose.Schema;

const LaboSchema = new Schema({
    nom : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    certificat: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "L"
    },
    isValide: {
        type: Boolean,
        required: true,
    } 
})


const Labo =
  mongoose.models.Labo || mongoose.model("Labo", LaboSchema);

export default Labo;