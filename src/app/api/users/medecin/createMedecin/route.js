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

        medecin = new Medecin({
            first_name: allInfos.first_name,
            last_name: allInfos.last_name,
            email: allInfos.email,
            numero_tel: allInfos.numero_tel,
            address: allInfos.address,
            carte_id: allInfos.carte_id,
            certificat: allInfos.certificat,
            specialite: allInfos.specialite,
            role: "M",
            password: hashedPassword,
            isValide: false,
        })

        await medecin.save();


        
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