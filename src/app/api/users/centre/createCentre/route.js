import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Centre from "@/app/models/users/centre";
import bcrypt from "bcrypt"

export async function POST(req){
    try {
        await connectToDB();

        const {allInfos} = await req.json();

        let centre = await Centre.findOne({email: allInfos.email})
        if (centre){
            return NextResponse.json({
                success: false,
                message: "Carte id already exists !",
              });
        }
        
        const hashedPassword = await bcrypt.hash(allInfos.password, 10);

        centre = new Centre({
            nom: allInfos.nom,
            email: allInfos.email,
            numero_tel: allInfos.numero_tel,
            address: allInfos.address,
            certificat: allInfos.certificat,
            role: "C",
            password: hashedPassword,
            isValide: false,
        })

        await centre.save();


        
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