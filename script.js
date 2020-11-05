var startButtonEl = document.querySelector("#start-button");
var quizRowEl = document.querySelector("#quiz-row");
var quizListEl = document.querySelector("#quiz-list");
var timeSpanEl = document.querySelector("#time-remaining");
var activeDiv = document.querySelector("#active-div");

var highScoreEl = document.querySelector("#high-score");

var questionArray = [{title: "Which state is NYC in", choices: ["NY", "CA", "NH"]}, {title: "What color is the ocean", choices: ["green", "red", "blue"]}, {title: "How many time zones are in Russia?", choices: ["11", "6", "9"]}];
var seconds = 50;

var numberCorrect = 0;

var currentQuestion = 1;

var yourInitials = "";
// empty timer var
var timerFunc;

gethighScore();


function gethighScore() {
    var highScore = localStorage.getItem("score");
    highScoreEl.textContent = highScore;
}

startButtonEl.addEventListener("click", function(event) {
    
    event.target.setAttribute("style", "visibility: hidden;");
    console.log("clicked");
    quizRowEl.setAttribute("style", "visibility: visible;");
    var titleLiEl = document.createElement("li").textContent = questionArray[0].title
    quizListEl.append(titleLiEl);
    for (var i = 0; i < questionArray[0].choices.length; i++) {
     var choiceEl = document.createElement("li");
     var buttonEl = document.createElement("button");
     buttonEl.setAttribute("id", i);
     buttonEl.textContent = questionArray[0].choices[i];
     choiceEl.append(buttonEl);
     quizListEl.append(choiceEl);
    }
    seconds = 50;
    timeSpanEl.setAttribute("style", "visibility: visible;");
    startTimer();
});

quizListEl.addEventListener("click", function(event){
    if (event.target.matches("button")) {
        console.log(event.target.id);
        //I should use 0 <= 2
        if (currentQuestion === 1) {
            console.log("q 1");
            if (event.target.id === "0") {
                numberCorrect++;
                console.log(numberCorrect);
                goToQestion2();
            } else {
                seconds = seconds - 10;
                goToQestion2();
            }
        } else if (currentQuestion === 2) {
            console.log("q 2");
            if (event.target.id === "2") {
                numberCorrect++;
                goToQestion3();
                console.log(numberCorrect);
            } else {
                seconds = seconds - 10;
                goToQestion3();
            }
        } else if (currentQuestion === 3) {
            console.log("q 3");
            if (event.target.id === "0") {
                numberCorrect++;
                console.log(numberCorrect);
                stopTimer()
                goToScorePage();
            } else {
                stopTimer()
                goToScorePage();
            }
        }
    }
});

function startTimer() {
timerFunc = setInterval(function() {
     seconds--;
      timeSpanEl.textContent = seconds;
  
      if(seconds === 0) {
        clearInterval(timerInterval);
        goToScorePage();
      }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerFunc);
}
//Found the above code via stack overflow

function goToQestion2() {
    quizListEl.innerHTML = "";
    currentQuestion++;
    
    var titleLiEl = document.createElement("li").textContent = questionArray[1].title
    quizListEl.append(titleLiEl);
    for (var i = 0; i < questionArray[1].choices.length; i++) {
        console.log("starting loop");
        var choiceEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("id", i);
        buttonEl.textContent = questionArray[1].choices[i];
        choiceEl.append(buttonEl);
        quizListEl.append(choiceEl);
       }
}

function goToQestion3() {
    quizListEl.innerHTML = "";
    currentQuestion++;
    seconds = seconds - 10;
    var titleLiEl = document.createElement("li").textContent = questionArray[2].title
    quizListEl.append(titleLiEl);
    for (var i = 0; i < questionArray[2].choices.length; i++) {
        console.log("starting loop");
        var choiceEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("id", i);
        buttonEl.textContent = questionArray[2].choices[i];
        choiceEl.append(buttonEl);
        quizListEl.append(choiceEl);
       }
}


function goToScorePage() {
    alert("Here is your score: " + numberCorrect);
    quizListEl.innerHTML = "";

    var initialInput = document.createElement("input");
    initialInput.setAttribute("type", "text");
    activeDiv.append(initialInput);
    initialInput.placeholder = "Put Initials Here";
    var submitButton = document.createElement("button");

    activeDiv.append(submitButton);
    submitButton.textContent = "Submit Score";
    submitButton.addEventListener("click", function(event) {
        submitScore(initialInput.value);
    })

}

function submitScore(initials) {
    localStorage.setItem("initials", initials);
    //Need to get highscore before setting it
    console.log(initials);
    var highestScore = parseInt(localStorage.getItem("score"));

    if (highestScore > numberCorrect) {
        alert("Your score was lower than your high score");
        startButtonEl.setAttribute("style", "visibility: visible;");
        quizRowEl.setAttribute("style", "visibility: hidden;");
        
    } else {
        alert("Your score has been saved");
        localStorage.setItem("score", numberCorrect);
    }
    numberCorrect = 0;
    startButtonEl.setAttribute("style", "visibility: visible;");
    quizRowEl.setAttribute("style", "visibility: hidden;");
    
    //REMOVING INPUT AND SUBMNIT BUTTON FOR RESTART
    activeDiv.removeChild(activeDiv.lastChild);
    activeDiv.removeChild(activeDiv.lastChild);
}

