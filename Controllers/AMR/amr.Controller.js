const ROSLIB = require("roslib");

const { Amr_Model } = require("../../Model/amr.Model");

const { send_Amr } = require("../STATION/send_Amr");

const { start } = require("../START/start.Controller");

async function getAmrList(req, res) {

  try {

    const amrs = await Amr_Model.find()

    res.send(amrs)

  } catch (error) {

    res.send("error in geeting all amr's data")

  }

}

async function addAmr(req, res) {

  console.log(req.body);

  let { name, IP, position, amr_id } = req.body

  // amr_id=Math.random*1000+Date.now()

  //   console.log(name,IP,amr_id);

  if (!name || !IP || !amr_id) {

    const resError = {

      message: 'An error occurred',

      details: { err: "Please Enter IP and Name" },

    };

    // Send an error response with a status code of 500

    res.status(500).json(resError);

    return

  }

  const amr = new Amr_Model({ name, IP, position: position || { x: 0, y: 0, theta: 0 }, amr_id: amr_id })

  try {
    console.log("new AMR Added:", name);
    await amr.save()

  

    const data = {

      message: 'Operation successful',

      result: { msg: `${name} added to data base` },

    };
    start()
   // Init_Connection({ IP })

    res.status(200).json(data);

  } catch (error) {

    const resError = {

      message: 'An error occurred',

      details: { error },

    };

    // Send an error response with a status code of 500

    res.status(500).json(resError);

  }

}

async function deleteAmr(req, res) {
console.log(req.params);
console.log("del amr reqest");

try {
  await Amr_Model.deleteOne({_id:req.params.id})
  // const position = await Station_Model.deleteOne({ station_id: station_id })

} catch (error) {
  console.log(error);
}
  res.send("ADD AMR! delete")

}

async function initRobotPosition(req, res) {

  //const {x,y,orientation,theta} =req.body 

  console.log(req.body);

  let { temp_Pose, IP } = req.body

  if (!temp_Pose) {

    console.log("temppose empty");

    let { position } = await Amr_Model.findOne({ IP }).select("position")

    console.log(position);

    position.orientation = {

      x: 0,

      y: 0,

      z: Math.sin(position.theta / 2),

      w: Math.cos(position.theta / 2),

    }

    temp_Pose = position

  }

  let ros = new ROSLIB.Ros({ groovyCompatibility: false })

  ros.on("connection", () => {

    console.log("connected");

  })

  ros.on("close", () => {

    console.log("dis-connected");

  })

  ros.on("error", (error) => {

    console.error("ROS error:", error);

  });

  try {

    ros.connect(`ws://${IP}:${process.env.Robot_PORT}`)

    // ros.connect(`ws://localhost:9090`)

    const publisher2 = new ROSLIB.Topic({

      ros,

      name: "/setinitpose", // Replace with your topic name  /navigate_through_path

      messageType: "geometry_msgs/msg/Pose", // Replace with your message type

    });

    const pose = new ROSLIB.Message({

      position: {

        x: temp_Pose.x,

        y: temp_Pose.y,

        z: 0.0,

      },

      orientation: {

        x: 0.0,

        y: 0.0,

        z: temp_Pose.orientation.z,

        w: temp_Pose.orientation.w

      }

    });

    publisher2.publish(pose);

    publisher2.on("error", (err) => {

      console.log(err);

    });

    return ros

  } catch (error) {

    console.log(error);

    console.log("error in Connecting socket------>  ");

  }

  res.send("robot location changed")

}

async function goToPose(req, res) {

  const { goal, IP } = req.body

  if (goal && IP) {

    goal.position = { x: goal.x, y: goal.y, theta: goal.theta }

    var ros = send_Amr({ ip: IP, position: goal })

    setTimeout(() => {

      ros.close()

    }, 6000)

  }

  res.send("done")

}



module.exports = { getAmrList, addAmr, deleteAmr, initRobotPosition, goToPose }