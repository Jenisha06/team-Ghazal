import { getToken } from "./auth";

const API_URL = "http://localhost:5000";

export async function apiRequest(
    endpoint,
    options = {}
) {
    const token = getToken() || (typeof localStorage !== "undefined" ? localStorage.getItem("token") : null);

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        }
    );

    return response.json();
}

export async function apiFetch(url, options = {}) {
    const token = getToken();

    return fetch(
        `${API_URL}${url}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers
            }
        }
    );
}