const quizContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('start-button');
let userScore = 0;

const quizQuestions = [
    {
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheeps', 'Cascading Style Sheets',
    'Cascading Style Sheats'],
    correctAnswer: 'Cascading Style Sheets',
    },
    {
        question: 'Where should the <script> tag go on your HTML code?',
        options: ['Above the <body> tag', 'Anywhere you want', 'Above the </body> tag'],
        correctAnswer: 'Above the </body> tag',
    },
    {
        question: 'In JavaScript, a string is surrounded by what?',
        options: ['Quotation marks', 'Nothing', 'Back-slashes'],
        correctAnswer: 'Quotation marks',
    }
];

function startQuiz() {
    startButton.style.display = 'none';
    showQuestion(0);
}


function showQuestion(questionIndex) {
    quizContainer.innerHTML = '';

    if (questionIndex < quizQuestions.length) {
        const questionObject = quizQuestions[questionIndex];
        const questionText = document.createElement('p');
        questionText.textContent = questionObject.question;
        quizContainer.appendChild(questionText);

        questionObject.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => handleAnswer(index, questionObject));
            quizContainer.appendChild(optionButton);
    });
    }

}

function handleAnswer(selectedIndex, questionObject) {
    const selectedOption = questionObject.options[selectedIndex];
    const correctAnswer = questionObject.correctAnswer;

    if (selectedOption === correctAnswer) {
        const nextQuestionIndex = nextQuestionIndex + 1;
        showQuestion(nextQuestionIndex);   
        updateScore(true);
    } else {
        alert("Wrong Answer!");
    }

    // Move on to the next question
    const nextQuestionIndex = nextQuestionIndex + 1;
    showQuestion(nextQuestionIndex);  
}


function saveScore() {
    localStorage.setItem('quizUserScore', userScore);
}


function showLeaderboard() {
    
}

startButton.addEventListener('click', startQuiz);
