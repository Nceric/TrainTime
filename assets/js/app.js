
var destination;
var TrainTimeOne;
var array = [];
var trainName;
var frequencyMins;
var count = 0;



function updateTrains() {
    
    document.getElementById("trainTimeTable").innerHTML = "";
    console.log("button works")
    trainName = document.getElementById("trainName").value
    destination = document.getElementById("destination").value
    trainTimeOne = document.getElementById("trainTimeOne").value
    frequencyMins = document.getElementById("frequency-mins").value
    array.push(trainName, destination, trainTimeOne, frequencyMins);
  };

  
console.log(array);
document.querySelector("#submitButton").addEventListener("click", function () {
  event.preventDefault();
  updateTrains();
  
  let trainInfo = {
    trainName: trainName,
    destination: destination,
    TrainTimeOne: TrainTimeOne,
    frequencyMins: frequencyMins,

}

console.log(document.getElementById("submitButton"));
console.log(trainInfo);

localforage.getItem("saved").then(function (result) {
  console.log(result);
  if (!result) {
    result = [];
  }
  result.push(trainInfo);

  localforage.setItem("saved", result)
    .then(function () {
    
   
      console.log(result);
      // displayTableResults();   
    });
});
});

function displayTableResults() {
    localforage.getItem("saved", result)
    .then(function(result) {
      console.log(result);
      if (!result) {
        result = [];
      }
      localforage.setItem("saved", result)
      .then(function () {

        console.log(result);
    
        for(var i=0; i<result.length;i++){
          console.log(result[i]);


          const currentTime = moment().format('HH:mm');
          const firstTrainConverted = moment(result[i].trainTimeOne, "HH:mm").subtract(1, "day");
          // Difference between the times
          var dif = moment().diff(moment(firstTrainConverted), "minutes");
          console.log("diff: " +dif)
          // Leftover minutes
          var leftover = dif % result[i].frequencyMins;
          console.log("left over: "+leftover);
          // Minutes away
          var minsaway = result[i].frequencyMins - leftover;
          console.log("mins away: " +minsaway);
          // Next Train
          var nexttrain = moment().add(minsaway, "m").format("hh:mm A");
          console.log("next train: " +nexttrain);

          var table = document.getElementById("trainTimeTable");
          var row = table.insertRow(0);
          var cell1  = row.insertCell(0);
          var cell2  = row.insertCell(1);
          var cell3  = row.insertCell(2);
          var cell4  = row.insertCell(3);
          var cell5 = row.insertCell(4);
          cell1.innerHTML = result[i].trainName;
          cell2.innerHTML = result[i].destination;
          cell3.innerHTML = result[i].frequencyMins;
          cell4.innerHTML = nexttrain;
          cell5.innerHTML = minsaway;

          displayTableResults();

        }})})};

       