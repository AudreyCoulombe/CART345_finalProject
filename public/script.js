
let wordData =[];
// let newTextInput = false;
$(document).ready(go);

function go() {
  console.log("we are ready to go");

  $("#textInputButton").click(function(){
    // newTextInput = true;
    let textInput = document.getElementById("textInput").value;
    let tokenizedInput = textInput.split(" ");
    // console.log(tokenizedInput);
    let lastWord = tokenizedInput[tokenizedInput.length-1];
    // console.log(lastWord);
    wordPrediction(lastWord);
  });

  $.ajax({
    type: "GET",
    url: "/getWordData",
    timeout: 600000,
    success: function (response) {
      //parseResponse(response);
     //  console.log(response);
     wordData=response;
    //  console.log(wordData);
    },
    error: function (e) {
      console.log(e);
      console.log("error occurred");
    },
  });
}

function wordPrediction(selectedWord){
  console.log(selectedWord);
  for (let i=0; i<wordData.length; i++) {
    if (wordData[i].firstWord == selectedWord){
      console.log(`possible following terms: ${wordData[i].followingWords}`);
      let wordPossibilities = wordData[i].followingWords;
      let newColumn = $("<div>").attr("class", "column").appendTo("#columnContainer");
      let numberOfSpaces = wordPossibilities.length+1;
      let spacing = 85/numberOfSpaces;
      // console.log(`spacing: ${spacing}`);
      for (let i=0; i<wordPossibilities.length; i++) {
        let wordButton = $('<input />', { type: 'button', class: 'wordButtons', id: wordPossibilities[i], value: wordPossibilities[i], style:`margin-top:${spacing-2}vh`}).appendTo(newColumn);
        $(`#${wordPossibilities[i]}`).click(function(){
          console.log("button clicked");
          wordPrediction(wordPossibilities[i]);
        });
      }
    }
  }
}

// function buttonClicked(){

// }
