const {Router}=require("express")

const { start } = require("../Controllers/START/start.Controller")

const startRouter=Router()

startRouter.post("/",start)

module.exports={startRouter}