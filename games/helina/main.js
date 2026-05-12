const questions = [
  {
    question: "How many players are on the ice for one hockey team normally?",
    answers: ["4", "5", "6", "7"],
    correct: "6"
  },
  {
    question: "What is used to hit the puck?",
    answers: ["Bat", "Stick", "Racket", "Club"],
    correct: "Stick"
  },
  {
    question: "What color is a standard hockey puck?",
    answers: ["Blue", "Black", "White", "Orange"],
    correct: "Black"
  },
  {
    question: "Which position protects the net?",
    answers: ["Forward", "Center", "Goalie", "Captain"],
    correct: "Goalie"
  },
  {
    question: "What do players skate on?",
    answers: ["Rollers", "Ice skates", "Shoes", "Boards"],
    correct: "Ice skates"
  },
  {
    question: "How many periods are in a hockey game?",
    answers: ["2", "3", "4", "5"],
    correct: "3"
  },
  {
    question: "What happens when a player breaks the rules?",
    answers: ["Goal", "Penalty", "Timeout", "Win"],
    correct: "Penalty"
  },
  {
    question: "What is scored to earn points?",
    answers: ["Touchdown", "Goal", "Home run", "Basket"],
    correct: "Goal"
  },
  {
    question: "What surface is ice hockey played on?",
    answers: ["Grass", "Sand", "Ice", "Wood"],
    correct: "Ice"
  },
  {
    question: "Which country is famous for hockey?",
    answers: ["Canada", "Brazil", "Egypt", "India"],
    correct: "Canada"
  },
  {
    question: "What is the NHL?",
    answers: [
      "National Hockey League",
      "Northern Hockey Line",
      "New Hockey League",
      "National Handball League"
    ],
    correct: "National Hockey League"
  },
  {
    question: "What protects a player's head?",
    answers: ["Helmet", "Boots", "Gloves", "Scarf"],
    correct: "Helmet"
  },
  {
    question: "What shape is a hockey rink?",
    answers: ["Triangle", "Circle", "Rectangle", "Star"],
    correct: "Rectangle"
  },
  {
    question: "What is the middle line on the rink usually called?",
    answers: ["Red line", "Blue line", "Goal line", "Green line"],
    correct: "Red line"
  },
  {
    question: "What are hockey fans cheering for?",
    answers: ["Goals", "Birds", "Cars", "Rain"],
    correct: "Goals"
  },
  {
    question: "What is overtime used for?",
    answers: [
      "Lunch break",
      "Extra time to decide winner",
      "Practice",
      "Intermission"
    ],
    correct: "Extra time to decide winner"
  },
  {
    question: "What do goalies wear on their legs?",
    answers: ["Pads", "Sandals", "Shorts", "Belts"],
    correct: "Pads"
  },
  {
    question: "Which item is frozen in hockey?",
    answers: ["Ball", "Puck", "Helmet", "Stick"],
    correct: "Puck"
  },
  {
    question: "What is the area in front of the goal called?",
    answers: ["Circle", "Crease", "Tunnel", "Corner"],
    correct: "Crease"
  },
  {
    question: "What is a player called who scores 3 goals in one game?",
    answers: ["Champion", "Hat Trick Hero", "Captain", "Referee"],
    correct: "Hat Trick Hero"
  }
];

let currentQuestion = 0;
let correctAnswers = 0;
let weight = 1;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const correctEl = document.getElementById("correct");
const weightEl = document.getElementById("weight");
const catEl = document.getElementById("cat");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
  const q = questions[currentQuestion];

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;

    btn.onclick = () => checkAnswer(answer);

    answersEl.appendChild(btn);
  });
}

function updateCatSize() {
  catEl.style.setProperty("--scale", weight);
  catEl.style.transform = `scale(${weight})`;
}

function shakeCat() {
  catEl.classList.add("shake");

  setTimeout(() => {
    catEl.classList.remove("shake");
  }, 300);
}

function checkAnswer(answer) {
  const q = questions[currentQuestion];

  if (answer === q.correct) {
    correctAnswers++;
    messageEl.textContent = "✅ Correct! Cat loses chonks of weight!";
    weight = Math.max(1, weight - 0.1);
  } else {
    messageEl.textContent = "❌ Wrong! Cat gains chonks of weight!";
    weight += 0.12;

    shakeCat();
  }

  correctEl.textContent = correctAnswers;
  weightEl.textContent = weight.toFixed(1);

  updateCatSize();

  currentQuestion++;

  if (currentQuestion < questions.length) {
    setTimeout(loadQuestion, 900);
  } else {
    endGame();
  }
}

function endGame() {
  questionEl.textContent = "";

  if (correctAnswers >= 15) {
    messageEl.textContent =
      `🏆 Amazing! The hockey cat stayed slim with ${correctAnswers}/20 correct!`;
  } else {
    messageEl.textContent =
      `🍔 The hockey cat became A FATASS with only ${correctAnswers}/20 correct!`;
  }

  answersEl.innerHTML = "";
  restartBtn.style.display = "inline-block";
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  correctAnswers = 0;
  weight = 1;

  correctEl.textContent = "0";
  weightEl.textContent = "1";
  messageEl.textContent = "";

  restartBtn.style.display = "none";

  updateCatSize();

  loadQuestion();
};

loadQuestion();