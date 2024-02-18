export function showTempStation({ mapData, pose, zoom, origin }) {

  if (!mapData || !pose) return;

  const canvas = document.getElementById("mapCanvas2");

  const ctx = canvas.getContext("2d");

  const resolution = mapData.info.resolution;

  pose = pose.pose

  const robotPosition = {

    x: pose.x, // Replace with the x-coordinate of the robot's position in ROS

    y: pose.y, // Replace with the y-coordinate of the robot's position in ROS

    orientation: -pose.theta + 1.5708// Replace with the orientation (in radians) of the robot in ROS

  };

  //console.log(robotPosition.orientation);

  //console.log(pose)



  const robotX = origin.x + robotPosition.x / resolution; // Convert ROS coordinates to canvas coordinates

  const robotY = origin.y - robotPosition.y / resolution; // Flip the y-coordinate

  // Save the current canvas state

  ctx.save();

  ctx.translate(robotX * zoom, robotY * zoom);

  ctx.rotate(robotPosition.orientation);

  // Rotate the canvas based on the robot's orientation

  // Draw the robot triangle

  ctx.beginPath();

  // ctx.moveTo(0, -robotSize);

  // ctx.lineTo(robotSize, robotSize/2);

  // ctx.lineTo(-robotSize/2, robotSize);

  const arrowLength = 20; // Adjust the length of the arrow

  const arrowWidth = 15;



  ctx.moveTo(0, -arrowLength / 2); // Tip of the arrow

  ctx.lineTo(arrowWidth / 2, arrowLength / 2); // Right point of the arrow base

  ctx.lineTo(-arrowWidth / 2, arrowLength / 2); // Left point of the arrow ba

  ctx.closePath();

  ctx.fillStyle = "green"; // Set the color of the robot triangle

  ctx.fill();

  // Restore the canvas state to prevent the transformation from affecting other elements

  ctx.restore();

}