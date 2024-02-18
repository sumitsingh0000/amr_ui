const mongoose = require("mongoose")



const station_Schema = mongoose.Schema({

    name: String,

    station_id: Number,

    position: Object

})

const Station_Model = mongoose.model("sation", station_Schema);

module.exports = { Station_Model }

