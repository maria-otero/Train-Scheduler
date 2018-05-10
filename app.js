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


// PROJECT:
// 1 - Firebase is going to host arrival and departure data
// 2 - This app will retrieve and manipulate this information with Moment.js
// 3 - Also will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station
// 4 -- When adding trains, administrators should be able to submit the following: -- Train Name -- Destination First Train Time (in military time) -- Frequency (in minutes).


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


  // Clean
  // $('#train-input').empty();
  // $('#destination-input').empty();
  console.log('name from input ' + name);

  firebase.database().ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
  })
})


// Use Moments.js to claculate when is going to arraive the train... what time is going to pass between present HH:MM and the schedule time for the train to arrive.
firebase.database().ref().on('child_added', function(sanpshot) {
  
  var trainsInfoTable = $('#train-info');
  var trainInfo = $('<tr>');
  var nameTD = sanpshot.val().name;
  var destinationTD = sanpshot.val().destination;
  var firstTimeTD = $('<td>');
  var frequencyTD = $('<td>');

  
  $("#train-info").append("<tr><td>" + nameTD + "</td><td>" + destinationTD + "</td></tr>");



  // trainInfo.text(sanpshot.val().name);

  // trainInfo.append();
  // // console.log(destinationTD);

  // firstTimeTD.html = sanpshot.val().firstTime;
  // trainInfo.append(firstTimeTD);
  // // console.log(firstTimeTD);

  // frequencyTD.html = sanpshot.val().frequency;
  // trainInfo.append(frequencyTD);
  // trainsInfoTable.append(trainInfo);
  // console.log(frequencyTD);

})
   




// ** Consider updating your "minutes to arrival" and "next train time" text once every minute. 

// ** As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.