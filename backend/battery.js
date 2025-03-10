const mongoose = require("mongoose");

const batteryDataSchema = new mongoose.Schema({
    deviceName:{type:String,required:true},
    batteryLevel:{type:String,required:true},
});

module.exports  = mongoose.model("Battery",batteryDataSchema);