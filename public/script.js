
let wordData =[];
$(document).ready(go);

function go() {
  console.log("we are ready to go");

  $("#textInputButton").click(function(){
    let textInput = document.getElementById("textInput").value;
    let tokenizedInput = textInput.split(" ");
    let lastWord = tokenizedInput[tokenizedInput.length-1];

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
     console.log(wordData);
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

      
      let possibilityKeys = Object.keys(wordData[i].nextWordProbability);
      // console.log("possibilityKeys = " + possibilityKeys);

      // Variables used for setting opacity
      let possibilityValues = Object.values(wordData[i].nextWordProbability);
      // console.log("possibilityValues = " + possibilityValues);
      let maxPossibility = possibilityValues[0];
      let minPossibility = possibilityValues[possibilityValues.length-1];
      // console.log("max: " + maxPossibility + "; min: " + minPossibility);


      let newColumn = $("<div>").attr("class", "column").appendTo("#columnContainer");
      let numberOfSpaces = possibilityKeys.length+1;
      let spacing = 85/numberOfSpaces;

      // console.log(`spacing: ${spacing}`);
      for (let j=0; j<possibilityKeys.length; j++) {
        // let opacity = getOpacity(possibilityValues[j], minPossibility, maxPossibility);
        let opacity = (((possibilityValues[j] - minPossibility) * (1 - 0.4)) / (maxPossibility - minPossibility)) + 0.3;


        let wordButton = $('<input />', { type: 'button', class: 'wordButtons', id: possibilityKeys[j], value: possibilityKeys[j], style:`margin-top:${spacing-2}vh; opacity:${opacity}`}).appendTo(newColumn);
        $(wordButton).click(function(){
        // $(`#${possibilityKeys[j]}`).click(function(){
          console.log("button clicked");
          // wordButton.style.color = "red";
          $(this).css("color", "red");
          $(this).css("font-size", "x-large");
          $(this).css("transform", "translateX(-3%)");
          wordPrediction(possibilityKeys[j]);
        });
      }
    }
  }
}


// set opacity of the word proportionally to its TF-IDF
function getOpacity(possibilityValue, minPossibility, maxPossibility) {
  let opacity = (((possibilityValue - minPossibility) * (1 - 0)) / (maxPossibility - minPossibility)) + 0;
  return opacity;
}
