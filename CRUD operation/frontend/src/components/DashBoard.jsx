import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { addTeam, getTeams, increaseGoals, updateTeamName, decreaseGoals, deleteTeam} from '../api/foorBallAPI';

const DashBoard = () => {
    const [data, setData] = useState({ data: [] }); 
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const [isEditing, setIsEditing] = useState(null); 
    const [text, setText] = useState("");

    async function fetchTeams() {
        try {
            setLoading(true);
            const res = await getTeams();
            console.log(res.data);
            setData(res); 
        } catch (error) {
            console.error("Failed to fetch teams:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    async function increaseTeamGoal(id) {
        try {
            await increaseGoals(id)
            await fetchTeams();
        } catch (error) {
            console.error(error);
        }
    }

    
    async function decreaseTeamGoal(id) {
        try {
            await decreaseGoals(id)
            await fetchTeams();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(value) {
        if (!value) return;
        
        const teamName = {
            teamName: value
        };

        try {
            await addTeam(teamName);
            setValue(""); 
            fetchTeams(); 
        } catch (error) {
            console.error(error);
        }
    }


    const handleEditClick = (item) => {
        setIsEditing(item._id); 
        setText(item.teamName); 
    };


    async function updateTeam(id, updatedName) {
        try {
            await updateTeamName(id, { newTeamName: updatedName });
            console.log(`Updating team ${id} to ${updatedName}`);
            
            setIsEditing(null); 
            fetchTeams();       
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteFifaTeam(id) {
        try {
            await deleteTeam(id)  
            fetchTeams();
        } catch (error) {
            console.error(error);
        }
        
    }

return (
    <div
        style={{
            maxWidth: "700px",
            margin: "40px auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        }}
    >
        <h1
            style={{
                textAlign: "center",
                marginBottom: "20px",
            }}
        >
            Manage Scores
        </h1>

        <div
            style={{
                display: "flex",
                gap: "10px",
                marginBottom: "25px",
            }}
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Team Name"
                style={{
                    flex: 1,
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                }}
            />

            <button
                onClick={() => handleSubmit(value)}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                Add Team
            </button>
        </div>

        {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
            data?.data?.map((item) => (
                <div
                    key={item._id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "15px",
                        background: "#fafafa",
                    }}
                >
                    <h2 style={{ margin: "0 0 10px 0" }}>
                        {item.teamName}
                    </h2>

                    <p
                        style={{
                            fontSize: "18px",
                            marginBottom: "15px",
                        }}
                    >
                        Goals: <strong>{item.goals}</strong>
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        <button
                            onClick={() => increaseTeamGoal(item._id)}
                            style={{
                                padding: "8px 14px",
                                background: "green",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Increase Goal
                        </button>

                        <button
                            onClick={() => decreaseTeamGoal(item._id)}
                            style={{
                                padding: "8px 14px",
                                background: "orange",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Decrease Goal
                        </button>

                        <button
                            onClick={() => deleteFifaTeam(item._id)}
                            style={{
                                padding: "8px 14px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Delete Team
                        </button>
                    </div>

                    {isEditing === item._id ? (
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                autoFocus
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                }}
                            />

                            <button
                                onClick={() =>
                                    updateTeam(item._id, text)
                                }
                                style={{
                                    padding: "8px 14px",
                                    background: "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setIsEditing(null)}
                                style={{
                                    padding: "8px 14px",
                                    background: "#0f0f0f",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleEditClick(item)}
                            style={{
                                padding: "8px 14px",
                                background: "#010101",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Edit Name
                        </button>
                    )}
                </div>
            ))
        )}
    </div>
);
}
export default DashBoard;
