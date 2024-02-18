export function drawScanData({ mapData, setloadingFalse, laserData, zoom, pose, origin }) {

  if (!mapData || !laserData || laserData.length == 0 || !pose) return;

  //console.log("mapsize");

  const canvas = document.getElementById("mapCanvas2");

  const ctx = canvas.getContext("2d");



  const mapWidth = mapData.info.width;

  const mapHeight = mapData.info.height;



  canvas.width = mapWidth * zoom;

  canvas.height = mapHeight * zoom;

  const resolution = mapData.info.resolution;



  const robotPosition = {

    x: pose.x, // Replace with the x-coordinate of the robot's position in ROS

    y: pose.y, // Replace with the y-coordinate of the robot's position in ROS

    orientation: -pose.theta + 1.5708// Replace with the orientation (in radians) of the robot in ROS

  };

  //console.log(robotPosition.orientation);

  //console.log(pose)b



  const robotX = origin.x + robotPosition.x / resolution; // Convert ROS coordinates to canvas coordinates

  const robotY = origin.y - robotPosition.y / resolution;



  laserData.forEach((e, i) => {

    // console.log(e);



    if (e) {

      //  console.log((robotPosition.orientation)*180/Math.PI);

      let adjecent = ((Math.cos(((i - (robotPosition.orientation) * 180 / Math.PI) * Math.PI / 180))) * e) / resolution//MATH.abs(math.cos(i)*e)

      let opposite = ((Math.sin(((i - (robotPosition.orientation) * 180 / Math.PI) * Math.PI / 180))) * e) / resolution//Math.abs(math.sin(i)*e)

      ctx.fillStyle = "red" // Set the pixel color

      //console.log(Math.floor((robotX+adjecent) * zoom),Math.floor((robotY+opposite) * zoom));

      // ctx.fillRect(Math.floor((robotX+adjecent) * zoom), Math.floor((robotY+opposite) * zoom), zoom, zoom)

      ctx.fillRect(Math.floor((robotX - opposite) * zoom), Math.floor((robotY - adjecent) * zoom), zoom * .8, zoom *.8)

    }

  });

}



