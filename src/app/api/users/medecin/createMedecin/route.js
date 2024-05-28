import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Medecin from "@/app/models/users/medecin";
import bcrypt from "bcrypt"

export async function POST(req){
    try {
        await connectToDB();

        const {allInfos} = await req.json();

        let medecin = await Medecin.findOne({carte_id: allInfos.carte_id})
        if (medecin){
            return NextResponse.json({
                success: false,
                message: "Carte id already exists !",
              });
        }
        
        const hashedPassword = await bcrypt.hash(allInfos.password, 10);


        
        return NextResponse.json({
            success: true,
            message: "Patient Added"
          });

    }

    catch(error){
        console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }


}