//컬러 팔레트
const color = document.getElementById("color");
const colorRow1 = document.getElementById("color-row1");
const colorRow2 = document.getElementById("color-row2");

//버튼
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");

//브러시 두께
const lineWidth = document.getElementById("line-width");

//캔버스
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

//브러시 두께
ctx.lineWidth = lineWidth.value;
let isPaining = false;

//채우기
let isFilling = false;

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
  "#ffffff",
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
    ctx.fillRect(0, 0, 700, 700);
  }
});

//지우개
destroyBtn.addEventListener("click", () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 700, 700);
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
  });

  colorRow.appendChild(colorOption);
}

//채우기 버튼 설정
modeBtn.addEventListener("click", function () {
  if (isFilling) {
    isFilling = false;
    modeBtn.classList.add("draw");
    modeBtn.classList.remove("fill");
  } else {
    isFilling = true;
    modeBtn.classList.add("fill");
    modeBtn.classList.remove("draw");
  }
});
