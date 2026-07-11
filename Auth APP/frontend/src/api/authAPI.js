import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true
})

export const authRegister = async(data) => {
    const response = await api.post("/register", data);
    return response.data;
}

export const authLogin = async(data) => {
    const response = await api.post("/login", data);
    return response.data;
}

export const authLogout = async() => {
    const response = await api.get("/logout");
    return response.data;
}

