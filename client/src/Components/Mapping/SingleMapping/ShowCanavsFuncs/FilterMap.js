

const filterMap = ({ mapData, zoom, prevMapData = [] }) => {
    if (!mapData)
        return

    // console.log(prevMapData);
    let map = mapData.data.data
    // console.log({ map, prevMapData });
    let t1 = Date.now()
    let j = 0
    let filteredmap = []
    for (let i = 0; i < map.length; i++) {
        let element = map[i]
        if (i >= prevMapData.length || element != map) {
            // console.log("true");
            prevMapData[i] =map[i]
                filteredmap.push({
                    isChanged: true,
                    value: element
                })

        } else {
            filteredmap.push({
                isChanged: false,
                value: element
            })
        }

        //   filteredmap.push(obj)
        // console.log(k);
    }

    let t2 = Date.now()
    console.log(t2 - t1, prevMapData.length, filteredmap.length);
    drawMap({ mapData, zoom, filteredmap }).then(()=>{
        console.log("draw map done");
    }).catch((err)=>{
        console.log("err inn drawmap");
    })
    //  setPrevMapData(map)
    // console.log(setPrevMapData);

}



async function drawMap({ mapData, zoom, filteredmap }) {
    if (!mapData) return;

    const canvas = document.getElementById("mapCanvas");
    const ctx = canvas.getContext("2d");

    const mapWidth = mapData.info.width;
    const mapHeight = mapData.info.height;

    canvas.width = mapWidth * zoom;
    canvas.height = mapHeight * zoom;

    const batchSizeX = 1000; // Adjust the batch size based on your performance testing
    const batchSizeY = 15;
    for (let y = 0; y < mapHeight; y += batchSizeY) {
        for (let x = 0; x < mapWidth; x += batchSizeX) {
            renderBatch({ filteredmap, mapData, zoom, ctx, startX: x, startY: y, batchSizeX, batchSizeY, mapHeight });
            await sleep(0); // Allow time for the UI to update before processing the next batch
        }
    }

    return true;
}

async function renderBatch({ mapData, zoom, ctx, startX, startY, batchSizeY, filteredmap, batchSizeX, mapHeight }) {
    const endX = Math.min(startX + batchSizeX, mapData.info.width);
    const endY = Math.min(startY + batchSizeY, mapHeight);
    // console.log(filteredmap);
    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            const mapIndex = y * mapData.info.width + x;

            if (filteredmap[mapIndex].isChanged) {
                const occupancyProbability = filteredmap[mapIndex].value || 0;
                const pixelValue = getPixelValue(occupancyProbability);

                const flippedX = x; // Flip the x-coordinate for factory map
                const flippedY = mapHeight - y - 1; // Flip the y-coordinate

                ctx.fillStyle = pixelValue;
                ctx.fillRect(flippedX * zoom, flippedY * zoom, zoom * 2, zoom * 2);
            } else {
                // console.log("not changed");
            }

        }

    }
}

function getPixelValue(occupancyProbability) {
    if (occupancyProbability === 100) {
        return "#6C25BE";
    } else if (occupancyProbability === 0) {
        return "white";
    } else {
        return "#dfdff0";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export default filterMap
