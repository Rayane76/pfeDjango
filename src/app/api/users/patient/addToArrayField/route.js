import connectToDB from "@/app/database";
import Centre from "@/app/models/users/centre";
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
            const newData = {
                ...data,
                centre: medecin.first_name + " " + medecin.last_name,
                medecin: medecin.first_name + " " + medecin.last_name,
            }
            patient[field].push(newData);
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
             const newData = {
                 ...data,
                 centre: labo.nom,
                 medecin: labo.nom,
             }
             patient[field].push(newData);
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
            const centre = await Centre.findOne({_id: centreid});
            if(centre){
             const patient = await Patient.findOne({_id: id})
             const newData = {
                 ...data,
                 centre: centre.nom,
                 medecin: centre.nom,
             }
             patient[field].push(newData);
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