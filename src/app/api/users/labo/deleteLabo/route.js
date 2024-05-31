import connectToDB from "@/app/database";
import Labo from "@/app/models/users/labo";
import { NextResponse } from "next/server";





export async function POST(req){
    try {

        await connectToDB();

        const {id} = await req.json();


        const labo = await Labo.deleteOne({_id: id})



        return NextResponse.json({
            success: true,
            message: "deleted successfully"
        })
        
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: "deletion failed"
        })
    }
}