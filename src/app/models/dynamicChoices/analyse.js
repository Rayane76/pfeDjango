import mongoose from "mongoose";


const Schema = mongoose.Schema;

const AnalyseSchema = new Schema({
    nom: {
        type: String,
        required: true,
    }
})


const Analyse =
  mongoose.models.Analyse || mongoose.model("Analyse", AnalyseSchema);

export default Analyse;