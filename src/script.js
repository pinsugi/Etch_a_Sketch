document.addEventListener("DOMContentLoaded", () => {
  const clearbtn = document.querySelector(".clear");
  const erasebtn = document.querySelector(".erase");
  const rainbowbtn = document.querySelector(".rainbow");
  const selector = document.querySelector("#selector");
  const slider = document.querySelector("#slider");

  const onemode = document.querySelector(".onemode");
  const sizeSlider = document.getElementById("sizeSlider");
  const sizeValue = document.getElementById("sizeValue");

  const gridContainer = document.getElementById("myGrid");
  const colorGenerater = document.getElementById("Ce");

  // Check if gridContainer is found
  if (!gridContainer) {
    console.error("Grid container not found");
    return;
  }
  const numRows = 50;
  const numCols = 50;
  const totalSquares = numRows * numCols;

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function updateGridSize() {
    const size = parseInt(sizeSlider.value);
    sizeValue.textContent = size;
    gridContainer.style.gridTemplateRows = `repeat(${numRows}, ${size}px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${numCols}, ${size}px)`;
  }

  function createGrid(rows, cols) {
    let isDrawing = false;
    let isErase = false;
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.style.color = "black";

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");

      square.className = "square";
      square.style.textAlign = "center";
      square.style.verticalAlign = "middle";

      square.addEventListener("mousedown", () => (isDrawing = true));
      square.addEventListener("mouseup", () => (isDrawing = false));
      square.addEventListener("mousemove", (e) => {
        if (isDrawing) {
          square.style.backgroundColor = "orange";
        }
      });
      clearbtn.addEventListener("click", (isDrawing) => {
        square.style.backgroundColor = "";
      });
      erasebtn.addEventListener("click", (e) => {
        square.addEventListener("mousemove", (e) => {
          if (isDrawing) {
            square.style.backgroundColor = "";
          }
        });
      });
      let selectedcolor = "#000000";

      selector.addEventListener("input", (e) => {
        selectedcolor = e.target.value;
      });

      onemode.addEventListener("click", (e) => {
        square.addEventListener("mousemove", (e) => {
          if (isDrawing) {
            square.style.backgroundColor = selectedcolor;
          }
        });
      });

      rainbowbtn.addEventListener("click", (e) => {
        square.addEventListener("mousemove", (e) => {
          if (isDrawing) {
            square.style.backgroundColor = getRandomColor();
          }
        });
      });

      gridContainer.appendChild(square);
    }
  }

  createGrid(numRows, numCols);
  updateGridSize();
  sizeSlider.addEventListener("input", updateGridSize);
});
