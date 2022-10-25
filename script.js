// HOOKS to the DOM
var highscoresLink = document.querySelector("#highscores");
var timeEl = document.querySelector("#time-left");
var startContainerEl = document.querySelector("#start-game-container");
var startButtonEl = document.querySelector("#start-quiz-btn");

var quizContainerEl = document.querySelector("#quiz-container");
var questionEl = document.querySelector("#quiz-question");
var listEl = document.querySelector("#answer-container");
var choiceOneEl = document.querySelector("#btn0");
var choiceTwoEl = document.querySelector("#btn1");
var choiceThreeEl = document.querySelector("#btn2");
var choiceFourEl = document.querySelector("#btn3");
var checkAnswerEl = document.querySelector("#check-answer");
var scoreContainerEl = document.querySelector("#score-container");
var finalScoreEl = document.querySelector("#final-score");
var initialsInputEl = document.querySelector("#initials");
var initialsBtn = document.querySelector("#submit-initials-btn");
var highscoresContainerEl = document.querySelector("#highscores-container");
var timesUpEl = document.querySelector("#times-up");
var listOfHighScores = document.querySelector("#highscores-list");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-highscores");

// state variable(s)
var timeLeft = 90; // 1:30 seconds in milliseconds

// constant variables
var questionIndex = 0;
const questions = [
    {
        question: "What is JavaScript?",
        choices: ["1. It's a scripting or programming language", "2. It's an API", 
        "3. It's a Third Party API", "4. It's another name for Java"],
        answer: "1. It's a scripting or programming language"
    },
    {
        question: "What is the DOM?",
        choices: ["1. It stands for Domain Objective Multimedia", "2. It's a text editor", 
        "3. It's the data representation of the objects that comprise the structure and content of a document on the web", 
        "4. It's an open source code"],
        answer: "3. It's the data representation of the objects that comprise the structure and content of a document on the web"
    },
    {
        question: "What is JQuery?",
        choices: ["1. It's a CSS framework", "2. It's a Third Party API that holds 1000+ open source font families", 
        "3. It's an older version of JavaScript", "4. It's a fast, small, and feature-rich JavaScript library"],
        answer: "4. It's a fast, small, and feature-rich JavaScript library"
    },
    {
        question: "What are the 3 parameters inside the addEventListener() method?",
        choices: ["1. variable, array, string", "2. number, boolean, event", "3. event, function, boolean", "4. boolean, anonymous, {}"],
        answer: "3. event, function, boolean"
    },
    {
        question: "Which one is NOT a syntax to hook to the DOM",
        choices: ["1. document.querySelectorAll()", "2. document.selectAll{}", "3. document.querySelector()", 
        "4. document.getElementbyId()"],
        answer: "2. document.selectAll{}"
    }]


// WHEN I click the start button
startContainerEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
      // THEN a timer starts 
      startTime()
      // AND presented with a question
      nextQuestion()
      }
})

function startTime() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      timeEl.textContent = "Time: " + timeLeft;
      if(timeLeft <= 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        gameOver()
        }
    }, 1000);
    startContainerEl.style.display = "none";
    quizContainerEl.style.display = "block";
}

function nextQuestion() {
    questionEl.textContent = questions[questionIndex].question;
    choiceOneEl.textContent = questions[questionIndex].choices[0];
    choiceTwoEl.textContent = questions[questionIndex].choices[1];
    choiceThreeEl.textContent = questions[questionIndex].choices[2];
    choiceFourEl.textContent = questions[questionIndex].choices[3];
}

quizContainerEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        checkAnswer(event);
      }
})

function checkAnswer(event) {
    var lineBreakEl = document.querySelector("#line-break");
    lineBreakEl.style.display = "block";
    checkAnswerEl.style.display = "block";
    
    if (questions[questionIndex].answer === event.target.innerHTML) {
    checkAnswerEl.textContent = "Correct!";
    } 
    else {
        // WHEN I answer a question incorrectly
        // THEN time is subtracted from the clock
        timeLeft -= 15;
        timeLeft.textContent = timeLeft;
        checkAnswerEl.textContent = "Wrong!";
        }
        // WHEN I answer a question
        // THEN I am presented with another question
    questionIndex++;
        // repeat with the rest of questions 
    if (questionIndex < questions.length) {
        nextQuestion();
    } 
    else {
        // WHEN all questions are answered or the timer reaches 0 (see start time function above)
        // THEN the game is over
        // used setTimeout function to view whether answer to last question = wrong or correct
        setTimeout(function() {
            gameOver()
        }, 1500);
    }  
    }      
    
function gameOver() {
    quizContainerEl.style.display = "none";
    scoreContainerEl.style.display = "block";
    finalScoreEl.textContent = timeLeft;
    timeEl.remove();
    timesUpEl.style.display = "block";
}

// WHEN the game is over
// THEN I can save my initials and my score
initialsBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
    var savedScores = localStorage.getItem("highscores");
    var scoresArray;

    if (savedScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScores)
    };
    var userScore = {
        initials: initialsInputEl.value,
        score: finalScoreEl.textContent
    };
    scoresArray.push(userScore);
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("highscores", scoresArrayString);
    };
    showScores();
})    

function showScores() {
    scoreContainerEl.remove();
    highscoresContainerEl.style.display = "block";
    localStorage.getItem("highscores");
    var savedScores = localStorage.getItem("highscores");
    
    if (savedScores === null) {
        return;
    }

    var storedScores = JSON.parse(savedScores);

    for (var i=0; i < storedScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

goBackBtn.addEventListener("click", function() {
    window.location.reload()
})

clearScoresBtn.addEventListener("click", function() {
    window.localStorage.removeItem("highscores");
    clearScoresBtn.style.display = "none";
    listOfHighScores.innerHTML = "Highscores cleared!";
})

highscoresLink.addEventListener("click", function() {
    showScores();
    startContainerEl.style.display = "none";
});