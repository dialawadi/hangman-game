// letters
const letters = "abcdefghijklmnopqrstuvwxyz++";

// get array from letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  // create letter text
  let lettersText = document.createTextNode(letter);

  // append the letter to span
  span.appendChild(lettersText);

  // add class on span
  span.className = "letter-box";

  // append span to letters container
  lettersContainer.appendChild(span);
});

// object of words

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
    "c++",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  Months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Jordan",
    "United Arab Emariets",
  ],
};

// get random property
let allKeys = Object.keys(words);

// random number depends on key length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// category
let randomPropName = allKeys[randomPropNumber];

// category words
let randomPropValue = words[randomPropName];

// random number depends on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// the chosen word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letter guess element

let letterGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// create spans depend on word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    // add class to the span
    emptySpan.className = "has-space";
  }
  // append the span to the guess container
  letterGuessContainer.appendChild(emptySpan);
});
// select guess span
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;
let trueAttempts = 0;

// select draw element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on the letters
document.addEventListener("click", (e) => {
  // set the chose status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    // get the chosen word
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (clickedLetter == wordLetter) {
        // set satus to true
        theStatus = true;

        // loop on all guess span
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clickedLetter;
            trueAttempts++;
          }
        });
      }
    });
    // outside the loop
    // if letter is wrong
    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttempts++;

      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongAttempts === 10) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      if (trueAttempts === randomValueValue.length) {
        winner();
      }
      // play success sound
      document.getElementById("success").play();
    }
  }
});

// end game funcion
function endGame() {
  // create popup div
  let div = document.createElement("div");

  // create text
  let divText = document.createTextNode(
    `Game Over , The Word is ${randomValueValue}`
  );

  // append twxt to div
  div.appendChild(divText);

  // add class on div
  div.className = "popup";

  // append in body
  document.body.appendChild(div);
}

// winner

function winner() {
  // create popup div
  let div = document.createElement("div");

  // create text
  let divText = document.createTextNode(`You Won !`);

  // append twxt to div
  div.appendChild(divText);

  if (wrongAttempts <= 3) {
    div.appendChild(document.createTextNode(`Your are in excellent level`));
  }

  if (wrongAttempts > 3 && wrongAttempts <= 6) {
    div.appendChild(document.createTextNode(`Your are in very good level`));
  }

  if (wrongAttempts > 6 && wrongAttempts <= 10) {
    div.appendChild(document.createTextNode(`Your are in good level`));
  }

  // add class on div
  div.className = "popup";

  // append in body
  document.body.appendChild(div);
}
