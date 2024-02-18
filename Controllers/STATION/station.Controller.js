const { Amr_Model } = require("../../Model/amr.Model");

const { Station_Model } = require("../../Model/station.Model");

const { chooseAmr } = require("./choose_Amr");

const { send_Amr } = require("./send_Amr");



async function addStation(req, res) {



    const { name, station_id, position } = req.body



    const station = new Station_Model({ name, station_id, position })

    try {

        await station.save()

        try {

            const stations = await Station_Model.find()

            res.send(stations)

        } catch (error) {

            res.send("unable to get station list")

        }

    } catch (error) {

        res.send("error in saving station")

    }



}

async function delStation(req, res) {
    const { station_id } = req.query
    console.log(req.query, station_id);
    const position = await Station_Model.deleteOne({ station_id: station_id })
    res.send("successs")
}
async function getStation(req, res) {

    try {

        const stations = await Station_Model.find()

        res.send(stations)

    } catch (error) {

        res.send("unable to get station list")

    }



}

async function goToStation(req, res) {

    const { station_id, amr_id } = req.body

    // console.log(station_id,amr_id,req.body,"go to station")

    try {

        const position = await Station_Model.findOne({ station_id: station_id }).select("position")

        try {

            const amrs = await Amr_Model.find()

            let ip = chooseAmr({ amrs, amr_id, position })
// console.log(ip,position);
            if (ip && position) {

                var ros = send_Amr({ ip, position })

                setTimeout(() => {

                    ros.close()

                }, 10000)

            }

        } catch (error) {

            console.log("error in 1", error);

        }

    } catch (error) {

        console.log("error in 2", error);

        res.end("Station doesn't Exist")

    }

    res.send({

        status: "success"

    })

}

module.exports = { addStation, getStation, goToStation, delStation }