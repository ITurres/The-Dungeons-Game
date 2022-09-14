/**BELOW --- STORAGE OF USER WORD*/
let userWord = [];
userWord.push(sessionStorage.getItem("userWord"));
let userWordForTest = userWord.toString(); //for testing in compareCaracs();//
sessionStorage.clear(); //will clear it from application once passed//
/**ABOVE --- STORAGE OF USER WORD**/

/**BELOW --- COLORS FOR CANVAS*/
const ROPE_COLOR = ["#b9820b", "#ffaa0f", "#450102"];
const HANGING_BEAM = "#ac522f";
const HANGING_BEAM_SHADOW = "#600002";
const HANGMAN_BODY_COLOR = "#e8a699";
const DUNGEON_BROWN = "#5e1911";
const DUNGEON_ORANGE = "#ffaa0f";
/**ABOVE --- COLORS FOR CANVAS*/

/**BELOW --- SOUND EFFECTS*/
const $winnerSound = document.querySelector("#winner-sound-effect");
const $loseSound = document.querySelector("#lose-sound-effect");
const $gameBackgroundMusic = document.querySelector("#background-music");
$gameBackgroundMusic.play();
/**ABOVE --- SOUND EFFECTS*/

//**BELOW --- GAME CANVAS*/
const $gameCanvas = document.querySelector("canvas");
let brush = $gameCanvas.getContext("2d");
brush.fillStyle = "transparent"; //makes canvas-BG transparent//
brush.fillRect(0, 0, 1200, 700);
//**ABOVE --- GAME CANVAS*/

//**BELOW --- CHECKS KEYBOARD ENTRY VALUES */
let keyValue;
function eventForKeyup() {
  document.addEventListener("keyup", function (event) {
    keyValue = event.key.toUpperCase();
    const charCode = event.keyCode;
    caracTesting(charCode, keyValue);
  });
}
eventForKeyup();

function caracTesting(charCode, keyValue) {
  if (charCode >= 65 && charCode <= 90) {
    console.log(charCode + " es: " + keyValue);
    return compareCaracs(keyValue);
  }
}
//**ABOVE --- CHECKS KEYBOARD ENTRY VALUES */

//**BELOW --- CHECKS ON-SCREEN - BUILT-IN KEYBOARD ENTRY VALUES */
function builtInKeyBoard_value(id) {
  keyValue = document.querySelector(id).value;
  return compareCaracs(keyValue);
}
//**ABOVE --- CHECKS ON-SCREEN - BUILT-IN KEYBOARD ENTRY VALUES */

function aleatoryWord() {
  let secretWords = [
    "TOY",
    "HOUSE",
    "COMPUTER",
    "ELEFANT",
    "HTML",
    "ALURA",
    "GOOGLE",
  ];
  let wordForGame = secretWords[Math.floor(Math.random() * secretWords.length)];
  return wordForGame;
}

/**BELOW --- COMPARING KEYVALUES FROM EVENT AGAINST ALEATORY_WORD/USER_WORD*/
if (userWordForTest !== "") {
  wordForTest_line = userWordForTest;
} else {
  wordForTest_line = aleatoryWord();
}

let storeIncorrect_keyValues = [];
let storeCorrect_keyValues = [" ", " ", " ", " ", " ", " ", " ", " "]; //IMPORTANT!: keep it so comparison is made//
let remainingLives = 7;
document.getElementById("show-remaining-lives").innerHTML = remainingLives; //shows the lives you start with//

function compareCaracs(keyValue) {
  for (let i = 0; i < wordForTest_line.split("").length; i++) {
    if (keyValue === wordForTest_line[i]) {
      storeCorrect_keyValues.splice([i], 1, keyValue);
      let caracX = keyValue;
      drawWordsUnderline(0, 590, 0, 590, 6);
    } else {
      if (
        !storeIncorrect_keyValues.includes(keyValue) && //dont add repeated caracs//
        !wordForTest_line.split("").includes(keyValue) && //and dont add caracs that are within aleatoryWord//
        remainingLives > 0 &&
        remainingLives <= 7
      ) {
        storeIncorrect_keyValues.push(keyValue);
        remainingLives--;
        drawHangMan(remainingLives);
        let showRemainingLives = (document.querySelector(
          "#show-remaining-lives"
        ).innerHTML = remainingLives);
        if (remainingLives === 0) {
          $gameBackgroundMusic.pause();
          $loseSound.play();
          showLoseMsg();
          endGame();
        }
      }
    }
    if (storeCorrect_keyValues.join("").match(wordForTest_line)) {
      $gameBackgroundMusic.pause();
      $winnerSound.play();
      showWinMsg();
      endGame();
    }
  }
  // document.querySelector("#show-correct-caracs").innerHTML =
  //   storeCorrect_keyValues.join("&thinsp;");
  document.querySelector("#show-incorrect-caracs").innerHTML =
    storeIncorrect_keyValues.join("-");
  document.querySelector("#show-incorrect-caracs").style.fontFamily =
    "MedievalSharp, Times New Roman";
}
/**ABOVE --- COMPARING KEYVALUES FROM EVENT AGAINST ALEATORY_WORD/USER_WORD*/

/**BELOW --- DOM MESSAGES*/
function showWinMsg() {
  document.getElementById("win-img").style.display = "block";
  //change to show win image set to none on css//
}

function showLoseMsg() {
  document.getElementById("lose-img").style.display = "block";
  //change to show lose image set to none on css//
}

