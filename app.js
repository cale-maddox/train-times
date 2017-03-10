var config = {
    apiKey: "AIzaSyBTlcl4s6hyYahwMWT1Yf_s3XOvAWVKL8A",
    authDomain: "train-times-ba283.firebaseapp.com",
    databaseURL: "https://train-times-ba283.firebaseio.com",
    storageBucket: "train-times-ba283.appspot.com",
    messagingSenderId: "988417520236"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  // var firstTrain = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    place: destination,
    // time: firstTrain,
    often: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.place);
  // console.log(newTrain.time);
  console.log(newTrain.often);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().time;
  var frequency = childSnapshot.val().often;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td>");
  // <td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>"
});