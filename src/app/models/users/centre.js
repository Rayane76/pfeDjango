import mongoose from "mongoose";


const Schema = mongoose.Schema;

const CentreSchema = new Schema({
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
    isValide: {
        type: Boolean,
        required: true,
    } 
})


const Centre =
  mongoose.models.Centre || mongoose.model("Centre", CentreSchema);

export default Centre;