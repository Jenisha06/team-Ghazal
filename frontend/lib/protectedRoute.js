import {getUser} from "./auth";


export function requireTechnician(){

    const user=getUser();


    if(!user)
    {
        window.location.href="/login";
        return null;
    }


    if(user.role !== "TECHNICIAN")
    {
        window.location.href="/dashboard";
        return null;
    }


    return user;

}