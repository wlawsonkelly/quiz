// vars from html 

var startButtonEl = document.querySelector("#start-button");
var quizRowEl = document.querySelector("#quiz-row");
var quizListEl = document.querySelector("#quiz-list");
var timeSpanEl = document.querySelector("#time-remaining");
var activeDiv = document.querySelector("#active-div");

var highScoreEl = document.querySelector("#high-score");

//js only vars

var questionArray = [{title: "Which state is NYC in", choices: ["NY", "CA", "NH"]}, {title: "What color is the ocean", choices: ["green", "red", "blue"]}, {title: "How many time zones are in Russia?", choices: ["11", "6", "9"]}];
var seconds = 50;

var numberCorrect = 0;

var currentQuestion = 1;

var yourInitials = "";
// empty timer var

var timerFunc;

gethighScore();

//get high score and display in that span
function gethighScore() {
    var highScore = localStorage.getItem("score");
    highScoreEl.textContent = highScore;
}

//Start button starts the quiz on click
startButtonEl.addEventListener("click", function(event) {
    //hide the start button
    event.target.setAttribute("style", "visibility: hidden;");
    console.log("clicked");
    //Show the quiz list
    quizRowEl.setAttribute("style", "visibility: visible;");
    //set title to q1
    var titleLiEl = document.createElement("li").textContent = questionArray[0].title
    quizListEl.append(titleLiEl);
    //loop through q1 to get lis for the quizList ul
    for (var i = 0; i < questionArray[0].choices.length; i++) {
     var choiceEl = document.createElement("li");
     var buttonEl = document.createElement("button");
     buttonEl.setAttribute("id", i);
     buttonEl.textContent = questionArray[0].choices[i];
     choiceEl.append(buttonEl);
     quizListEl.append(choiceEl);
    }
    //set and start timer
    seconds = 50;
    timeSpanEl.setAttribute("style", "visibility: visible;");
    startTimer();
});

//Logic for figureing out if answer is correct
quizListEl.addEventListener("click", function(event){
    if (event.target.matches("button")) {
        console.log(event.target.id);
        
        if (currentQuestion === 1) {
            console.log("q1");
            if (event.target.id === "0") {
                //Make the button green can't see it casue it's too fast
                event.target.setAttribute("style", "background-color: green;");
                numberCorrect++;
                console.log(numberCorrect);
                goToQestion2();
            } else {
                //make background red can't see it casue it's too fast and - 10 seconds
                event.target.setAttribute("style", "background-color: red;")
                seconds = seconds - 10;
                goToQestion2();
            }
        } else if (currentQuestion === 2) {
            console.log("q2");
            if (event.target.id === "2") {
                event.target.setAttribute("style", "background-color: green;")
                numberCorrect++;
                goToQestion3();
                console.log(numberCorrect);
            } else {
                event.target.setAttribute("style:active", "background-color: red;")
                seconds = seconds - 10;
                goToQestion3();
            }
        } else if (currentQuestion === 3) {
            console.log("q3");
            if (event.target.id === "0") {
                event.target.setAttribute("style:active", "background-color: green;")
                numberCorrect++;
                console.log(numberCorrect);
                stopTimer()
                goToScorePage();
            } else {
                event.target.setAttribute("style:active", "background-color: red;")
                stopTimer()
                goToScorePage();
            }
        }
    }
});
//Found the below code via stack overflow https://stackoverflow.com/questions/49425137/how-to-stop-timer-in-javascript
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

function goToQestion2() {
    //clear the quizlist
    quizListEl.innerHTML = "";
    //go to the next question so if else in the quizlist event listener works
    currentQuestion++;
    //set title etc
    var titleLiEl = document.createElement("li").textContent = questionArray[1].title
    quizListEl.append(titleLiEl);
    //for loop like start button event listener
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
//same as goToQestion2
function goToQestion3() {
    quizListEl.innerHTML = "";
    currentQuestion++;
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
    //give user their score
    alert("Here is your score: " + numberCorrect);
    //wipe the quiz list
    quizListEl.innerHTML = "";
    //create submit button and inital input and add them to the center div
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
        //checking if we have a high score
        alert("Your score was lower than your high score");
    } else {
        // WE HAVE A HIGH SCORE and need to save it
        alert("Your high score has been saved");
        highScoreEl.textContent = numberCorrect;
        localStorage.setItem("score", numberCorrect);
    }
    //Reset score and reset the quiz elements to start
    numberCorrect = 0;
    currentQuestion = 1;
    startButtonEl.setAttribute("style", "visibility: visible;");
    quizRowEl.setAttribute("style", "visibility: hidden;");
    
    //REMOVING INPUT AND SUBMNIT BUTTON FOR RESTART
    activeDiv.removeChild(activeDiv.lastChild);
    activeDiv.removeChild(activeDiv.lastChild);
}

//Thanks for reading 