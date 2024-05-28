import mongoose from "mongoose";


const Schema = mongoose.Schema;

const AllergieSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Allergie =
  mongoose.models.Allergie || mongoose.model("Allergie", AllergieSchema);

export default Allergie;