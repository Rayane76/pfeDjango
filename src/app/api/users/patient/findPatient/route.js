import connectToDB from "@/app/database";
import Patient from "@/app/models/users/patient";
import { NextResponse } from "next/server";




export async function POST(req){
    try {

        await connectToDB();

        const {carte} = await req.json();

        const patient = await Patient.findOne({carte_id: carte});
  
        if(patient){
            return NextResponse.json({
                id: patient._id,
                success: true,
                message: "Patient Found"
            })
        }
        else{
            return NextResponse.json({
                success: false,
                message: "Patient Doesn't exist"
            })
        }
        
    } catch (error) {
         console.log(error)

         return NextResponse.json({
            success: false,
            message: "Something went wrong !"
        })
    }
}