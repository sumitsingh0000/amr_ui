const ROSLIB = require("roslib");

const { Amr_Model } = require("../../Model/amr.Model");

const { Map_Model, Cost_Map_Model, MappingModel } = require("../../Model/map.Model");

const { Station_Model } = require("../../Model/station.Model");


async function setRos({ IP, ros }) {

  await Amr_Model.updateOne({ IP }, { $set: { ros: ros } })

}


async function Init_Connection({ IP }) {

  let ros = new ROSLIB.Ros({ groovyCompatibility: false })

  //  setRos({IP,ros})
  let id;
  ros.on("close", async () => {

    try {

      await Amr_Model.updateOne({ IP }, { $set: { isConnected: false } })

      clearInterval(id)

      console.error("connection disconnected with IP :", IP);

    } catch (error) {

      console.log("unable to update in database", error);

    }


  })


  ros.on("connection", async () => {

    try {

      await Amr_Model.updateOne({ IP }, { $set: { isConnected: true } })

      console.log("Server connected with Robot IP: ", IP);

    } catch (error) {

      console.log("unable to update in database");

    }


  })




  ros.on("error", async (error) => {

    try {

      console.error("Unable to connect with Robot IP :", IP, error.message);

      clearInterval(id)

      await Amr_Model.updateOne({ IP }, { $set: { isConnected: false } })

    } catch (error) {

      console.log("unable to update in database");

    }


  });
  ros.on('connection', async () => {
    const service = new ROSLIB.Service({
      ros: ros,
      name: '/map_server/get_state',
      serviceType: 'lifecycle_msgs/srv/GetState'
    });

    const request = new ROSLIB.ServiceRequest({});

    try {
      service.callService(request, async (result) => {

        try {
          await Amr_Model.updateOne({ IP }, { $set: { map_server: result.current_state.label } });
          console.log('map_server updated successfully', result.current_state.label);
        } catch (error) {
          console.error("Unable to save map_server  state in the database", error);
        }

      });
    } catch (error) {
      console.error('Error calling service:', error);
    }
  });

  ros.on('connection', async () => {
    const service = new ROSLIB.Service({
      ros: ros,
      name: '/costmap_filter_info_server/get_state',
      serviceType: 'lifecycle_msgs/srv/GetState'
    });

    const request = new ROSLIB.ServiceRequest({});

    try {
      service.callService(request, async (result) => {

        try {
          await Amr_Model.updateOne({ IP }, { $set: { cost_map: result.current_state.label } });
          console.log('costmap updated successfully', result.current_state.label);
        } catch (error) {
          console.error("Unable to save costmap state in the database", error);
        }

      });
    } catch (error) {
      console.error('Error calling service:', error);
    }
  });


  ros.on('connection', async () => {
    const service = new ROSLIB.Service({
      ros: ros,
      name: '/amcl/get_state',
      serviceType: 'lifecycle_msgs/srv/GetState'
    });

    const request = new ROSLIB.ServiceRequest({});

    try {
      service.callService(request, async (result) => {

        try {
          await Amr_Model.updateOne({ IP }, { $set: { amcl: result.current_state.label } });
          console.log('amcl updated successfully', result.current_state.label);
        } catch (error) {
          console.error("Unable to save amcl state in the database", error);
        }

      });
    } catch (error) {
      console.error('Error calling service:', error);
    }
  });


  try {

    //ros.connect(`ws://${IP}:${PORT}`)

    ros.connect(`ws://${IP}:${process.env.Robot_PORT}`)

    // ros.connect(`ws://localhost:9090`)

  } catch (error) {

    console.log("error in Connecting socket------>  ");

  }

  let pose_Subscriber = new ROSLIB.Topic({

    ros: ros,

    name: "map_to_base_link_pose2d",

    messageType: "std_msgs/Float64MultiArray"

  }

  )

  pose_Subscriber.subscribe(async (data) => {

    let [x, y, theta] = data.data;
    //console.log("pose");
    //console.log(data);
    try {

      await Amr_Model.updateOne({ IP }, { $set: { position: { x, y, theta } } })

    } catch (error) {

      console.log("unable to update Robot's pose in database", error);

    }



  })

  let map_Subscriber = new ROSLIB.Topic({

    ros: ros,

    name: "/map",

    messageType: "nav_msgs/OccupancyGrid",

  });

  map_Subscriber.subscribe(async (data) => {



    let map = new Map_Model(data)
    let mapping = new MappingModel({ ...data, amrIP: IP })
    // console.log("fetching map");
    await Map_Model.deleteMany({})


    try {

      await map.save()

      const existingObject = await MappingModel.findOne({ amrIP: IP });
      if (existingObject) {
        // console.log(data.data.length,existingObject.data.length);

        await MappingModel.updateOne({ amrIP:IP }, { $set: { header: data.header, info: data.info, data: data.data } })  //   header: Object,info: Object, data: Buffer, amrIP:String
      } else {
        await mapping.save()

        // await MappingModel.deleteMany({})
      }
      // console.log("map fetched");

    } catch (error) {

      console.log("unable to save map in database", error);


    }

  });

  // let cost_map_Subscriber = new ROSLIB.Topic({

  //   ros: ros,

  //   name: "/global_costmap/costmap",//  /keepout_filter_mask   /global_costmap/costmap

  //   messageType: "nav_msgs/OccupancyGrid",

  // });

  // cost_map_Subscriber.subscribe(async (data) => {

  //   let cost_map = new Cost_Map_Model(data)
  //  // console.log(data);
  //  await Cost_Map_Model.deleteMany({})
  //   try {

  //     await cost_map.save()

  //    // console.log("cost map fetched");

  //   } catch (error) {

  //     console.log("unable to save cost map in database", error);


  //   }

  // });



  let path_subscriber = new ROSLIB.Topic({

    ros,

    name: "plan",

    messageType: "nav_msgs/msg/Path",

  });

  path_subscriber.subscribe(async (data) => {

    try {

      await Amr_Model.updateOne({ IP }, { $set: { path: data.poses } })

    } catch (error) {

      console.log("unable to save Robot's path in database", error);

    }

  });

  let laserScan_Subscriber = new ROSLIB.Topic({

    ros: ros,

    name: "/scan",

    messageType: "sensor_msgs/msg/LaserScan"

  }

  )

  laserScan_Subscriber.subscribe(async (data) => {

    try {
      await Amr_Model.updateOne({ IP }, { $set: { laserData: data.ranges } })

    } catch (error) {
      console.log("unable to update robot's laser data in database", error);

    }


  })

  //battery_percent

  let status_Subscriber = new ROSLIB.Topic({

    ros: ros,

    name: "/master/state",

    messageType: "anzo_hardware_msg/msg/DiffRobotState"

  }

  )

  status_Subscriber.subscribe(async (data) => {

    await Amr_Model.updateOne({ IP }, { $set: { status: data, battery: data.battery_percent } })

  })


  // let rearRadar_Subscriber = new ROSLIB.Topic({

  //   ros: ros,

  //   name: "/master/state",

  //   messageType: "anzo_hardware_msg/msg/DiffRobotState"

  // }

  // )

  // rearRadar_Subscriber.subscribe(async (data) => {

  //   if (data) {
  //     await Amr_Model.updateOne({ IP }, { $set: { isRearRadarConnected: true } })
  //   } else {
  //     await Amr_Model.updateOne({ IP }, { $set: { isRearRadarConnected: false } })

  //     // do something, that will stop amr to moving backwards

  //   }



  // })
  let rearRadar_Subscriber = new ROSLIB.Topic({

    ros: ros,

    name: "/front_lidar/scan",

    messageType: "sensor_msgs/msg/LaserScan"

  }

  )

  rearRadar_Subscriber.subscribe(async (data) => {

    if (data && data.ranges && data.ranges.length > 0) {
      await Amr_Model.updateOne({ IP }, { $set: { isRearRadarConnected: true } })
    } else {
      await Amr_Model.updateOne({ IP }, { $set: { isRearRadarConnected: false } })

      // do something, that will stop amr to moving backwards

    }



  })





  let joy_pub = new ROSLIB.Topic({

    ros,

    name: '/diffbot_base_controller/cmd_vel_unstamped'

    , // Replace with your topic name  /cmd_vel //  /diffbot_base_controller/cmd_vel_unstamped

    messageType: 'geometry_msgs/msg/Twist', // Replace with your message type geometry_msgs/msg/Twist

  });//geometry_msgs/msg/Twist

  id = setInterval(async () => {

    try {
      let obj = await Amr_Model.findOne({ IP: IP }).select("joy").select("joyData")

      // console.log("stoped");

      if (obj.joy && obj.joyData) {

        // console.log(obj.joyData);

        //  console.log("v : -",IP);

        let twist = new ROSLIB.Message({

          linear: { x: obj.joyData.linear.x, y: 0, z: 0 },

          angular: { x: 0, y: 0, z: obj.joyData.angular.z },

        });

        joy_pub.publish(twist)

      }

      obj = null;

      twist = null;

    } catch (error) {

      console.log("unable to fetch joy data");

    }


  })






}

module.exports = { Init_Connection }