const ROSLIB = require("roslib")
const { Amr_Model } = require("../../Model/amr.Model")

let ros = new ROSLIB.Ros({ groovyCompatibility: false })



async function joy_move(req, res) {

    const { obj } = req.body

    const { linear, angular } = obj

    //console.log(obj.active_amr.IP);
    // console.log({ linear, angular });
    await Amr_Model.updateOne({ IP: obj.active_amr.IP }, { $set: { joy: true, joyData: { linear, angular } } })

    res.send("done")
}


async function joy_stop(req, res) {

    const { obj } = req.body


    //console.log(obj.active_amr.IP);
    console.log("stopped");
    await Amr_Model.updateOne({ IP: obj.active_amr.IP }, { $set: { joy: false, joyData: { linear: { x: 0, y: 0, z: 0 }, angular: { x: 0, y: 0, z: 0 } } } })

    res.send("done")
}

module.exports = { joy_move, joy_stop }