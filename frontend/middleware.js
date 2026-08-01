import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";


export function middleware(request) {

    const token = request.cookies.get("token")?.value;


    const { pathname } = request.nextUrl;


    // If no token and trying to access dashboard
    if (
        !token &&
        pathname.startsWith("/dashboard")
    ) {

        return NextResponse.redirect(
            new URL("/login", request.url)
        );

    }


    // If token exists, verify role
    if(token){

        try{

            const user = jwtDecode(token);


            // Only admin dashboard
            if(
                pathname.startsWith("/dashboard") &&
                user.role !== "admin"
            ){

                return NextResponse.redirect(
                    new URL("/login", request.url)
                );

            }


        }
        catch(error){

            return NextResponse.redirect(
                new URL("/login", request.url)
            );

        }

    }


    return NextResponse.next();

}



export const config = {

    matcher:[
        "/dashboard/:path*"
    ]

};