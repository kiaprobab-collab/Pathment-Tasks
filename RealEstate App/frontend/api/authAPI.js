import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: true
})

export const authRegister = async(data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
}

export const authLogin = async(data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
}

export const authLogout = async() => {
    const response = await api.get("/auth/logout");
    return response.data;
}

export const authGoogle = async(data) => {
    const response = await api.post("/auth/google", data);
    return response.data;
}
