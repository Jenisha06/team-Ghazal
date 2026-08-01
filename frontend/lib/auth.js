import { jwtDecode } from "jwt-decode";


export function saveToken(token){

    localStorage.setItem(
        "token",
        token
    );


    document.cookie = 
    `token=${token}; path=/; max-age=2592000`;

}



export function getToken(){

    return localStorage.getItem(
        "token"
    );

}



export function getUser(){

    const token=getToken();


    if(!token)
        return null;


    return jwtDecode(token);

}



export function logout(){

    localStorage.removeItem(
        "token"
    );


    document.cookie =
    "token=; path=/; max-age=0";


    window.location.href="/login";

}