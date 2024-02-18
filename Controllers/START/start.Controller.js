const { Amr_Model } = require("../../Model/amr.Model");

const { Init_Connection } = require("./initConnection");



async function start(req, res) {

    try {

        let amrs = await Amr_Model.find().select("IP").select("isConnected")

        // console.log(amrs);

        amrs.forEach(({ IP, isConnected }) => {

            try {

                if (!isConnected) {

                    console.log(IP,"is not connected yet, trying again");

                    Init_Connection({ IP })

                }



            } catch (error) {


            }

        });

        res && res.send("amrs")

    } catch (error) {

        res && res.send("Error in starting")

    }

}

async function start_Initial(req, res) {

    try {

        let amrs = await Amr_Model.find().select("IP").select("isConnected")

        // console.log(amrs);

        amrs.forEach(({ IP, isConnected }) => {



            Init_Connection({ IP })



        });

        res && res.send(amrs)

    } catch (error) {

        res && res.send("Error in starting")

    }

}

module.exports = { start, start_Initial }                