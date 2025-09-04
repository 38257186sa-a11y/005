let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Load questions dynamically from JSON (example: 2004.json)
async function loadQuiz(year = "2004.json") {
  try {
    const response = await fetch(year);
    questions = await response.json();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score-container").innerHTML = "";
    showQuestion();
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
}

// Show question
function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");

  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsContainer.appendChild(button);
  });

  nextBtn.style.display = "none";
}

// Reset UI before new question
function resetState() {
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
}

// Handle Answer Selection
function selectAnswer(button, correctAnswer) {
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (button.innerText === correctAnswer) {
    score++;
  } else {
    button.classList.add("wrong");
  }

  document.getElementById("next-btn").style.display = "block";
}

// Next Question or Show Score
document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// Show Score
function showScore() {
  document.getElementById("question").innerText = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("score-container").innerHTML =
    `🎉 Quiz Completed! <br> ✅ Your Score: ${score} / ${questions.length}`;
}

// Auto-load quiz (you can change to 2004.json or any year)
window.onload = () => loadQuiz("2004.json");
