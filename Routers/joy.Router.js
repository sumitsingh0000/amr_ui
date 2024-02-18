const { Router } = require("express")

const { joy_move, joy_stop } = require("../Controllers/JOY/joy.Controller")

const joyRouter = Router()



joyRouter.post("/move", joy_move)

joyRouter.post("/stop", joy_stop)





module.exports = { joyRouter }