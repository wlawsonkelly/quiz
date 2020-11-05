var startButtonEl = document.querySelector("#start-button");
var quizRowEl = document.querySelector("#quiz-row");
var quizListEl = document.querySelector("#quiz-list");
var timeSpanEl = document.querySelector("#time-remaining");

var questionArray = [{title: "Which state is NYC in", choices: ["NY", "CA", "NH"], answer: "NY"}, {title: "What color is the ocean", choices: ["green", "red", "blue"], answer: "blue"}, {title: "How many time zones are in Russia?", choices: ["11", "6", "9"], answer: "11"}];
var seconds = 50;

var numberCorrect = 0;

var currentQuestion = 1;

startButtonEl.addEventListener("click", function(event) {
    event.target.setAttribute("style", "visibility: hidden;")
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

    startTimer();
    // If statement to match choice index selected . text with answer
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
            } 
        } else if (currentQuestion === 2) {
            console.log("q 2");
            if (event.target.id === "2") {
                numberCorrect++;
                goToQestion3();
                console.log(numberCorrect);
            } 
        } else if (currentQuestion === 3) {
            console.log("q 3");
            if (event.target.id === "0") {
                numberCorrect++;
                console.log(numberCorrect);
                goToScorePage();
            } 
        }
    }
});

function startTimer() {
    var timerInterval = setInterval(function() {
     seconds--;
      timeSpanEl.textContent = seconds;
  
      if(seconds === 0) {
        clearInterval(timerInterval);
        goToScorePage();
      }
    }, 1000);
  }

function goToQestion2() {
    quizListEl.innerHTML = "";
    currentQuestion++;
    seconds = seconds - 10;
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
    alert("Here is your score");
}

