import connectToDB from "@/app/database";
import Labo from "@/app/models/users/labo";
import Medecin from "@/app/models/users/medecin";
import Patient from "@/app/models/users/patient";
import { NextResponse } from "next/server";




export async function POST(req){
    try {
        await connectToDB();

        const {data,field,id,centrerole,centreid} = await req.json();

        if(centrerole === "M"){
           const medecin = await Medecin.findOne({_id: centreid});
           if(medecin){
            const patient = await Patient.findOne({_id: id})

            const oneToUpdate = patient[field].id(data._id);

            oneToUpdate.document = data.document;
            oneToUpdate.centre = medecin.first_name + " " + medecin.last_name;
            oneToUpdate.medecin = medecin.first_name + " " + medecin.last_name;
            oneToUpdate.rapport = data.rapport;
            oneToUpdate.isDemande = false;

            patient.save();


            return NextResponse.json({
                success: true,
                message: "added successfully"
            })
           }
           else{
            return NextResponse.json({
                success: false,
                message: "medecin not found"
            })
           }
        }

        else if (centrerole === "L"){
            const labo = await Labo.findOne({_id: centreid});
            if(labo){
             const patient = await Patient.findOne({_id: id})
 
             const oneToUpdate = patient[field].id(data._id);
 
             oneToUpdate.document = data.document;
             oneToUpdate.centre = labo.nom;
             oneToUpdate.medecin = labo.nom;
             oneToUpdate.rapport = data.rapport;
             oneToUpdate.isDemande = false;
 
             patient.save();
 
 
             return NextResponse.json({
                 success: true,
                 message: "added successfully"
             })
            }
            else{
             return NextResponse.json({
                 success: false,
                 message: "medecin not found"
             })
            }
        }

        else if (centrerole === "C"){
            const centre = await Labo.findOne({_id: centreid});
            if(centre){
             const patient = await Patient.findOne({_id: id})
 
             const oneToUpdate = patient[field].id(data._id);
 
             oneToUpdate.document = data.document;
             oneToUpdate.centre = centre.nom;
             oneToUpdate.medecin = centre.nom;
             oneToUpdate.rapport = data.rapport;
             oneToUpdate.isDemande = false;
 
             patient.save();
 
 
             return NextResponse.json({
                 success: true,
                 message: "added successfully"
             })
            }
            else{
             return NextResponse.json({
                 success: false,
                 message: "medecin not found"
             })
            }
        }

    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: "adding failed"
        })
    }
}