const { Router } = require("express")

const { addStation, getStation, goToStation, delStation } = require("../Controllers/STATION/station.Controller")

const stationRouter = Router()

goToStation

stationRouter.post("/add", addStation)
stationRouter.delete("/del", delStation)

stationRouter.get("/list", getStation)

stationRouter.post("/go", goToStation)



module.exports = { stationRouter }