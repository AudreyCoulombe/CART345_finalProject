/********************************* Server setup ********************************/
// Import the Express library
let express = require("express");
const portNumber = 4200;
let app = express(); //make an insatnce of express
let httpServer = require("http").createServer(app); // create a server (using the Express framework object)

// Default route
app.get("/", function (req, res) {
  // res.send("<h1>Hello world</h1>");
  res.sendFile(__dirname + "/public/index.html");
});

// Make server listen for incoming messages
httpServer.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});

// Serving static files (files that aren't server-generated - files from the public directory) (i.e. css,js,html...)
let static = require("node-static"); // require static node module
const { response } = require("express");
app.use(express.static(__dirname + "/public")); // to set the public directory as visible/usable by client (static)

/****************************** Setup Natural + global variables *****************/
let natural = require("natural");
let fs = require("fs");
let warsanShirePoems = fs.readFileSync("files/WarsanShireTexts.txt", "utf8");

/********************************************* WARSAN SHIRE'S WORD COUNT *****************************************/
/*(For each word in WARSAN SHIRE's texts, check how many times it was used and store the most used in an array)*/

// Access wordCount.js file and create a new instance of WordCount class (from wordCount.js)
const WordCount = require("./wordCount");
let shireWordCount = new WordCount();

// // Look at Warsan Shire's poems in files folder
// // let warsanShirePoems = fs.readFileSync("files/WarsanShireTexts.txt", "utf8");

shireWordCount.process(warsanShirePoems);
shireWordCount.sortByCount();
// To get the list of words and there count
// shireWordCount.logTheDict();
// To get the word item
// console.log(shireWordCount.keys[0]);
// To get the count item
// console.log(shireWordCount.dict[shireWordCount.keys[0]]);

let NGrams = natural.NGrams;
let bigrams = NGrams.bigrams(warsanShirePoems);
// console.log(bigrams);
// to get the first word of the first bigram
// console.log(bigrams[0][0]);

let probabilitiesDic = [];
for (let i=0; i<shireWordCount.keys.length; i++) {
  let word = {
    firstWord: shireWordCount.keys[i],
    followingWords: []
  };

  for (let j=0; j<bigrams.length; j++) {
    if (word.firstWord == bigrams[j][0]) {
      // console.log(word.firstWord)
      word.followingWords.push(bigrams[j][1]);
    }
  }
  probabilitiesDic.push(word);
}
console.log(probabilitiesDic);






app.get("/getWordData", sendWordData);

function sendWordData(request, response) {
  response.send(probabilitiesDic);
}

