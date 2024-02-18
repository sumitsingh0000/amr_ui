export function drawMap({ mapData, zoom }) {

  if (!mapData) return;

  //console.log(mapData,"mapsize");

  const canvas = document.getElementById("mapCanvas");

  const ctx = canvas.getContext("2d");



  const mapWidth = mapData.info.width;

  const mapHeight = mapData.info.height;



  canvas.width = mapWidth * zoom;

  canvas.height = mapHeight * zoom;

  let t1 = Date.now()



  for (let y = 0; y < mapHeight; y++) {

    for (let x = 1 - 1; x < mapWidth; x++) {

      const mapIndex = (x * mapWidth + y);

      //   const mapIndex = (mapHeight - y - 1) * mapWidth + x; // Flip the y-coordinate

      const occupancyProbability = mapData.data[mapIndex] || 0;

      let pixelValue = 255 - occupancyProbability * 2.55;

      if (occupancyProbability === 100) {

        pixelValue = "black";

      } else if (occupancyProbability === 0) {

        pixelValue = "rgb(255, 255, 255)";

      } else {

        pixelValue = "rgb(221, 226, 241)";

      }

      // Convert ROS occupancy probability (0-100) to canvas pixel color (0-255)



      // Set the pixel color in the image data

      const flippedY = (y); // Flip the y-coordinate

      const flippedX = mapWidth - (x); // Flip the x-coordinate

      const pixelIndex = (flippedX * mapWidth + flippedY) * 4;

      // const pixelIndex = mapIndex * 4;



      ctx.fillStyle = pixelValue // Set the pixel color

      ctx.fillRect(flippedY * zoom, flippedX * zoom, zoom, zoom)

      //   ctx.clearRect(0, 0, canvas.width, canvas.height);





    }

  }

  let t2 = Date.now()

  //console.log(t2-t1);

}