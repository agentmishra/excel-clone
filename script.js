const theadRow = document.getElementById("table-heading-row");
const tBody = document.getElementById("table-body");
let currentCell;
let cutValue = {};
////
const boldButton = document.getElementById("bold-btn");
const italicsButton = document.getElementById("italics-btn");
const underlineButton = document.getElementById("underline-btn");
////
const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");
////
const leftAlignButton = document.getElementById("left-align");
const centerAlignButton = document.getElementById("center-align");
const rightAlignButton = document.getElementById("right-align");
////
const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");
///
const cutButton = document.getElementById("cut-button");
const copyButton = document.getElementById("copy-button");
const pasteButton = document.getElementById("paste-button");
//
// rows
const rows = 100;
// col
const cols=26;

let matrix = new Array(rows);

for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(cols);
  for (let j = 0; j < cols; j++) {
    matrix[i][j] = {};
  }
}


function updateMatrix(currentCell) {
  let obj = {
    style: currentCell.style.cssText,
    text: currentCell.innerText,
    id: currentCell.id, // A1, A2, A3, B1,B2,B3
  };
  let id = currentCell.id.split("");
  // if we go horizontally
  // id=['A',1]; -> 0,0
  // id=['B',1]; -> 0,1
  // id=['C',1]; -> 0,2

  //if we go vertically
  // id=['A',1]; -> 0,0
  // id=['A',2]; -> 1,0
  // id=['A',3]; -> 2,0
  //eventually I want to this
  let i = id[1] - 1;
  let j = id[0].charCodeAt(0) - 65;
  matrix[i][j] = obj;
}

// for adding heading in excel sheet;
for (let col = 65; col <= 90; col++) {
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(col);
  theadRow.append(th);
}

for (let row = 1; row <= 100; row++) {
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = row;
  tr.appendChild(th);
  // looping from A to Z;
  for (let col = 1; col <= 26; col++) {
    let td = document.createElement("td");
    td.setAttribute("contenteditable", "true");
    // colRow -> A1, B1, C1, D1,
    td.setAttribute("id", `${String.fromCharCode(col + 64)}${row}`);
    // this is the event listener
    td.addEventListener("focus", (event) => onFocusFunction(event));
    td.addEventListener("input",(event)=> onInputFunction(event));
    tr.appendChild(td);
  }
  tBody.appendChild(tr);
}

//onInputFunction
function onInputFunction(event){
  updateMatrix(event.target);
  console.log(matrix);
}

//BOLD BUTTON
boldButton.addEventListener("click", () => {
  if (currentCell.style.fontWeight == "bold") {
    currentCell.style.fontWeight = "normal";
  } else currentCell.style.fontWeight = "bold";

///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

//Italics button
italicsButton.addEventListener("click", () => {
  if (currentCell.style.fontStyle == "italic") {
    currentCell.style.fontStyle = "normal";
  } else currentCell.style.fontStyle = "italic";

///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

//Underline button
underlineButton.addEventListener("click", () => {
  if (currentCell.style.textDecoration == "underline") {
    currentCell.style.textDecoration = "none";
  } else currentCell.style.textDecoration = "underline";

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

// textColor
textColor.addEventListener("change",()=>{
  currentCell.style.color=textColor.value;

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
})

// bgColor
bgColor.addEventListener("change",()=>{
  currentCell.style.backgroundColor=bgColor.value;

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
})

//leftAlign
leftAlignButton.addEventListener("click", () => {
  currentCell.style.textAlign = "left";

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

//centerAlign
centerAlignButton.addEventListener("click", () => {
  currentCell.style.textAlign = "center";

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

//rightAlign
rightAlignButton.addEventListener("click", () => {
  currentCell.style.textAlign = "right";

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

// fontSize
// the fontSize in the right is referencing my dropdown
// the fontSize in the left is referencing my styles of currentCell
fontSize.addEventListener("change", () => {
  currentCell.style.fontSize = fontSize.value;
});

// fontFamily
// the fontFamily in the right is referencing my dropdown
// the fontFamily in the left is referencing my styles of currentCell
fontFamily.addEventListener("change", () => {
  currentCell.style.fontFamily = fontFamily.value;

  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

// cutButton
cutButton.addEventListener("click", () => {
  cutValue = {
    style: currentCell.style.cssText,
    text: currentCell.innerText,
  };
  currentCell.style = null;
  currentCell.innerText = "";
  ///// I need to pass updated currentCell inside updateMatrix;
  updateMatrix(currentCell);
});

// copyButton
copyButton.addEventListener("click",()=>{
  cutValue = {
    style: currentCell.style.cssText,
    text: currentCell.innerText,
  };
})

//pasteButton
pasteButton.addEventListener("click", () => {
  if (cutValue.text) {
    currentCell.style = cutValue.style;
    currentCell.innerText = cutValue.text;

    ///// I need to pass updated currentCell inside updateMatrix;
    updateMatrix(currentCell);
  }
});

// storing out current cell in currentCell;
function onFocusFunction(event) {
  currentCell = event.target;
  console.log(currentCell);
  document.getElementById("current-cell").innerText = currentCell.id;
}
