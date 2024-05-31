import mongoose from "mongoose";


const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "A"
    },
})

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;