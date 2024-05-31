
import { NextResponse } from "next/server";


export async function middleware(req) {

    const url = req.nextUrl.pathname;


    const auth = req.cookies.get("auth")

    if(auth){

    const ath = JSON.parse(auth.value);

    const {id,role} = ath;


    if (url?.startsWith("/admin/doctor") && role !== "D") {
        return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
      }
      if (url?.startsWith("/admin/centre") && role !== "C") {
          return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
        }
        if (url?.startsWith("/admin/labo") && role !== "L") {
          return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
        }  
        if (url?.startsWith("/admin/superAdmin") && role !== "A") {
          return NextResponse.redirect(new URL("/loginSuperAdmin", req.url));
        }  
        if (url?.startsWith("/account/") && role !== "P") {
          return NextResponse.redirect(new URL("/login", req.url));
        }  
        if (url?.startsWith("/account/") && id !== url.split("/")[2]) {
          return NextResponse.redirect(new URL("/login", req.url));
        }  

    }

    else{


        if (url?.startsWith("/admin/doctor")) {
            return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
          }
          if (url?.startsWith("/admin/centre")) {
              return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
            }
            if (url?.startsWith("/admin/labo")) {
              return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
            }  
            if (url?.startsWith("/admin/superAdmin")) {
              return NextResponse.redirect(new URL("/loginSuperAdmin", req.url));
            }  
            if (url?.startsWith("/account/")) {
              return NextResponse.redirect(new URL("/login", req.url));
            }  
            if (url?.startsWith("/account/")) {
              return NextResponse.redirect(new URL("/login", req.url));
            }  
    
    }

}