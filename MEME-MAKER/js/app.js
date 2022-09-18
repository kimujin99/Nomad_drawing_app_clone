const lineWidth = document.getElementById("line-width");

//캔버스
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 700;

//브러시 두께
ctx.lineWidth = lineWidth.value;
let isPaining = false;

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
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousedown", (e) => {
  isPaining = true;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", canclePainting);
canvas.addEventListener("mouseleave", canclePainting);

//브러시 두께 설정
lineWidth.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

