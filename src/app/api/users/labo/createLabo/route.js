import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Labo from "@/app/models/users/labo";
import bcrypt from "bcrypt"

export async function POST(req){
    try {
        await connectToDB();

        const {allInfos} = await req.json();

        let labo = await Labo.findOne({email: allInfos.email})
        if (labo){
            return NextResponse.json({
                success: false,
                message: "Carte id already exists !",
              });
        }
        
        const hashedPassword = await bcrypt.hash(allInfos.password, 10);

        labo = new Labo({
            nom: allInfos.nom,
            email: allInfos.email,
            numero_tel: allInfos.numero_tel,
            address: allInfos.address,
            certificat: allInfos.certificat,
            role: "L",
            password: hashedPassword,
            isValide: false,
        })

        await labo.save();


        
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