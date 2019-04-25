/***********************************
  Name: William McKinnon
  Date: April 14, 2019
  Project: Grade Calculator Site
***********************************/

// GLOBAL VARIABLES
var numRows = 0; // number of marks in table
var goal = 0;

$(document).ready(function() {

  numRows = 0; // number of marks in table
  goal = 0;

  /***********************************
    Event Listeners
  ***********************************/

  // add mark listener
  $("#addMarkForm").submit(function(e) {
    e.preventDefault();
    var grade = document.getElementById("gradeVal").value;
    var weight = document.getElementById("weightVal").value;
    if(!isGrade(grade) || !isGrade(weight)) {
      alert("Please Enter Valid Grade / Weight");
    }
    else {
      numRows++;
      addRow(numRows, grade, weight);
      updateStatus();
    }
  });

  // add set goal listener
  document.getElementById("setGoalBtn").addEventListener("click", function() {
    goal = prompt("Please Enter Your Goal");
    if(!isGrade(goal)) {
      alert("Please Enter a Valid Grade");
    }
    else {
      document.getElementById("gradeToGoalText").innerHTML = "Grade to Goal Of " + parseFloat(Math.round(goal * 100) / 100).toFixed(2) + "%";
      if(numRows != 0) {
        updateStatus();
      }
    }
  });

});


/***********************************
  Functions
***********************************/

// adds a row to the mark table
function addRow(num, grade, weight) {
  var tableRef = document.getElementById("gradeTable").getElementsByTagName("tbody")[0];

  var newRow = tableRef.insertRow(tableRef.rows.length);

  var numCell = newRow.insertCell(0);
  numCell.appendChild(document.createTextNode(num));

  var gradeCell = newRow.insertCell(1);
  gradeCell.appendChild(document.createTextNode(parseFloat(Math.round(grade * 100) / 100).toFixed(2) + "%"));

  var weightCell = newRow.insertCell(2);
  weightCell.appendChild(document.createTextNode(parseFloat(Math.round(weight * 100) / 100).toFixed(2) + "%"));

  var buttonCell = newRow.insertCell(3);
  var delButton = document.createElement("button");
  delButton.innerHTML = "X"
  delButton.classList.add("deleteButton");
  delButton.addEventListener("click", deleteRow);
  buttonCell.appendChild(delButton);
}


// event listener function for row delete buttons
function deleteRow(row) {
  var rowToDelete = this.parentNode.parentNode.rowIndex;
  document.getElementById("gradeTable").deleteRow(rowToDelete);
  updateRowNum();
  updateStatus();
}


// function to update the row values of a table with their corresponding num
function updateRowNum() {
  var tableRef = document.getElementById("gradeTable").getElementsByTagName("tbody")[0];
  numRows = tableRef.rows.length;
  for(var i in tableRef.rows) {
    tableRef.rows[i].cells[0].innerHTML = parseInt(i, 10) + 1;
  }
}


// updates the status
function updateStatus() {
  var rows = document.getElementById("gradeTable").rows;
  var totalWeight = 0;
  var grade = 0;

  for(var i = 1; i < rows.length; i++) {
    var weight = rows[i].cells[2].innerHTML.slice(0, -1) / 100;
    totalWeight += weight;
    grade += rows[i].cells[1].innerHTML.slice(0, -1) * weight;
  }

  if(totalWeight == 0) {
    document.getElementById("currentGrade").innerHTML = "0.00%";
  }
  else {
    document.getElementById("currentGrade").innerHTML = parseFloat(Math.round((grade / totalWeight) * 100) / 100).toFixed(2) + "%";
  }
  document.getElementById("currentWeight").innerHTML = parseFloat(Math.round((totalWeight * 100) * 100) / 100).toFixed(2) + "%";

  if(goal) {
    var required = (((goal - (grade / totalWeight)) / 100) / (1 - totalWeight)) * 100 + (grade / totalWeight);
    document.getElementById("gradeToGoal").innerHTML = parseFloat(Math.round(required * 100) / 100).toFixed(2) + "%";
  }
}


// check if a var is a numerical value
function isGrade(value) {
  if(parseInt(Number(value)) == value) { // is int
    return true;
  }
  else if(value.indexOf('.') != -1) { // is float
    return true;
  }
  else if(value < 0 || value > 100) { // between 0 - 100
    return false;
  }
  else {
    return false;
  }
}
