export async function drawMap({ mapData, zoom }) {

    if (!mapData) return;
  
    //console.log(mapData,"mapsize");
  
    //  console.log(mapData.data.data);
  
    const canvas = document.getElementById("mapCanvas");
  
    const ctx = canvas.getContext("2d");
  
    const mapWidth = mapData.info.width;
  
    const mapHeight = mapData.info.height;
  
    canvas.width = mapWidth * zoom;
  
    canvas.height = mapHeight * zoom;
  
    //console.log(canvas.width, canvas.height);
  
    let t1 = Date.now()
  
    for (let y = 0; y < mapWidth; y++) {
  
      for (let x = 1 - 1; x < mapHeight; x++) {
  
        const mapIndex = (x * mapWidth + y);
  
        //   const mapIndex = (mapHeight - y - 1) * mapWidth + x; // Flip the y-coordinate
  
        const occupancyProbability = mapData.data.data[mapIndex] || 0;
  
        let pixelValue = 255 - occupancyProbability * 2.55;
  
  
  
        if (occupancyProbability === 100) {
  
         
  
          pixelValue = "rgb(112, 136, 160)";
          // pixelValue = "black";
          pixelValue = "#6C25BE";
  
        } else if (occupancyProbability === 0) {
  
          //pixelValue="red"
  
          //  pixelValue = "rgb(255, 255, 255)";
  
  
  
          pixelValue = "white";
          
  
        } else {
  
          pixelValue = "rgb(198, 207, 212,.700)";
  
          pixelValue="#dfdff0"
  
          //  pixelValue="red"
  
        }
  
        // Convert ROS occupancy probability (0-100) to canvas pixel color (0-255)
  
  
  
        // Set the pixel color in the image data
  
        // const flippedY =  (y); // Flip the y-coordinate  turtlebot
  
        // const flippedX =  mapWidth-(x) ; // Flip the x-coordinate  for turtlebot
  
        const flippedX = (y); // Flip the x-coordinate for factory map
  
        const flippedY = mapHeight - (x); // Flip the y-coordinate
  
        const pixelIndex = (flippedX * mapWidth + flippedY) * 4;
  
        // const pixelIndex = mapIndex * 4;
  
        ctx.fillStyle = pixelValue // Set the pixel color
  
        ctx.fillRect(flippedX * zoom, flippedY * zoom, zoom*2, zoom*2)
  
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      }
  
    }
  
    let t2 = Date.now()
  
    //console.log(t2-t1);
  return true
  }