import mongoose from "mongoose";
import connectToDB from "@/app/database";
import Patient from "@/app/models/users/patient";
import { NextResponse } from "next/server";



export async function GET(req){

    
    const searchParams = req.nextUrl.searchParams;

    const id = searchParams.get("id");

    try {
        await connectToDB();

        const res = await Patient.findOne({_id : id});

        return NextResponse.json({
            data: res,
            success: true,
            message: "Patient Found"
          });
        
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong !"
          });
    }
}