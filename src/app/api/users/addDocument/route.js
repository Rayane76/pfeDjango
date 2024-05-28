import { NextResponse } from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);

export async function POST(req){
    try {
               
            const formData = await req.formData();

            const file = formData.get("file");
            const random = formData.get("random");

            function getCurrentDateFormatted() {
                const today = new Date();
              
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JavaScript
                const year = today.getFullYear();
              
                return `${day}${month}${year}`;
              }
              
              const date = getCurrentDateFormatted()

            const filePath = `./public/files/${random + date + file.name}`;

            await pump(file.stream(), fs.createWriteStream(filePath));





            return NextResponse.json({
                success: true,
                message: "Patient Added"
              });
          
       

           



    } catch (error) {
        console.log(error);
    
        return NextResponse.json({
          success: false,
          message: "Something went wrong!",
        });
    }
}