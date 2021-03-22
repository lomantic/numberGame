var numList = [1,2];
var orderSetting;
var levelSetting;

function emptyArray() {
  //empty your array
  numList.length = 0;
}


function getNumber() {
  // fill number in array according to level
  var count = 3;
  if (levelSetting == 'lv1')
    count = 3;
  else if (levelSetting == 'lv2')
    count = 5;
  else if (levelSetting == 'lv3')
    count = 10;

  var newNum = 0;

  for (i = 0; i < count; i++) {
    newNum = Math.floor(Math.random() * 100) + 1;
    for (j = 0; j < numList.length; j++) { // forbid overlapping numbers
      if (newNum == numList[j]) {
        newNum = Math.floor(Math.random() * 100) + 1;
        j = -1;
      }
    }
    numList.push(newNum);
  }
//  localStorage.setItem("numList", numList);

}








function storeSetting() {

  var order = document.getElementsByName('order');
    for(i = 0; i < order.length; i++){
      if(order[i].checked){
        orderSetting = order[i].value;
        }
      }

  levelSetting = document.getElementById('chooseLevel').value;
  emptyArray();
  getNumber();




  localStorage.setItem("levelSetting", levelSetting);
  localStorage.setItem("orderSetting", orderSetting);
  localStorage.setItem("numList", JSON.stringify(numList));
  location.href = "game.js"

/**
  var line= ' ';
  for(i=0; i<numList.length ;i++){
    line = line + numList[i].toString();

  }
  alert(levelSetting);
  alert(userSetting['order']);
  alert(line);
*/

}

/**
function getSetting () {
   levelSetting = localStorage.getItem("level");
   orderSetting = localStorage.getItem("order");

   if((levelSetting==null) ||(orderSetting==null)){
     levelSetting='lv1';
     orderSetting='ascend';
   }

   // TO CLEAR
  // localStorage.removeItem("level");
   //localStorage.removeItem("order");
  // localStorage.clear();
}
*/
