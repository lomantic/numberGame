
var level = localStorage.getItem("levelSetting"),
    order = localStorage.getItem("orderSetting"),
    numbers = JSON.parse(localStorage.getItem("numList"));

var numberTyped = -1,
    userOrder = [1,2];

  //  selectedNumbers = [1,2];

function emptyArray(array) {
      //empty your array
      array.length = 0;
    }

function orderString(array){
  var numOrders=" ";
  for (i = 0; i <array.length; i++) {
      numOrders = numOrders+ array[i].toString() + '   ';
  }
  return numOrders;
}

function printGame() {

  var numQuiz = "you chose " + level+ "  " + order + "ing order <br><br>";

  document.getElementById("numbers").innerHTML = numQuiz + orderString(numbers);

}

function checkNumber(){
  var credit = 0;
  var result = document.getElementById("alignedNumbers");
  var input = document.getElementById("typeNumber").value.toString();

  numberTyped = Number(input);// to make numbers like 0012 => 12
//  selectedNumbers.push(numberTyped);

  if(numbers.length==0){
    document.getElementById("typeNumber").value=0;
    alert('no more numbers to type');
    return;
  }

  for(i=0; i<numbers.length;i++){ //check whether typed number is vaild
    if(numbers[i]==numberTyped){
        credit = 1;
        break;
    }
  }

  for(i=0; i<userOrder.length;i++){ //check whether typed number is overlapping
    if(userOrder[i]==numberTyped){ // activate from second input
//        selectedNumbers.pop();
        credit = 0;
        break;
    }
  }


  if(credit){
    result.innerHTML =result.innerHTML +'  '+ numberTyped.toString()+'  ';
    userOrder.push(numberTyped);
    deleteNumber();
    printGame();
  }
  else{
    alert("Number "+numberTyped.toString()+" is unvaild");
  }
  //numberTyped = -1; delete this because of undo()
  document.getElementById("typeNumber").value=0;

}

function deleteNumber(){
  numberTyped = document.getElementById("typeNumber").value;
  for( var i = 0; i < numbers.length; i++){
        if ( numbers[i] == numberTyped) {
            numbers.splice(i, 1);
        }
    }
}

function undo(){
  var result = document.getElementById("alignedNumbers");

  if(userOrder.length != 0){
//    selectedNumbers.pop();
    numbers.push(userOrder[userOrder.length-1]);
    userOrder.pop();
    result.innerHTML ="Aligned Numbers : "+ orderString(userOrder);

    printGame();

  }
  else{
    alert("Nothing to undo");
  }

}

function answerCheck(){

  var checkList =[1,2];
  emptyArray(checkList); //make memory for Answer array
  Array.prototype.push.apply(checkList, userOrder);
  var valid = 1;


  if(numbers.length != 0 ){
    alert('input all numbers to submit');
    event.preventDefault();
    return;
  }

  checkList.sort(function(a, b){return a - b}); // sort answer array


  if(order =='descend'){
      checkList.reverse();
  }
  //alert('userOrder : '+userOrder+' [0] : '+userOrder[0]+' [n] : '+userOrder[userOrder.length -1]);
  //alert('checkList : '+checkList+' [0] : '+checkList[0]+' [n] : '+checkList[checkList.length -1]);

    for(i=0;i<checkList.length;i++){
    //  alert('inspection NO.'+i+' :  checkList[?] : '+checkList[i]+'  userOrder[?] : '+userOrder[i]);
      if(userOrder[i]!=checkList[i]){
      //  alert('inspection NO.'+i+' : mismatch detected');
        valid = 0;  // mismatch with answer
        break;
      }
    }
//  alert('inspection end');
//  alert('valid : '+valid)

  if(valid == 0){
  alert('Wrong answer Please try again');
  event.preventDefault();
  return;
  }
  localStorage.setItem("totalSeconds", totalSeconds);
//  alert('seconds : '+timeScore);
  }

function reset(){
    window.location.reload();
  }
function setTime() {

  if(totalSeconds<3600){
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }
  else{
    alert('Time out');
    reLocate();
  }
}


function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function getResult(){
  var timeScore = localStorage.getItem("totalSeconds");
//  alert('seconds : '+timeScore);
  var info = "you've won "+level+" "+order+"ing stage<br>"
  var infoTime ="Time passed : "+parseInt(timeScore / 60)+" min "+(timeScore % 60) +" sec";

  overResult.innerHTML = info+infoTime;

}

function reLocate(){
  location.replace("pressToStart.html");
}
