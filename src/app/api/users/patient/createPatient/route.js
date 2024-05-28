import mongoose from "mongoose";
import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Patient from "@/app/models/users/patient";
import bcrypt from "bcrypt"
import QRCode from "qrcode"

export async function POST(req){
    try {
        await connectToDB();

        const {allInfos} = await req.json();


        let patient = await Patient.findOne({carte_id: allInfos.carte_id})
        if (patient){
            return NextResponse.json({
                success: false,
                message: "Carte id already exists !",
              });
        }
        
        const hashedPassword = await bcrypt.hash(allInfos.password, 10);

        patient = new Patient({
            first_name: allInfos.first_name,
            last_name: allInfos.last_name,
            email: allInfos.email,
            numero_tel: allInfos.numero_tel,
            emergency_number: allInfos.emergency_number,
            birth_date: allInfos.birth_date,
            gender: allInfos.gender,
            blood_type: allInfos.blood_type,
            address: allInfos.address,
            carte_id: allInfos.carte_id,
            situation: allInfos.situation,
            nbr_children: allInfos.nbr_children,
            password: hashedPassword,
            role: "P",
            allergies: [],
            maladies: [],
            antecedents: [],
            radios: [],
            analyses: [],
            chirurgies: [],
        })

        await patient.save();

        const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/scan/${patient._id}`);

        patient.qrCodeUrl = qrCodeUrl;
        await patient.save();

        
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