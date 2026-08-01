const API_URL = "http://localhost:5000";


export async function apiRequest(
    endpoint,
    options={}
){

    const token = localStorage.getItem("token");


    const response = await fetch(
        `${API_URL}${endpoint}`,
        {

            ...options,

            headers:{
                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`,

                ...options.headers
            }

        }
    );


    return response.json();

}

export async function apiFetch(url,options={}){


    return fetch(
        `http://localhost:5000${url}`,
        {
            ...options,
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                ...options.headers
            }
        }
    );

}