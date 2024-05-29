import connectToDB from "@/app/database";
import Centre from "@/app/models/users/centre";
import { NextResponse } from "next/server";





export async function POST(req){
    try {

        await connectToDB();

        const {id} = await req.json();


        const centre = await Centre.findOneAndUpdate({_id: id}, {isValide: true});



        return NextResponse.json({
            success: true,
            message: "validated successfully"
        })
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: "validation failed"
        })
    }
}