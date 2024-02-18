export function showGoal({ mapData, goal, zoom, origin }) {



  if (!mapData || !goal) return;

  const canvas = document.getElementById("mapCanvas2");

  const ctx = canvas.getContext("2d");

  const resolution = mapData.info.resolution;

  // console.log(goal);

  const goalPosition = {

    x: goal.x, // Replace with the x-coordinate of the robot's position in ROS

    y: goal.y, // Replace with the y-coordinate of the robot's position in ROS

    orientation: -goal.theta + 1.5708// Replace with the orientation (in radians) of amr in ROS

  };



  //console.log(pose)

  const goalSize = 3 * zoom; // Adjust the size of the robot triangle as needed

  const goalX = origin.x + goalPosition.x / resolution; // Convert ROS coordinates to canvas coordinates

  const goalY = origin.y - goalPosition.y / resolution; // Flip the y-coordinate

  // Save the current canvas state

  ctx.save();

  // console.log("---------------------------------");

  // console.log("robot location in meter: x, y ",robotPosition.x,robotPosition.y )

  // console.log("ROBOT LOCATION in pixel : x, y", robotX,robotY);

  // console.log("location in Meter Conveerted",pixel_to_meter({x:robotX,y:robotY,resolution,origin}))

  // Translate the canvas to the robot's position

  ctx.translate(goalX * zoom, goalY * zoom);

  ctx.rotate(goalPosition.orientation);



  // Rotate the canvas based on the robot's orientation

  // Draw the robot triangle

  ctx.beginPath();

  const arrowLength = 20; // Adjust the length of the arrow

  const arrowWidth = 15;



  ctx.moveTo(0, -arrowLength / 2); // Tip of the arrow

  ctx.lineTo(arrowWidth / 2, arrowLength / 2); // Right point of the arrow base

  ctx.lineTo(-arrowWidth / 2, arrowLength / 2);

  ctx.closePath();

  ctx.fillStyle = "red"; // Set the color of the robot triangle

  ctx.fill();

  // Restore the canvas state to prevent the transformation from affecting other elements

  ctx.restore();

}