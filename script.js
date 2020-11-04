var startButtonEl = document.querySelector("#start-button");
var quizRowEl = document.querySelector("#quiz-row");
var quizListEl = document.querySelector("#quiz-list");

var questionArray = [{title: "Which state is NYC in", choices: ["NY", "CA", "NH"], answer: "NY"}, {title: "What color is the ocean", choices: ["blue", "red", "green"], answer: "blue"}];

startButtonEl.addEventListener("click", function(event) {
    event.target.setAttribute("style", "visibility: hidden;")
    console.log("clicked");
    quizRowEl.setAttribute("style", "visibility: visible;");
    var titleLiEl = document.createElement("li").textContent = questionArray[0].title
    quizListEl.append(titleLiEl);
    for (var i = 0; i < questionArray[0].choices.length; i++) {
     var choiceEl = document.createElement("li");
     var buttonEl = document.createElement("button");
     buttonEl.setAttribute("style", "background-color: blue;");
     buttonEl.setAttribute("id", i);
     buttonEl.textContent = questionArray[0].choices[i];
     choiceEl.append(buttonEl);
     quizListEl.append(choiceEl);
    }
    // If statement to match choice index selected . text with answer

});