import { jwtDecode } from "jwt-decode";


// Get JWT from cookie
export function getToken(){

    const cookies = document.cookie.split("; ");


    const tokenCookie = cookies.find(
        (row)=> row.startsWith("token=")
    );


    if(!tokenCookie)
        return null;


    return tokenCookie.split("=")[1];

}



// Decode user information from JWT
export function getUser(){

    const token = getToken();


    if(!token)
        return null;


    try{

        return jwtDecode(token);

    }
    catch(error){

        return null;

    }

}



// Logout
export function logout(){

    document.cookie =
    "token=; path=/; max-age=0";


    window.location.href="/login";

}