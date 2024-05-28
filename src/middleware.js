
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  
  async function middleware(req) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.role;
    const userId = req?.nextauth?.token?.id;

    if (url?.startsWith("/admin/doctor") && userRole !== "M") {
      return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
    }
    if (url?.startsWith("/admin/centre") && userRole !== "C") {
        return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
      }
      if (url?.startsWith("/admin/labo") && userRole !== "L") {
        return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
      }  
      if (url?.startsWith("/admin/superAdmin") && userRole !== "A") {
        return NextResponse.redirect(new URL("/loginAsAdmin", req.url));
      }  
      if (url?.startsWith("/account/") && userRole !== "P") {
        return NextResponse.redirect(new URL("/login", req.url));
      }  
      if (url?.startsWith("/account/") && userId !== url.split("/")[2]) {
        return NextResponse.redirect(new URL("/login", req.url));
      }  
    
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*","/account/:path*"],
};