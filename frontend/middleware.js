import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";


export function middleware(request) {


    const token = request.cookies.get("token")?.value;


    const { pathname } = request.nextUrl;



    // Protect admin dashboard

    if(
        pathname.startsWith("/dashboard")
    ){

        if(!token){

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }


        try{

            const user = jwtDecode(token);



            if(user.role !== "admin"){

                return NextResponse.redirect(
                    new URL("/login",request.url)
                );

            }


        }
        catch(err){

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }

    }



    // Protect technician dashboard

    if(
        pathname.startsWith("/technician/dashboard")
    ){

        if(!token){

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }


        try{

            const user = jwtDecode(token);



            if(user.role !== "technician"){

                return NextResponse.redirect(
                    new URL("/login",request.url)
                );

            }


        }
        catch(err){

            return NextResponse.redirect(
                new URL("/login",request.url)
            );

        }

    }



    return NextResponse.next();

}



export const config = {

    matcher:[
        "/dashboard/:path*",
        "/technician/dashboard/:path*"
    ]

};