$(document).ready(function() {

//when page loaded this screen will display
function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

//when user click on start button on initial screen 
//this funcation will invoke
$("body").on("click", ".start-button", function(event){
	event.preventDefault();  
	
	generateHTML();

	timerWrapper();

}); 

//when user click on answer options 
//this event will invoke
$("body").on("click", ".answer", function(event){
	selectedAnswer = $(this).text();
	//alert(correctAnswers[questionCounter]);
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");
        $(this).css('background-color','green');
		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		$(this).css('background-color','red');
		clearInterval(theClock);
		generateLoss();
	}
});

//when user click on button on reset 
$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

}); 

//this funcation will called when 
//timeout happen
function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
	+ counter + "</span></p>" 
	+ "<p class='text-center'>You ran out of time! </p>" ;
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}


//this funcation will reset the counter and set timer 
//to new timeout value.
function generateWin() {
	correctTally++;
	setTimeout(wait, 1000);  
}

//this funcation will reset the counter and set timer 
//to new timeout value.
function generateLoss() {
	incorrectTally++;
	setTimeout(wait, 1000); 
}

// this is genrate the different question and 
// it's answer option 
function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><h2 class='text-center'>" 
	+ questionArray[questionCounter] 
	+ "</h2><p class='first-answer answer'>A. " 
	+ answerArray[questionCounter][0] 
	+ "</p><p class='answer'>B. "
	+answerArray[questionCounter][1]
	+"</p><p class='answer'>C. "
	+answerArray[questionCounter][2]
	+"</p><p class='answer'>D. "
	+answerArray[questionCounter][3]
	+"</p>";

	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" 
	+ counter 
	+ "</span></p>" 
	+ "<p class='text-center'>All done, here's your score" 
	+ "</p>" 
	+ "<p class='summary-correct'>Correct Answers: " 
	+ correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is Capitol of United States of America?", "What is the area of circle with radius 2?", "What is the 6 mutltiply 7?", "What is 4th of July in United States of America?", "What is the capital of China?", "What is the capital of Turkey?", "What is the capital of Colombia?", "What is the capital of India?"];
var answerArray = [["District of Colombia", "Melbourne", "Sydney", "Darwin"], ["6pi","4pi","9pi","10pi"], ["90", "42", "56", "46"], ["Mother's Day","Valentine Day","Independance Day","Memorial Day"], ["Hong Kong", "Macau", "Shanghai", "Beijing"], ["Ankara","Istanbul","Antalya","Bursa"], ["Medellin", "Bogota", "Cartagena", "Cali"], ["Mumbai","Hyderabad","Bangalore","New Delhi"]];
var correctAnswers = ["A. District of Colombia", "B. 4pi", "B. 42", "C. Independance Day", "D. Beijing", "A. Ankara", "B. Bogota", "D. New Delhi"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

