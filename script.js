const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let questionsElement = document.getElementById("questions");
let btn = document.getElementById("submit");
let score = 0;
const scoreElement = document.getElementById("score");

let progress =
  JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
    questionsElement.innerHTML = "";

  questions.forEach((el) => {
    let question = el.question;
    const questionElement = document.createElement("div");
    const textElement = document.createElement("p");
    textElement.innerText = question;
    questionElement.appendChild(textElement);

    el.choices.forEach((opt) => {
      const choice = opt;
      const input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("name", `${question}`);
      input.setAttribute("value", choice);
      const id = `${question}-${choice}`;
      input.setAttribute("id", id);
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = choice;

       if (progress[el.question] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        progress[el.question] = choice;

        sessionStorage.setItem(
          "progress",
          JSON.stringify(progress)
        );
      });
      questionElement.appendChild(input);
      questionElement.appendChild(label);
      
    });
    


    questionsElement.appendChild(questionElement);
  });
}

const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}


renderQuestions();

btn.addEventListener("click", () => {
  score = 0;

  questions.forEach((q) => {
    const selected = document.querySelector(
      `input[name="${q.question}"]:checked`,
    );

    if (selected && selected.value === q.answer) {
      score++;
    }
  });
 
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});
