import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
    withCredentials: true,
})

export const getTeams = async()=> {
    const {data} = await api.get("/get-teams")
    return data;
}

export const addTeam = async(data) => {
    const response = await api.post("/add", data)
    return response.data;  
}

export const updateTeamName = async(id, data) => {
    const response = await api.patch(`/update/${id}`, data)
    return response.data;
}

export const increaseGoals = async(id) => {
    const response = await api.patch(`/goals/increase/${id}`)
    return response.data;
} 

export const decreaseGoals = async(id) => {
    const response = await api.patch(`/goals/decrease/${id}`)
    return response.data;
} 

export const deleteTeam = async(id) => {
    const response = await api.delete(`/delete/${id}`)
    return response.data
}