const ROSLIB = require("roslib")

require("dotenv").config()



function send_Amr({ ip, position }) {

  let ros = new ROSLIB.Ros({ groovyCompatibility: false })
// console.log(position,"position");


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

    ros.connect(`ws://${ip}:${process.env.Robot_PORT}`)

    // ros.connect(`ws://localhost:9090`)



    const publisher = new ROSLIB.Topic({

      ros,

      name: '/navigate_through_path', // Replace with your topic name  /navigate_through_path

      messageType: 'nav_msgs/msg/Path', // Replace with your message type

    })

    position.position = position.position || { theta: position.theta }

    let z = Math.sin(position.position.theta / 2)

    let w = Math.cos(position.position.theta / 2)



    let msg = {

      poses: [

        {

          header: {

            frame_id: 'map' // Replace with the desired frame ID (usually 'map' for 2D navigation)

          },

          pose: {

            position: {

              x: position.position.x,

              y: position.position.y,

              z: 0.0

            },

            orientation: {

              x: 0.0,

              y: 0.0,

              z: z||0.0,

              w: w||0.0

            }

          }

        }

      ]

    }
console.log(z,w,position.position.x,position.position.y);
    const message = new ROSLIB.Message(msg);

    publisher.publish(message);



    return ros





  } catch (error) {

    console.log(error);

    console.log("error in Connecting socket------>  ");

  }

}

module.exports = { send_Amr }