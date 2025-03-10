const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Battery = require("./battery"); // Import the Battery model

mongoose.connect("mongodb+srv://kadurienzo:ballsdeep%402025@mern.zylr0.mongodb.net/Sales?retryWrites=true&w=majority&appName=MERN")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Unable to connect to MongoDB", error));

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 8800;

app.listen(PORT, () => {
  console.log(`Server is on and running on port ${PORT}`);
});

// ✅ Correct way to create and save battery data
app.post("/send", async (req, res) => {
  try {
    const { deviceId, deviceName, batteryLevel } = req.body;

    // Validate request data
    if (!deviceId || !deviceName || batteryLevel === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const batteryData = new Battery({ deviceId, deviceName, batteryLevel });
    await batteryData.save();

    res.status(201).json({ message: "Successfully stored battery status" });
  } catch (error) {
    console.error("Error saving battery status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Retrieve battery data properly
app.get("/status", async (req, res) => {
  try {
    const batteryStatus = await Battery.find({});
    res.status(200).json(batteryStatus);
  } catch (error) {
    console.error("Error fetching battery status:", error);
    res.status(500).json({ error: "Unable to retrieve battery data" });
  }
});
