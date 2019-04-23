/***********************************
  Name: William McKinnon
  Date: April 14, 2019
  Project: Grade Calculator Site
***********************************/
$(document).ready(function() {

  var numRows = 0; // number of marks in table
  var goal = 0;

  /***********************************
    Event Listeners
  ***********************************/

  // add mark listener
  document.getElementById("addMarkBtn").addEventListener("click", function() {
    numRows++;
    updateStatus();
  });

  // add set goal listener
  document.getElementById("setGoalBtn").addEventListener("click", function() {
    goal = "70";
    document.getElementById("gradeToGoalText").innerHTML = "Grade to Goal Of " + parseFloat(Math.round(goal * 100) / 100).toFixed(2) + "%";
    if(numRows != 0) {
      updateStatus();
    }
  });

});


/***********************************
  Functions
***********************************/

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