function endGame() {
  let timeLeft = 7;
  let restartGame = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(restartGame);
    }
    document.querySelector("#restarting-progressBar").value = 7 - timeLeft;
    timeLeft -= 1;
    document.querySelector("#restarting-progressBar").style.display = "block";
  }, 700);
  setTimeout(() => {
    window.location.reload(1);
  }, "7000");
}
/**ABOVE --- DOM MESSAGES*/

/**BELOW --- DRAW MAN PARTS FOR EACH INCORRECT CARAC ENTRY*/
function drawHangMan(remainingLives) {
  switch (remainingLives) {
    case 6:
      drawLine(452, 121, 457, 40, 13, ROPE_COLOR[0]); //rope//
      drawLine(450, 121, 450, 40, 13, ROPE_COLOR[1]); //rope//
      drawLine(454, 121, 451, 40, 2, ROPE_COLOR[2]); //rope//
      drawLine(447, 121, 444, 80, 1, ROPE_COLOR[2]); //rope//
      break;
    case 5:
      drawHangMan_Head(480, 160, 50, 7, HANGMAN_BODY_COLOR); //hangMan-head//
      break;
    case 4:
      drawLine(450, 200, 450, 350, 7, HANGMAN_BODY_COLOR); //hangMan-torso//
      break;
    case 3:
      drawLine(450, 225, 350, 250, 7, HANGMAN_BODY_COLOR); //hangMan-leftArm//
      break;
    case 2:
      drawLine(450, 225, 550, 250, 7, HANGMAN_BODY_COLOR); //hangMan-rightArm//
      break;
    case 1:
      drawLine(450, 350, 400, 450, 7, HANGMAN_BODY_COLOR); //hangMan-leftLeg//
      break;
    case 0:
      drawLine(450, 350, 500, 450, 7, HANGMAN_BODY_COLOR); //hangMan-RightLeg//
      break;
  }
}

function drawHangMan_Head(x, y, radius, lineWidth) {
  brush.strokeStyle = HANGMAN_BODY_COLOR;
  brush.lineWidth = lineWidth;
  brush.beginPath();
  brush.arc(x, y, radius, 0, 2 * Math.PI);
  brush.stroke();
}

/**BELOW --- DRAW WORD FOR CORRECT CARAC*/
function draw_Word(caracX, x, y, color) {
  brush.font = "4rem MedievalSharp";
  brush.fillStyle = color;
  brush.fillText(caracX, x, y);
}
/**ABOVE --- DRAW WORD FOR CORRECT CARAC*/

/**BELOW --- DRAW LINE*/
function drawLine(x, y, x2, y2, lineWidth, color) {
  brush.strokeStyle = color;
  brush.lineWidth = lineWidth;
  brush.beginPath();
  brush.moveTo(x, y);
  brush.lineTo(x2, y2);
  brush.stroke();
}
/**ABOVE --- DRAW LINE*/

/**BELOW --- OPTION 1: HANG-MAN STAND (NOT IN USE DUE TO OPTION 2)*/
// drawLine(250, 500, 650, 500, 20, "#ac522f"); //stand-base//
// drawLine(300, 500, 250, 450, 20, "#ac522f"); //stand-base-support//
// drawLine(250, 510, 250, 50, 20, "#ac522f"); //stand-pole//
// drawLine(250, 100, 300, 50, 20, "#ac522f"); //stand-upper-support//
// drawLine(240, 50, 500, 50, 20, "#ac522f"); //stand-upper-something//
/**ABOVE --- OPTION 1: HANG-MAN STAND (NOT IN USE DUE TO OPTION 2)*/

/**BELOW --- OPTION 2: HANG-MAN HANGING*/
drawLine(350, 50, 525, 55, 20, HANGING_BEAM); //below_beam//
drawLine(390, -20, 390, 41, 20, HANGING_BEAM_SHADOW); //left_beam-shadow//
drawLine(375, -20, 375, 60, 20, HANGING_BEAM); //let_beam//
drawLine(535, -20, 535, 70, 20, HANGING_BEAM_SHADOW); //right_beam-shadow//
drawLine(525, -20, 525, 70, 20, HANGING_BEAM); //right_beam//
/**ABOVE --- OPTION 2: HANG-MAN HANGING*/

/**BELOW --- DRAW UNDERLINE FOR EACH CARAC IN ALEATORYWORD*/
function drawWordsUnderline(x, y, x2, y2, lineWidth, color, caracX) {
  let moveX = 200; //for moveTo axis X
  let moveX2 = 300; //for lineTo axis X
  let space = 0;
  /*switch to centralized "lines" within canvas
  base on word's length*/
  switch (wordForTest_line.length) {
    case 4:
      moveX = 150;
      moveX2 = 250;
      break;
    case 5:
      moveX = 100;
      moveX2 = 200;
      break;
    case 6:
      moveX = 50;
      moveX2 = 150;
      break;
    case 7:
      moveX = 0;
      moveX2 = 100;
      break;
    case 8:
      moveX = -50;
      moveX2 = 50;
  }

  for (let i = 0; i < wordForTest_line.length; i++) {
    moveX += 100;
    moveX2 += 100;
    space = 10;
    drawLine(i + moveX + space, y, i + moveX2 - space, y2, 6, DUNGEON_BROWN);
    draw_Word(
      wordForTest_line[i],
      i + moveX + space + 15,
      y - 5,
      "transparent" //IMPORTANT!//
    );
    if (keyValue === wordForTest_line[i]) {
      draw_Word(keyValue, i + moveX + space + 15, y - 5, DUNGEON_ORANGE);
    }
  }
}
drawWordsUnderline(0, 590, 0, 590, 6);
/**ABOVE --- DRAWS UNDERLINE FOR EACH CARAC IN ALEATORYWORD*/
