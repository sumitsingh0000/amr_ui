const express = require("express")

const path = require('path');



const cors = require("cors")

const { connection } = require("./Config/db")

const { amrRouter } = require("./Routers/amr.Router")

const { startRouter } = require("./Routers/start.Router")

const { stationRouter } = require("./Routers/station.Router")

const { mapRouter } = require("./Routers/map.Router")

const { start, start_Initial } = require("./Controllers/START/start.Controller")

const { joyRouter } = require("./Routers/joy.Router")

const app = express()

require("dotenv").config()



//console.log(app);

app.use(cors({

    origin: "*"

}))

start_Initial()

app.use(express.json())

app.use(express.static('client/build'));



app.use("/amr", amrRouter)

app.use("/start", startRouter)

app.use("/station", stationRouter)

app.use("/map", mapRouter)

app.use("/joy", joyRouter)

let s = `

.         |||||
.         || ||
.         || ||
.     ||||||||||||||
.    ||| || || || ||
.    ||| || || || ||
.     ||||||||||||||        
`


app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

});



// console.log(process.env.url);

app.listen(process.env.PORT, () => {

    console.log(`server in running port ${process.env.PORT}`);

    connection

})
