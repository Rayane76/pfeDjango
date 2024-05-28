import mongoose from "mongoose";


const Schema = mongoose.Schema;

const MaladieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true,
    }
})

const Maladie =
  mongoose.models.Maladie || mongoose.model("Maladie", MaladieSchema);

export default Maladie;