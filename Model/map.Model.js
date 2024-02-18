const mongoose = require("mongoose")



const map_Schema = mongoose.Schema({

    header: Object,

    info: Object,

    data: Buffer



})

const Map_Model = mongoose.model("map", map_Schema);

const cost_map_Schema = mongoose.Schema({

    header: Object,

    info: Object,

    data: Buffer

})

const Cost_Map_Model = mongoose.model("costmap", cost_map_Schema);

const MappingSchema = mongoose.Schema({

    header: Object,

    info: Object,

    data: Buffer,

    amrIP:String

})

const MappingModel = mongoose.model("mapping", MappingSchema);

module.exports = { Map_Model ,Cost_Map_Model,MappingModel}

