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
    tr.appendChild(td);
  }
  tBody.appendChild(tr);
}

//BOLD BUTTON
boldButton.addEventListener("click", () => {
  if (currentCell.style.fontWeight == "bold") {
    currentCell.style.fontWeight = "normal";
  } else currentCell.style.fontWeight = "bold";
});

//Italics button
italicsButton.addEventListener("click", () => {
  if (currentCell.style.fontStyle == "italic") {
    currentCell.style.fontStyle = "normal";
  } else currentCell.style.fontStyle = "italic";
});

//Underline button
underlineButton.addEventListener("click", () => {
  if (currentCell.style.textDecoration == "underline") {
    currentCell.style.textDecoration = "none";
  } else currentCell.style.textDecoration = "underline";
});

// textColor
textColor.addEventListener("change",()=>{
  currentCell.style.color=textColor.value;
})

// bgColor
bgColor.addEventListener("change",()=>{
  currentCell.style.backgroundColor=bgColor.value;
})

//leftAlign
leftAlignButton.addEventListener("click", () => {
  currentCell.style.textAlign = "left";
});

//centerAlign
centerAlignButton.addEventListener("click", () => {
  currentCell.style.textAlign = "center";
});

//rightAlign
rightAlignButton.addEventListener("click", () => {
  currentCell.style.textAlign = "right";
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
});

// cutButton
cutButton.addEventListener("click", () => {
  cutValue = {
    style: currentCell.style.cssText,
    text: currentCell.innerText,
  };
  currentCell.style = null;
  currentCell.innerText = "";
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
  }
});

// storing out current cell in currentCell;
function onFocusFunction(event) {
  currentCell = event.target;
  console.log(currentCell);
  document.getElementById("current-cell").innerText = currentCell.id;
}


