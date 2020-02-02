const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const savebtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE; //html의 태그 옆에 써주는거랑 똑같다
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaninting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //painting === false
    ctx.beginPath(); //좌표설정
    ctx.moveTo(x, y);
  } else {
    //painting === true
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "draw ";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleCM(event) {
  event.preventDefault(); //마우스 우클릭 안먹히게 하는 법
}
function handleSaveClick() {
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "Done!"; //html에서 a(앵커)태그에 다운로드쓴거랑 똑같
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPaninting);
  canvas.addEventListener("mouseleave", stopPaninting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
); /*여기서 color는 배열안에 있는 아이템을 나타내는것 
      이름을 potato 같은 무의미한 것으로 바꿔도 상관없다.*/

if (range) {
  range.addEventListener("input", changeRange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (savebtn) {
  savebtn.addEventListener("click", handleSaveClick);
}
