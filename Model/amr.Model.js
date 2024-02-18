const mongoose = require("mongoose")

const ROSLIB = require("roslib");



const amr_Schema = mongoose.Schema({

  name: String,

  IP: String,

  path: Array,

  position: Object,

  amr_id: Number,

  ros: Object,

  laserData: Array,

  isBusy: Boolean,

  battery: Number,

  status: Object,

  isConnected:Boolean,

  joy:Boolean,
  
  joyData:Object,
   
  map_server :String,



  cost_map : String,
  isFrontRadarConnected:Boolean,
  
  isRearRadarConnected:Boolean,

  amcl : String,
 
  battery_status : Object,


})

const Amr_Model = mongoose.model("amr", amr_Schema);

module.exports = { Amr_Model }
