const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Battery = require("./battery");

mongoose.connect("mongodb+srv://kadurienzo:ballsdeep%402025@mern.zylr0.mongodb.net/Sales?retryWrites=true&w=majority&appName=MERN").
then(()=> console.log("Connected to MongoDb")).
catch((error)=> console.log("Unable to connect MongoDB",error));

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

const PORT = 8800;

app.listen(PORT,()=>{
  console.log("Server is on and running");
});


app.post("/send", async (req,res)=>{
   const {deviceName,batteryLevel} = req.body;
     try {
        const batteryData = new Battery.schema({deviceName,batteryLevel});
        await batteryData.save();
        res.status(201).send("Successfuly sent device battery status in the database");
     } catch (error) {
        res.status(404).send("Unable to locate database",error);
     }
});

app.get("/status", async (req,res)=>{
    try {
        const batteryStatus = await Battery.find({});
        res.status(200).json(batteryStatus);
    } catch (error) {
        res.status(500).send("Unable to find and retrive data "); 
    }
});