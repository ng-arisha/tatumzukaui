import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";


export function middleware(request:NextRequest) {
    const path = request.nextUrl.pathname;
    console.log("Middleware running for path:", path);

    const isPublicRoute = path === "/login" || path === "/register";
    const token = request.cookies.get("token")?.value ?? null;
    if(isPublicRoute){
        return NextResponse.next();
    }
    if(!token){
        const loginUrl = new URL("/login", request.url);
        if(path === "/login" || path === "/register"){
            return NextResponse.next();
        }
        return NextResponse.redirect(loginUrl);
    }
    let decodedToken :CustomeJwtPayload | null = null;
    try {
        decodedToken = jwtDecode<CustomeJwtPayload>(token!);
        const currentTime = Date.now() / 1000;
        const isTokenExpired = decodedToken.exp && decodedToken.exp < currentTime;
        if(isTokenExpired){
            request.cookies.delete("token");
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
        
    } catch (error) {
        console.error("Error decoding token:", error);
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
        
    }
  }



export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };