//이미지 저장 버튼
const saveBtn = document.getElementById("save");

//이미지 파일
const fileInput = document.getElementById("file");

//컬러 팔레트
const color = document.getElementById("color");
const colorRow1 = document.getElementById("color-row1");
const colorRow2 = document.getElementById("color-row2");

//버튼
const fillBtn = document.getElementById("fill");
const destroyBtn = document.getElementById("destroy");
const eraserBtn = document.getElementById("eraser");

//브러시 두께
const lineWidth = document.getElementById("line-width");

//브러시 모양
const lineCap = document.getElementById("brush_radio");

//커서 경로
const PENCILCURSOR = "url(img/pencil.cur), auto";
const ERASERCURSOR = "url(img/eraser.cur), auto";
const BUCKETCURSOR = "url(img/paint_bucket.cur), auto";

//캔버스
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//브러시 두께
ctx.lineWidth = lineWidth.value;
let isPaining = false;

//브러시 모양
ctx.lineCap = "round";

//기본 커서
canvas.style.cursor = PENCILCURSOR;

//채우기
let isFilling = false;

//지우개
let isErasing = false;

//컬러 팔레트 (색상 리스트)
const colorOptions = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
  "#000000",
];

//페인팅 설정
function canclePainting(e) {
  isPaining = false;
}

canvas.addEventListener("mousemove", (e) => {
  if (isPaining) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousedown", (e) => {
  isPaining = true;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);

//채우기
canvas.addEventListener("click", (e) => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
});

//전체 지우개
destroyBtn.addEventListener("click", () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
});

//브러시 두께 설정
lineWidth.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

//컬러 팔레트 설정
color.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});

//팔레트 그리기
for (i = 0; i < colorOptions.length; i++) {
  let colorRow;
  if (i < 7) {
    colorRow = colorRow1;
  } else {
    colorRow = colorRow2;
  }

  const colorOption = document.createElement("div");
  colorOption.style.backgroundColor = colorOptions[i];
  colorOption.className = "color-option";
  colorOption.setAttribute("data-color", colorOptions[i]);

  colorOption.addEventListener("click", (e) => {
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;

    //지우개 버튼 활성화시 비활성화
    if (isErasing) {
      canvas.style.cursor = PENCILCURSOR;
      isErasing = false;
      eraserBtn.checked = false;
    }
  });

  colorRow.appendChild(colorOption);
}

/** -------조금 더 개선할 수 있을것 같음!-------- */
/** -------개선 완료!-------- */
//채우기 버튼 설정
fillBtn.addEventListener("click", function () {
  isErasing = false;
  if (isFilling) {
    canvas.style.cursor = PENCILCURSOR;
    isFilling = false;
    fillBtn.checked = false;
  } else {
    canvas.style.cursor = BUCKETCURSOR;
    isFilling = true;
  }
});

//지우개 버튼 설정
eraserBtn.addEventListener("click", (e) => {
  isFilling = false;
  if (isErasing) {
    canvas.style.cursor = PENCILCURSOR;
    isErasing = false;
    eraserBtn.checked = false;
    ctx.strokeStyle = "#000000";
    color.value = "#000000";
  } else {
    canvas.style.cursor = ERASERCURSOR;
    isErasing = true;
    ctx.strokeStyle = "#ffffff";
    color.value = "#ffffff";
  }
});
/** -------조금 더 개선할 수 있을것 같음!-------- */
/** -------개선 완료!-------- */

//파일 업로드
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
});

//브러시 모양 설정
lineCap.addEventListener("click", () => {
  //브러시 모양
  const lineShape = document.querySelector(
    "#brush_radio input[type=radio]:checked"
  ).value;
  ctx.lineCap = lineShape;
});

//이미지 저장
saveBtn.addEventListener("click", (e) => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
});
