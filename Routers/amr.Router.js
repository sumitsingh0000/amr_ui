const { Router } = require("express")



const { getAmrList, addAmr, deleteAmr, initRobotPosition, goToPose } = require("../Controllers/AMR/amr.Controller")



const amrRouter = Router()



amrRouter.get("/list", getAmrList)

amrRouter.post("/add", addAmr)

amrRouter.delete("/delete:id", deleteAmr)

amrRouter.post("/initpose", initRobotPosition)

amrRouter.post("/go", goToPose)




//  amr/data/:id


// amrRouter.patch("/update",(req,res)=>{

//     res.send("udated amr IP or Name")

// })



module.exports = { amrRouter }