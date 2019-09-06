'use strict';
console.log("Code begins");
const STORE = {
  questions: [
    {
      title: "What was the type of the first pokemon Ash ever received?",
      answers: ["Fire", "Water", "Grass", "Electric"],
      correctAnswer: 3
    },
    {
      title: "How many badges did Ash need to enter the pokemon league?",
      answers: ["Four badges", "Six badges", "Two badges", "Eight badges"],
      correctAnswer: 3
    },
    {
      title: "Which of Ash's friends were also gym leaders?",
      answers: ["Misty | Brock", "Gary | Professor Oak ", "Tracey | Lana", "May | Max"],
      correctAnswer: 0
    },
    {
      title: "What were the names of the infamous duo always trying to catch pikachu?",
      answers: ["Lt.Surge | Koga", "Jessie | James", "Giovanni | Brock", "Sabrina | Blaine"],
      correctAnswer: 1
    },
    {
      title: "What caused James Magikarp to evolve?",
      answers: ["He gave it a moon stone", "He kept it inside its pokeball", "He gave it to Ash", "He kicked it into a pond"],
      correctAnswer: 3
    },
    {
      title: "What device does Ash use to keep a record of his pokemon encounters?",
      answers: ["Pokedex", "Pokecounter", "Notebook", "His head"],
      correctAnswer: 0
    },
    {
      title: "What's Ash ketchums hometown?",
      answers: ["Viridian City", "Pewter City", "Pallet Town", "Cerulean City"],
      correctAnswer: 2
    },
    {
      title: "What was the name of the first pokemon Ash caught in the wild?",
      answers: ["Caterpie", "Primate", "Charmander", "Beedrill"],
      correctAnswer: 0
    },
    {
      title: "What round did Ash make it to during the Indigo Plateau Conference?",
      answers: ["Second round", "Eighth(final) round", "Fourth round", "Fifth round"],
      correctAnswer: 3
    },
    {
      title: "What pokemon did Ash save pikachu from in the first episode?",
      answers: ["Bulbasaur", "Spearow", "Charmeleon", "Nidoking"],
      correctAnswer: 1
    },
  ],
  questionNumber: 0,
  score: 0
};
/* 
  User Stories 
  A user should...
  Click a start button to start the quiz
  Not be able to skip questions
  Answer a series of 5 or more multiple choice questions
  See which question they're on (e.g., "7 out of 10")
  See their current score (e.g., "5 correct, 2 incorrect")
  Receive feedback and, if incorrect, see the correct answer.
  Move to the next question by clicking a button
  See overall score at the end of the quiz
  Be able to start a new quiz
*/

// Template generators
function generateQuestionView() { 
  let questions = STORE.questions;
  let questionNumber = STORE.questionNumber;
  let answers = STORE.questions[questionNumber].answers;
  return `
  <p>Question: ${questionNumber + 1} of ${questions.length}</p>
  <p>Score: ${STORE.score}</p>
  <br>
  <form class="question-form js-question-form">
    <fieldset>
      <legend class="question">${questions[questionNumber].title}</legend>
      <br>
      <input type="radio" id="answer-0" name="answer" value="0" checked>
      <label for="answer-0">${answers[0]}</label>
      <br>
      <input type="radio" id="answer-1" name="answer" value="1">
      <label for="answer-1">${answers[1]}</label>
      <br>
      <input type="radio" id="answer-2" name="answer" value="2">
      <label for="answer-2">${answers[2]}</label>
      <br>
      <input type="radio" id="answer-3" name="answer" value="3">
      <label for="answer-3">${answers[3]}</label>
    </fieldset>
    <button class="submit-answer-button"type="submit">Submit</button>
</form>
`
}

function generateCorrectView() {
  return `
  <div class="correct-view js-correct-view">
  <p>Correct!</p>
  <p>You got ${STORE.score} of ${STORE.questions.length}</p>
  <img class="correct-answer-image"src="./assets/pikachu-electric.png" alt="pikachu-electric-attack">
  <br>
  <button class="next-question js-next-question" type="submit">Next Question</button>
</div>
`;
}

function generateInCorrectView() {
  const correctAnswer = STORE.questions[STORE.questionNumber].answers[STORE.questions[STORE.questionNumber].correctAnswer];

  console.log(correctAnswer);
  return `
  <p>Incorrect!</p>
  <p>You got ${STORE.score} of ${STORE.questions.length}</p>
  <img class="incorrect-answer-image" src="./assets/jessie-kicking-magikarp.jpg" alt="pikachu-electric-attack">
  <p>The correct answer is: ${correctAnswer}</p>
  <button class="next-question js-next-question" type="submit">Next Question</button>
  `;
}

function generateEndOFQuiz() {
  return `
  <p>End of Quiz</p>
  <p>You got ${STORE.score} of ${STORE.questions.length} quesitons correct!</p>
  <p>Score: ${STORE.score} </p>
  <button class="end-of-quiz js-end-of-quiz"type="submit">Restart quiz</button>`
}

// Event Listeners
// won't need to use event delegation on this form because this will be on the page when it loads
function handleStartQuiz() {
  console.log("handleStartQuiz ran");
  $(".container button").on("click", function(event) {
    event.preventDefault();
    console.log("Start button clicked");
    $(".container").html(generateQuestionView(STORE));
  });
}

// will need event delegation because they render after page load
function handleSubmitButton() {
  $(".container").on("submit", ".js-question-form", function(event) {
    event.preventDefault();
    console.log("question form submitted");
    checkAnswer();
  })
}

function handleNextQuestion() {
  $(".container").on("click", ".js-next-question", function(event) {
    console.log("next question clicked");
    if (STORE.questionNumber !== STORE.questions.length){
    $(".container").html(generateQuestionView(STORE));
    } else {
      $(".container").html(generateEndOFQuiz());
    }
  });
}

function handleRestartQuiz(){
  $(".container").on("click", ".js-end-of-quiz", function(event) {
    event.preventDefault();
    STORE.score = 0;
    STORE.questionNumber = 0;
    $(".container").html(generateQuestionView((STORE)));
  });
}

// resonsible for checking the answer submitted against the correct answers index
// also responsible for calling the next question
function checkAnswer() {
      // check the inputs values against the store
      const userSelectedAnswer = $("form input[type='radio']:checked").val();
      // turned user input value into an integer.
      const userAnswerInt = parseInt(userSelectedAnswer);
      console.log(userAnswerInt);
      console.log(STORE.questions[STORE.questionNumber].correctAnswer);
      // if correct call correct view 
      // otherwise call incorrect view
      if (userAnswerInt === STORE.questions[STORE.questionNumber].correctAnswer) {
        console.log("correct!");
        STORE.score++;
        const correct = generateCorrectView();
        $(".container").html(correct);
      } else {
        console.log("incorrect!")
        const incorrect = generateInCorrectView();
        $(".container").html(incorrect);
      }
      
      STORE.questionNumber++;
}

function main() {
  // document ready function
  console.log("main ran");
  handleStartQuiz();
  handleSubmitButton();
  handleNextQuestion();
  handleRestartQuiz();
};


$(main);


console.log("Code ends");

/* 
for every ansnwer genreate a new input with the id 
answers.map((answer, i) => {
  <input name="blah" value="answer[i]"></input>
})
*/


