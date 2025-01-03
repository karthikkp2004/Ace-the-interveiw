const API_BASE = "http://localhost:5000";

// Fetch questions and display them
async function loadQuestions() {
  const response = await fetch(`${API_BASE}/questions`);
  const questions = await response.json();

  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = ""; // Clear existing content

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option, i) => {
      const optionLabel = document.createElement("label");
      optionLabel.textContent = option;

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${q._id}`;
      optionInput.value = i;

      optionLabel.prepend(optionInput);
      questionDiv.appendChild(optionLabel);
    });

    questionContainer.appendChild(questionDiv);
  });
}

// Submit answer and update MongoDB
async function submitAnswer() {
  const questions = document.querySelectorAll(".question");

  for (const question of questions) {
    const selectedOption = question.querySelector("input[type=radio]:checked");
    if (selectedOption) {
      const questionId = selectedOption.name.split("-")[1];
      const correctAnswer = parseInt(selectedOption.value);

      try {
        await fetch(`${API_BASE}/questions/${questionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correctAnswer }),
        });
      } catch (error) {
        console.error("Error updating answer:", error);
      }
    }
  }

  document.getElementById("result").textContent = "Answers updated successfully!";
}

// Event Listeners
document.getElementById("submit-answer").addEventListener("click", submitAnswer);

// Load questions on page load
loadQuestions();
