// global variables
let startBtn = document.getElementById('start');
let questionContainer = document.getElementById('question-container');
let choiceBtn0 = document.getElementById('choice-btn-0');
let choiceBtn1 = document.getElementById('choice-btn-1');
let choiceBtn2 = document.getElementById('choice-btn-2');
let choiceBtn3 = document.getElementById('choice-btn-3');
let form = document.getElementById('form');
let initialInput = document.getElementById('initials');
let saveScore = document.getElementById('save-score');

let body = document.body;

let questionsIndex = 0;
let countdown = 250;

let highScoresArray = JSON.parse(localStorage.getItem('highScoresArray')) || [];

let questions = [
	{
		question: "what color is the sky",
		answers: ["red", 'yellow', 'blue', "green"],
		correctAnswer: 'blue',
	},
	{
		question: 'what is 2+2?',
		answers: ['4', '10', '22', '11'],
		correctAnswer: '4',
	},
	{
		question: 'how many fingers do you have?',
		answers: ['5', '12', '10', '8'],
		correctAnswer: '10',
	},
	{
		question: 'how many toes do you have?',
		answers: ['10', '2', '1', '4'],
		correctAnswer: '10',
	},

	{
		question: 'how many sides does a square have?',
		answers: ['3', '5', '6', '4'],
		correctAnswer: '4',
	},
	{
		question: 'what letter comes after A?',
		answers: ['C', 'Z', 'B', 'X'],
		correctAnswer: 'B',
	},
	{
		question: 'what color is the mars?',
		answers: ['yellow', 'red', 'green', 'blue'],
		correctAnswer: 'red',
	},
	{
		question: 'how many letters are in the alphabet?',
		answers: ['20', '25', '30', '26'],
		correctAnswer: '26',
	},
	{
		question: 'do pigs fly?',
		answers: ['yes', 'no', 'maybe', "i don't know"],
		correctAnswer: "no",
	},
	{
		question: 'who is luigis brother?',
		answers: ['mario', 'yoshi', 'bowser', 'toad'],
		correctAnswer: 'mario',
	},
];

// loads the page with only start button, and header
function init() {
	questionContainer.style.display = 'none';
	form.style.display = 'none';
}

// starts the quiz, displays first question, starts the countdown
function startQuiz() {
	questionContainer.style.display = 'block';
	showQuestion();
	startTimer();
	if (startBtn.style.display === 'none') {
		startBtn.style.display = 'block';
	} else {
		startBtn.style.display = 'none';
	}
}

// timer countdown function
function startTimer() {
	var interval = setInterval(function () {
		countdown--;
		document.getElementById('timer').textContent = countdown;
		if (countdown <= 0 || questionsIndex >= questions.length) {
			clearInterval(interval);
			endGame();
		}
	}, 1000);
}

// loops through questions and answers
function showQuestion() {
	let setQuestion = questions[questionsIndex];
	document.getElementById('questions').innerHTML = setQuestion.question;

	let answers = setQuestion.answers;
	for (let i = 0; i < answers.length; i++) {
		document.querySelector(`#choice-btn-${i}`).innerHTML = answers[i];
		document.querySelector(`#choice-btn-${i}`).setAttribute('value', answers[i]);
	}
}

// checks if the answer is correct or not
function verifyAnswer() {
	if (this.value === questions[questionsIndex].correctAnswer) {
		questionsIndex++;
		if (questionsIndex < questions.length) {
			showQuestion();
		}
	} else {
		countdown -= 10;
	}
}

// finishes the game
function endGame() {
	questionContainer.style.display = 'none';
	form.style.display = 'block';
	document.getElementById('finalScore').innerHTML = countdown;
}

// saves the high score to localStorage
function saveHighScore(event) {
	event.preventDefault();
	let initialInput = document.getElementById('initials').value;
	let highScores = {
		name: initialInput,
		score: countdown,
	};

	highScoresArray.push(highScores);
	localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
	linkToHighScores();
}

// links to another HTML page with the high scores displayed
function linkToHighScores() {
	window.location.href = './high-scores.html';
}

// event listeners
choiceBtn0.addEventListener('click', verifyAnswer);
choiceBtn1.addEventListener('click', verifyAnswer);
choiceBtn2.addEventListener('click', verifyAnswer);
choiceBtn3.addEventListener('click', verifyAnswer);
startBtn.addEventListener('click', startQuiz);
saveScore.addEventListener('click', saveHighScore);

init();