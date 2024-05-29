import connectToDB from "@/app/database";
import { NextResponse } from "next/server";
import Medecin from "@/app/models/users/medecin";
import Labo from "@/app/models/users/labo";
import Centre from "@/app/models/users/centre";



export async function GET(){

   try {
     await connectToDB();

     const medecins = await Medecin.find({isValide: false})

     const labos = await Labo.find({isValide: false});

     const centres = await Centre.find({isValide: false});


     const data = {
        medecins: medecins,
        labos: labos,
        centres: centres,
     }



     return NextResponse.json({
        data: data,
        success: true,
        message: "fetched successfully"
     })

   } catch (error) {
      console.log(error)

      return NextResponse.json({
        success: false,
        message: "Something went wrong !"
     })
   }

}