
export async function drawMap({ mapData, zoom ,id}) {
  if (!mapData) return;
  // console.log("map renderd");
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");

  const mapWidth = mapData.info.width;
  const mapHeight = mapData.info.height;

  // Check if canvas size needs to be updated
  if (canvas.width !== mapWidth * zoom || canvas.height !== mapHeight * zoom) {
    resizeCanvas(canvas, mapWidth * zoom, mapHeight * zoom);
  }

  const batchSizeX = 1000; // Adjust the batch size based on your performance testing
  const batchSizeY = 15;

  for (let y = 0; y < mapHeight; y += batchSizeY) {
    for (let x = 0; x < mapWidth; x += batchSizeX) {
      renderBatch({ mapData, zoom, ctx, startX: x, startY: y, batchSizeX, batchSizeY, mapHeight });
      await sleep(0); // Allow time for the UI to update before processing the next batch
    }
  }

  return true;
}

function resizeCanvas(canvas, width, height) {
  // console.log("map resized");
  canvas.width = width;
  canvas.height = height;
}

async function renderBatch({ mapData, zoom, ctx, startX, startY, batchSizeY, batchSizeX, mapHeight }) {
  const endX = Math.min(startX + batchSizeX, mapData.info.width);
  const endY = Math.min(startY + batchSizeY, mapHeight);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const mapIndex = y * mapData.info.width + x;
      const occupancyProbability = mapData.data.data[mapIndex] || 0;
      const pixelValue = getPixelValue(occupancyProbability);

      const flippedX = x; // Flip the x-coordinate for the factory map
      const flippedY = mapHeight - y - 1; // Flip the y-coordinate

      ctx.globalCompositeOperation = "source-over"; // Reset the globalCompositeOperation
      ctx.fillStyle = pixelValue;
      ctx.fillRect(flippedX * zoom, flippedY * zoom, zoom * 2, zoom * 2);
    }
  }
}

function getPixelValue(occupancyProbability) {
  if (occupancyProbability === 100) {
    // return "white";
    return "#6C25BE";
  } else if (occupancyProbability === 0) {
    // return "black";
    return "white";
  } else {
    // return "white";
    return "#dfdff0";
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}