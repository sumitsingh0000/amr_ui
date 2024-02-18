// export function showAmr({ mapData, pose, zoom, origin ,index}) {

//   if (!mapData || !pose.x) return;

//   //console.log("here");

//   let color=["blue","green","orange","pink","violet"]
//   const canvas = document.getElementById("mapCanvas2");

//   const ctx = canvas.getContext("2d");

//   const resolution = mapData.info.resolution;



//   const robotPosition = {

//     x: pose.x, // Replace with the x-coordinate of the robot's position in ROS

//     y: pose.y, // Replace with the y-coordinate of the robot's position in ROS

//     orientation: -pose.theta + 1.5708// Replace with the orientation (in radians) of the robot in ROS

//   };

//   //console.log(robotPosition.orientation);

//   //console.log(pose)



//   const robotX = origin.x + robotPosition.x / resolution; // Convert ROS coordinates to canvas coordinates

//   const robotY = origin.y - robotPosition.y / resolution; // Flip the y-coordinate

//   // Save the current canvas state

//   ctx.save();

//   ctx.translate(robotX * zoom, robotY * zoom);

//   ctx.rotate(robotPosition.orientation);

//   // Rotate the canvas based on the robot's orientation

//   // Draw the robot triangle



//   // ctx.moveTo(0, -robotSize);

//   // ctx.lineTo(robotSize, robotSize/2);

//   // ctx.lineTo(-robotSize/2, robotSize);

//   const arrowLength = ((1/resolution)*zoom)+1; // Adjust the length of the arrow

//   const arrowWidth = (1/resolution)*zoom;


//   ctx.beginPath();
//   ctx.moveTo(0, -arrowLength / 2); // Tip of the arrow

//   ctx.lineTo(arrowWidth / 2, arrowLength / 2); // Right point of the arrow base

//   ctx.lineTo(-arrowWidth / 2, arrowLength / 2); // Left point of the arrow ba

//   ctx.closePath();

//   ctx.fillStyle =color[index]; // Set the color of the robot triangle

//   ctx.fill();

//   // Restore the canvas state to prevent the transformation from affecting other elements

//   ctx.restore();

// }


export function showAmr({ mapData, pose, zoom, origin, index,name }) {

  if (!mapData || !pose.x) return;

  //console.log("here");

  let color = ["blue", "green", "orange", "pink", "violet"]
  const canvas = document.getElementById("mapCanvas2");

  const ctx = canvas.getContext("2d");

  const resolution = mapData.info.resolution;



  const robotPosition = {

    x: pose.x, // Replace with the x-coordinate of the robot's position in ROS

    y: pose.y, // Replace with the y-coordinate of the robot's position in ROS

    orientation: -pose.theta + 1.5708// Replace with the orientation (in radians) of the robot in ROS

  };





  const robotX = (origin.x + robotPosition.x / resolution) * zoom; // Convert ROS coordinates to canvas coordinates

  const robotY = (origin.y - robotPosition.y / resolution) * zoom; // Flip the y-coordinate

  ctx.save();

  // ctx.translate(robotX * zoom, robotY * zoom);

  const arrowLength = (((1 / resolution)+10 )* zoom) ; // Adjust the length of the arrow

  const arrowWidth = (1 / resolution) * zoom;
  ctx.translate(robotX, robotY);  // Translate to the center of the rectangle
if(name){
  ctx.fillText(name, 0, -arrowLength);
}
  

  ctx.rotate(robotPosition.orientation)

  ctx.fillStyle = 'red';

  // ctx.fillRect(-(arrowLength / 2)- arrowWidth / 20 , 0, arrowWidth + arrowWidth/5 , arrowLength / 3);
  ctx.fillRect((-arrowWidth/2)-arrowWidth/20, -arrowLength / 6, arrowWidth + arrowWidth/5 , arrowLength / 3);

  ctx.fillStyle = 'silver';
  ctx.fillRect(-arrowWidth/2, -arrowLength/2, arrowWidth, arrowLength);

  // ctx.fillRect(-(arrowLength / 2), -(arrowWidth / 2), arrowWidth, arrowLength);
  // ctx.rotate(robotPosition.orientation);

  ctx.fillStyle = 'orange';

  ctx.fillRect(-(arrowWidth / 2) , -(arrowLength / 2), arrowWidth / 10, arrowLength);

  ctx.fillRect(-(arrowWidth / 2)+arrowWidth , -(arrowLength / 2), arrowWidth / 10, arrowLength);

  ctx.fillStyle = 'red';

  ctx.fillRect( arrowWidth / 80 , -(arrowLength / 2), arrowWidth / 20, arrowLength/2);

  

  ctx.fill();


  ctx.restore();

}