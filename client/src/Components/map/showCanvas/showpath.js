export function showPath({ mapData, path, zoom, origin,index }) {

  if (!path.length && !mapData) return;

let color=["blue","green","orange","pink","violet"]

  const resolution = mapData.info.resolution;

  const canvas = document.getElementById("mapCanvas2");

  const ctx = canvas.getContext("2d");



  const lineColor = color[index];

  const lineWidth = 2;



  //ctx.clearRect(0, 0, canvas.width, canvas.height);



  ctx.strokeStyle = lineColor;

  ctx.lineWidth = lineWidth;





  for (let i = 2; i < path.length; i += 1) {



    const startPoint = path[i - 2].pose.position;

    const endPoint = path[i].pose.position;

    ctx.beginPath();

    ctx.lineWidth = 2 * zoom

    ctx.moveTo(

      (startPoint.x / resolution + origin.x) * zoom,

      (origin.y - startPoint.y / resolution) * zoom,

    );

    ctx.lineTo(

      (endPoint.x / resolution + origin.x) * zoom,

      (origin.y - endPoint.y / resolution) * zoom,

    );

    ctx.stroke();

  }





}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}