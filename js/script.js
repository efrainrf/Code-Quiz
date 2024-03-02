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

    complete.innerHTML = "";

    for ( var i = 0; i < currentQuestion.completed.length; i++) {
        var complete = currentQuestion.completed[i];
        var choiceNode = $('<button>');
        choiceNode.attr('class', 'complete');
        choiceNode.attr('value', complete);

        choiceNode.textContent = i + 1 + '. ' + choice;

        complete.appendChild(choiceNode);
    }
}

function questionClick(event) {
    var buttonEl = event.target;
    if (!buttonEl.matches('.complete')) {
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

function quizTimer() {
    clock--;
    clockEl.textContent = clock;

    if (clock <= 0) {
        endQuiz();
    }
}

function leaderboardScores() {
    var playerNames = playerName.value.trim();

    if (playerNames !== '') {
        var playerScores =
        JSON.parse(window.localStorage.getItem('playerScores')) || [];

        var newPlayerScore = {
            score: clock,
            playerNames: playerNames,
        };

        playerScores.push(newPlayerScore);
        window.localStorage.setItem('playerScores', JSON.stringify(playerScores));

        window.location.href = 'highscores.html';
    }
}

function onStartQuiz (event) {
    if (event.key === 'Enter') {
        leaderboardScores();
    }
}

$(choiceEl).click(leaderboardScores());

$(start).click(startquiz());

$(complete).click(questionClick);

$(playerName).onkeyup(onStartQuiz)
