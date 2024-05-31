import mongoose from "mongoose";


const Schema = mongoose.Schema;

const MedicamentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Medicament =
  mongoose.models.Medicament || mongoose.model("Medicament", MedicamentSchema);

export default Medicament;