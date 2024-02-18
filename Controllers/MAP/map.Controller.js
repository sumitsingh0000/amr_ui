const { Map_Model, Cost_Map_Model, MappingModel } = require("../../Model/map.Model")
const ROSLIB = require("roslib");

async function getmap(req, res) {

    const [map] = await Map_Model.find()

    res.send(map)

}

async function getcostmap(req, res) {

    const [cost_map] = await Cost_Map_Model.find()

    res.send(cost_map)

}

async function getMappingmap(req, res) {
    const IP = req.params.ip;
    // console.log(IP);
    const cost_map = await MappingModel.findOne({ amrIP: IP })
    // console.log(cost_map);
    res.send(cost_map)

}

function saveMap(req, res) {
    const IP = req.body.ip

    console.log(IP);
    let ros = new ROSLIB.Ros({ groovyCompatibility: false })

    ros.on("close", async () => {

        console.error("connection disconnected with IP :", IP, "While saving map");

    })

    ros.on('connection', async () => {
        console.log("Server connected with Robot IP: ", IP, "for saving map");
        const service = new ROSLIB.Service({
            ros: ros,
            name: '/amcl/get_state',
            serviceType: 'lifecycle_msgs/srv/GetState'
        });

        const request = new ROSLIB.ServiceRequest({});

        try {
            service.callService(request, async (result) => {

                console.log(result);
                res.send("success")

            });
        } catch (error) {
            console.error('Error calling service: while saving map', error);
            res.status(404).json({

                message: 'Error calling service: while saving map',

                details: { error },

            });

        }
    });



    ros.on("error", async (error) => {

        console.error("Unable to connect with Robot IP :", IP, "While saving map", error.message);

        // Send an error response with a status code of 500

        res.status(404).json({

            message: "Unable to connect with Robot IP :" + IP + "While saving map",

            details: { error },

        });


    });



    // res.status(500).json(resError);
    ros.connect(`ws://${IP}:${process.env.Robot_PORT}`)




}

module.exports = { getmap, getcostmap, getMappingmap, saveMap }