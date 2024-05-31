import mongoose from "mongoose";


const Schema = mongoose.Schema;

const ChirurgieSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    categorie: {
        type: String,
        required: true
    }
})


const Chirurgie =
  mongoose.models.Chirurgie || mongoose.model("Chirurgie", ChirurgieSchema);

export default Chirurgie;