// Initialize Firebase
var config = {
  apiKey: "AIzaSyA-HBI0cjvS7JJDvKo3RS3GQPto0tHGX8M",
  authDomain: "train-scheduler-20a05.firebaseapp.com",
  databaseURL: "https://train-scheduler-20a05.firebaseio.com",
  projectId: "train-scheduler-20a05",
  storageBucket: "",
  messagingSenderId: "619781688363"
};
firebase.initializeApp(config);



// Once the user complete the form, the new infomation is going to be saved into the database. So we need to create an on click event to the submit button to make this possible.
$('#add-train').on('click', function(event) {
  event.preventDefault();
  
    //First we need to creat the var containing the strigs/numbers that our (right now empty database) firebase database are going to keep inside.
    var name = '';
    var destination = '';
    var firstTime;
    var frequency;

    name = $('#train-input').val().trim();
    destination = $('#destination-input').val().trim();
    firstTime = $('#firstTime-input').val().trim();
    frequency = $('#frequency-input').val().trim();

    firebase.database().ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });
    
    // Clean imput placeholders
    $('#train-input').val('');
    $('#destination-input').val('');
    $('#firstTime-input').val('');
    $('#frequency-input').val('');
 });


// Use Moments.js to claculate when is going to arraive the train... what time is going to pass between present HH:MM and the schedule time for the train to arrive.
firebase.database().ref().on('child_added', function(snapshot) {
  
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTime = snapshot.val().firstTime;
  var frequency = snapshot.val().frequency;

  
      //remove the years
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

      // Current Time
      var currentTime = moment();

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      // Time apart using modular 
      var tRemainder = diffTime % frequency;

      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");

 // dynamically creating and appending a new row in the table with new td
  $("#train-info").append('<tr><td>' + name + '</td><td>' + destination + '</td><td>' +
  frequency + '</td><td>' + moment(nextTrain).format("HH:mm") + '</td><td>' + tMinutesTillTrain + '</td></tr>');
});











// firebase.database().ref().on('child_added', function(snapshot) {
//   //reference tbody
//   var trainsInfoTable = $('#train-info');
//   //new row
//   var newTrainInfo = $('<tr>');
//   //new train information
//   var nameTD = $('<td>');
//   var destinationTD =  $('<td>');
//   var firstTimeTD = $('<td>');
//   var frequencyTD = $('<td>');

//   //adding the info from firebase
//   nameTD.text(snapshot.val().name);
//   destinationTD.text(snapshot.val().destination);
//   firstTimeTD.text(snapshot.val().firstTime);
//   frequencyTD.text(snapshot.val().frequency);

//   //append all information to new row
//   newTrainInfo.append(nameTD);
//   newTrainInfo.append(destinationTD);
//   newTrainInfo.append(firstTimeTD);
//   newTrainInfo.append(frequencyTD);

//   //append the new row to the tbody
//   trainsInfoTable.append(newTrainInfo);
// })
   

