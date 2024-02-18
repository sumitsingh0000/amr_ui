export function showStations({ stations, zoom, mapData, origin }) {

  if (!mapData) return;



  const canvas = document.getElementById("mapCanvas2");

  const ctx = canvas.getContext("2d");

  const resolution = mapData.info.resolution;



  //console.log(stations);

  stations.forEach((e) => {

    // console.log(e);

    const stationPosition = {

      x: e.position.x, // Replace with the x-coordinate of the robot's position in ROS

      y: e.position.y, // Replace with the y-coordinate of the robot's position in ROS

      orientation: -e.position.theta + 1.5708, // Replace with the orientation (in radians) of the robot in ROS

    };



    //console.log(pose)

    const stationX = origin.x + stationPosition.x / resolution; // Convert ROS coordinates to canvas coordinates

    const stationY = origin.y - stationPosition.y / resolution; // Flip the y-coordinate

    ctx.save();

    ctx.translate(stationX * zoom, stationY * zoom);
    const arrowLength = 20; // Adjust the length of the arrow

    const arrowWidth = 15;


    const nameX = 0; // Adjust the X coordinate for station name

    const nameY = -arrowLength / 2 - 10;

    ctx.textAlign = "center";

    ctx.textBaseline = "bottom";

    ctx.fillStyle = "black"; // Set the color for station names

    ctx.font = "12px Arial"; // Set the font size and style for station names

    ctx.fillText(e.name, nameX, nameY);

    ctx.rotate(stationPosition.orientation);

   


    ctx.moveTo(0, -arrowLength / 2); // Tip of the arrow

    ctx.lineTo(arrowWidth / 2, arrowLength / 2); // Right point of the arrow base

    ctx.lineTo(-arrowWidth / 2, arrowLength / 2)

    // Left point of the arrow ba

    // ctx.moveTo(0,arrowLength)

    // ctx.lineTo(arrowWidth / 2, arrowLength / 2)

    // ctx.lineTo(-arrowWidth / 2, arrowLength / 2)

    // ctx.lineTo(arrowWidth / 2, arrowLength )

    ctx.closePath();

    // ctx.fillStyle = "rgb(0, 0, 80)"; // Set the color of the robot triangle

    ctx.fillStyle = "red"

    ctx.fill();

    // Restore the canvas state to prevent the transformation from affecting other elements

    

    ctx.restore();// (x, y, width, height)



    // ctx.save();

    // ctx.translate(stationX * zoom, stationY * zoom);

    // ctx.rotate(stationPosition.orientation);



    // const pentagonSize = 10; // Adjust the size of the pentagon

    // ctx.beginPath();

    // const angle = (2 * 2 * Math.PI) ;

    // const x = Math.cos(angle)/pentagonSize  ;

    // const y = Math.sin(angle)/pentagonSize ;

    // ctx.lineTo(x, y);

    // for (let i = 0; i < 5; i++) {

    //   if(i==0||i==4){

    //     const angle = (i * 2 * Math.PI) / 5;

    //     const x = Math.cos(angle) * pentagonSize*4;

    //     const y = Math.sin(angle) * pentagonSize;

    //     ctx.lineTo(x, y);

    //   }else{

    //     const angle = (i * 2 * Math.PI) / 5;

    //     const x = Math.cos(angle) ;

    //     const y = Math.sin(angle) * pentagonSize;

    //     ctx.lineTo(x, y);

    //   }



    // }

    // ctx.closePath();



    // ctx.fillStyle = "rgb(0, 0, 80)";

    // ctx.fill();



    // const nameX = 0;

    // const nameY = -pentagonSize - 10;

    // ctx.textAlign = "center";

    // ctx.textBaseline = "bottom";

    // ctx.fillStyle = "black";

    // ctx.font = "12px Arial";

    // ctx.fillText(e.name, nameX, nameY);



    // ctx.restore();

  });







}