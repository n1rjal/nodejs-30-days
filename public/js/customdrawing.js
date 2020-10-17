var canvas = document.getElementById("poster");
var ctx = canvas.getContext("2d");

const makeUserBasedDrawing = () => {
  var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(canvasData.data);
};

//if user is allowed drawing
let isDrawing = false;

const getMousePosition = (event) => {
  var rect = canvas.getBoundingClientRect();
  console.log([event.clientX, event.clientY]);
  mousePos = { X: event.clientX, Y: event.clientY };
  return { X: mousePos.X - rect.x, Y: mousePos.Y - rect.y };
};

canvas.addEventListener("mousedown", function (event) {
  //enable drawing
  isDrawing = true;
});

canvas.addEventListener("mouseup", function (event) {
  //disable drawing
  isDrawing = false;
});

canvas.addEventListener("mousemove", function (event) {
  console.log(isDrawing);
  if (!isDrawing) return;
  var mousePosition = getMousePosition(event);
  ctx.fillStyle = "white";
  ctx.fillRect(mousePosition.X, mousePosition.Y, 1, 1);
});

makeUserBasedDrawing();
