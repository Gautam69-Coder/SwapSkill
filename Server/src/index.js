import express from "express";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = process.env.PORT || 5002;

app.get("/", (req, res) => {
    res.json("Welcome to SkillSwap World")
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
