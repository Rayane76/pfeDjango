import connectToDB from "@/app/database";
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
            oneToUpdate.centre = data.centre;
            oneToUpdate.medecin = data.medecin;
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

        }

        else if (centrerole === "C"){

        }

    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: "adding failed"
        })
    }
}