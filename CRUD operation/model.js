const mongoose = require("mongoose")

const footBallSchema = new mongoose.Schema({
    teamName: String,
    goals: {
        type:Number,
        default: 0
    }
}, {timestamps: true})


const FootBall = mongoose.model("footBallSchema", footBallSchema);

module.exports = {
    FootBall
}