const { Router } = require("express")

const { getmap, getcostmap, getMappingmap, saveMap } = require("../Controllers/MAP/map.Controller")

const mapRouter = Router()

mapRouter.get("/get", getmap)

mapRouter.get("/costmap",getcostmap)

mapRouter.get("/mapping/:ip",getMappingmap)

mapRouter.post("/save",saveMap)



module.exports = { mapRouter }