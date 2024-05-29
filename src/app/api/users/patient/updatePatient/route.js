import Patient from "@/app/models/users/patient";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        await connectToDB();

        console.log("routee detectedd")

        const {id,allInfos} = await req.json();

        const patient = await Patient.findOneAndUpdate({_id: id} , { $set: allInfos });

        if(!patient){
            return NextResponse.json({
                success: false,
                message: "Update went wrong !"
            })
        }


        return NextResponse.json({
            success: true,
            message: "Update successfully !"
        })



    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: "Something went wrong !"
        })
    }
}