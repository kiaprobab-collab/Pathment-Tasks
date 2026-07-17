import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: true
})

export const updateUserAPI = async(id, data) => {
    const response = await api.put(`/user/update/${id}`, data);
    return response.data;
}

export const deleteUserAPI = async(id) => {
    const response = await api.delete(`/user/delete/${id}`);
    return response.data;
}
