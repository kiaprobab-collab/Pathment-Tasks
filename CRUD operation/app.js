const express = require("express");
const { FootBall } = require("./model.js");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/get-teams",async (req, res) => {
    try {
        const data = await FootBall.find().lean();

        return res.status(200).json({
            data,
            length: data.length,
            message: data.length === 0 ? "No Teams Available" : "Team Fetched Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

app.post("/add", async (req, res) => {
  // console.log(req.body)
  const { teamName, goals } = req.body;

  if (!teamName) {
    return res.status(400).json({
      message: "Team name is required",
    });
  }
  
  const data = {
    teamName,
    goals,
  };
  const savedData = await FootBall.create(data);

  res.status(201).json({
    savedData,
    message: "Data Created Successfully",
  });
});

app.patch("/update/:id",async(req, res) => {
    try {
    console.log(req.body);
    const {id} = req.params;
    const {newTeamName} = req.body;
    
    const foundTeam = await FootBall.findByIdAndUpdate(id, {
        teamName: newTeamName
    },{ new: true })

    console.log(foundTeam)
    if(!foundTeam){
        return res.status(404).json({
            message: "Team not found"
        })
    }

    res.status(200).json({
        message: "Updated Successfully",
        data: foundTeam
    })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })    
    }
})

app.delete("/delete/:id", async(req, res) => {
    try {
        const {id} = req.params;

        const deleteTeam = await FootBall.findByIdAndDelete(id);

        if(!deleteTeam){
            return res.json(404).json({
                message: "Team not found"
            })
        }

        return res.status(200).json({
            deleteTeam,
            message: "Team Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


app.patch("/goals/:id", async(req, res)=>{
   try {
    const {id} = req.params;
    const {amount} = req.body;


    const updateScore = await FootBall.findOneAndUpdate({_id:id},
        {$inc: {goals: amount}},
        { returnDocument: "after" }
    )

    if(!updateScore){
        return res.status(404).json({
            message: "Team not found"
        })
    }

    return res.status(200).json({
        updateScore,
        message: "Score updated Successfully"
    })

   } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
   } 
})

module.exports = app;
