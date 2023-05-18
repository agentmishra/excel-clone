const theadRow = document.getElementById("table-heading-row");
const tBody = document.getElementById("table-body");
let currentCell;

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
    td.addEventListener("focus", (event) => onFocusFunction(event));
    tr.appendChild(td);
  }
  tBody.appendChild(tr);
}

function onFocusFunction(event) {
  currentCell = event.target;
  console.log(currentCell);
  document.getElementById("current-cell").innerText = currentCell.id;
}
