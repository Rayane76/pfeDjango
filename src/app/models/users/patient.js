import mongoose from "mongoose";


const Schema = mongoose.Schema;

const PatientSchema = new Schema({
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
    numero_tel: {
        type: String,
        required: true,
    },
    emergency_number: {
        type: String,
        required: true,
    },
    birth_date: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male","female"]
     },
    blood_type: {
        type: String,
        required: true,
        enum: ["O+","O-","A+","A-","B+","B-","AB+","AB-"]
    },
    address: {
        type: String,
        required: true,
    },
    carte_id:{
       type: String,
       required: true,
    },
    situation: {
        type: String,
        required: true,
        enum: ["celibataire","mariee","divorcee","veuf"]
    },
    nbr_children: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "P"
    },
    qrCodeUrl: { 
        type: String 
     },
    allergies: [{
        name: {
            type: String,
            required: true,
        },
        affiche: {
            type: Boolean,
            required: true,
        }
    }],
    maladies: [{
        nom: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        medecin: {
            type: String,
            required: true
        },
        categorie: {
            type: String,
            required: true
        },
        note: {
            type: String,
        },
        affiche: {
           type: Boolean,
           required: true
        },
        ordonnance: [{
          medicament : {
            type: String,
            required: true
          },
          ratio: {
            type: String,
          },
          duree: {
            type: String,
          }
        }],
    }],
    antecedents: [{
        nom: {
            type: String,
            required: true,
        },
        membre: {
            type: String,
            required: true,
        },
        categorie: {
            type: String,
            required: true,
        },
    }],
    radios: [{
        nom: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["IRM","Scanner","Radiologie","Echographie","ImagerieFemme","Panoramique","Nucléaire","Densitométrie"]
        },
        categorie: {
            type: String,
            required: true,
        },
        isDemande: {
           type: Boolean,
           required: true,
        },
        document: {
            type: String,
            required: true,
        },
        rapport: {
            type: String,
        },
        centre: {
            type: String,
            required: true,
        }

    }],
    analyses: [{
        nom: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        document: {
            type: String,
            required: true,
        },
        centre: {
            type: String,
            required: true,
        },
        isDemande: {
            type: Boolean,
            required: true,
         }
    }],
    chirurgies: [{
        nom: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        categorie: {
            type: String,
            required: true,
        },
        rapport: {
            type: String,
            required: true,
        },
        medecin: {
            type: String,
            required: true,
        },
        isDemande: {
            type: Boolean,
            required: true,
         }
    }],
},{
    timestamps: true
})


const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default Patient;