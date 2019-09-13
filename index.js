'use strict';

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

// Responsible for generating the html for the question view page
function generateQuestionView() { 
  let questions = STORE.questions;
  let questionNumber = STORE.questionNumber;
  let answers = STORE.questions[questionNumber].answers;
  return `
  <p>Question: ${questionNumber + 1} of ${questions.length}</p>
  <p>Score: ${STORE.score}</p>
  
  <form class="question-form js-question-form">
    <fieldset>
      <legend class="question">${questions[questionNumber].title}</legend>
      <div class="answers">
        <label for="answer-0">
          <input type="radio" id="answer-0" name="answer" value="0" checked>
          ${answers[0]}
        </label>
      
      
      <label for="answer-1">
      <input type="radio" id="answer-1" name="answer" value="1">
      ${answers[1]}
      </label>
     
      
      <label for="answer-2">
      <input type="radio" id="answer-2" name="answer" value="2">
      ${answers[2]}
      </label>
    
      
      <label for="answer-3">
      <input type="radio" id="answer-3" name="answer" value="3">
      ${answers[3]}</label>
      </div>
    </fieldset>
    <button class="submit-answer-button"type="submit">Submit</button>
</form>
`
}

// the html for the correct view screen
function generateCorrectView() {
  return `
  <div class="correct-view js-correct-view">
  <p>Correct!</p>
  <p>You got ${STORE.score} of ${STORE.questions.length}</p>
  <img class="correct-answer-image"src="./images/pikachu-electric.png" alt="pikachu">
  <br>
  <button class="next-question js-next-question" type="submit">Next Question</button>
</div>
`;
}

// the html for the incorrect view screen
function generateInCorrectView() {
  const correctAnswer = STORE.questions[STORE.questionNumber].answers[STORE.questions[STORE.questionNumber].correctAnswer];

  return `
  <p>Incorrect!</p>
  <p>You got ${STORE.score} of ${STORE.questions.length}</p>
  <img class="incorrect-answer-image" src="./images/jessie-kicking-magikarp.jpg" alt="jessie-angry">
  <p>The correct answer is: ${correctAnswer}</p>
  <button class="next-question js-next-question" type="submit">Next Question</button>
  `;
}

// the html for the end of the quiz screen
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
  $("button").on("click", function(event) {
    event.preventDefault();
    $(".container").html(generateQuestionView(STORE));
  });
}

// will need event delegation because they render after page load
function handleSubmitButton() {
  $(".container").on("submit", ".js-question-form", function(event) {
    event.preventDefault();
    checkAnswer();
  })
}

function handleNextQuestion() {
  $(".container").on("click", ".js-next-question", function(event) {
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
      // if correct call correct view 
      // otherwise call incorrect view
      if (userAnswerInt === STORE.questions[STORE.questionNumber].correctAnswer) {
        STORE.score++;
        const correct = generateCorrectView();
        $(".container").html(correct);
      } else {
        const incorrect = generateInCorrectView();
        $(".container").html(incorrect);
      }
      
      STORE.questionNumber++;
}

function main() {
  // document ready function
  handleStartQuiz();
  handleSubmitButton();
  handleNextQuestion();
  handleRestartQuiz();
};


$(main);

