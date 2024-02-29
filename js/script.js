var Questions = 0;
var clock = questions.length * 15;
var clockId;

var questionsE1 = $("#questions");
var clockEl = $("#clock");
var complete = $("#complete"); 
var choiceEl = $("#submit");
var start = $("#start");
var playerName = $("#username");
var feedbackEl = $("#feedback");

function startquiz() {
    var mainMenu = $("#main-menu");
    mainMenu.attr("class", "hide");

    questionsE1.removeAttr("class");
    
    clockId = setInterval(clockTick, 1000);

    clockEl.textContent = time;

    quizQuestions();

}

function quizQuestions() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionTitle = $("#question-title");
    questionTitle.textContent = currentQuestion.title;

    choiceEl.innerHTML = "";

    for ( var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i];
        var choiceNode = $('<button>');
        choiceNode.attr('class', 'choice');
        choiceNode.attr('value', choice);

        choiceNode.textContent = i + 1 + '. ' + choice;

        choiceEl.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;
    if (!buttonEl.matches('.choice')) {
        return;
    }

    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        clock -= 15;
        
        if (time < 0) {
            time = 0;
        }

        clockEl.textContent = clock;
        feedbackEl.textContent = "Wrong!";
    } else {

        feedbackEl.textContent = "Right!";
    }
    feedbackEl.attr("class", "feedback");
    setTimeout(function () {
        feedbackEl.attr("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (clock <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        quizQuestions();
    }
};

function endQuiz() {
    clearInterval(clockId);

    var endGameScreen = $("#end-screen");
    endGameScreen.removeAttr("class");

    var finalScorel = $("#final-score");
    finalScorel.textContent = time;
    questionsE1.attr("class", "hide");
}

