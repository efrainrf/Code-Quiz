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
    

}