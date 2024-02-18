const mongoose = require("mongoose");

require("dotenv").config()

var connection;

connection = mongoose.connect(process.env.url).then(() => {

    console.log("connected with mongoDB");

}).catch((error) => {

    console.log("Unable to connect with mongoDB",error);
    console.error(`trying to connect with ${process.env.url} but mongoserver is not running on this URL`)

})



module.exports = { connection }