export const pixel_to_meter = ({ x, y, resolution, origin }) => {

  const location = { x: 0, y: 0 }

  location.x = (x - origin.x) * resolution;

  location.y = (origin.y - y) * resolution;

  // console.log(origin);

  // console.log("location x,y -> ",location.x,location.y);

  //     const robotX = origin.x + robotPosition.x / resolution; 

  //   const robotY = origin.y - robotPosition.y / resolution;



  return location

}

export const getScaleMultiplier = (delta, zoomSpeed = 1) => {

  let speed = 0.065 * zoomSpeed

  let scaleMultiplier = 1

  if (delta > 0) { // zoom out

    scaleMultiplier = (1 - speed)

  } else if (delta < 0) { // zoom in

    scaleMultiplier = (1 + speed)

  }



  return scaleMultiplier

}