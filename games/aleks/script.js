const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const roundEl = document.getElementById("round");
const restartButton = document.getElementById("restart");
const hintText = document.getElementById("hintText");
const characterImage = document.getElementById("characterImage");

const totalRounds = 20;
let currentRound = 0;
let score = 0;
let quizOrder = [];
let activeQuestion = null;
let acceptingAnswer = true;

const characters = [
  {
    name: "Ash",
    role: "Attacker",
    gadget: "Breaching Round",
    hint: "Kiire tark ja röövlusehävitaja",
    color: "#df5516",
    image: "images/Ash.png",
  },
  {
    name: "Thermite",
    role: "Attacker",
    gadget: "Exothermic Charge",
    hint: "Suletud seinad ei pea teda peatama",
    color: "#fd8a07",
    image: "images/Thermite.png",
  },
  {
    name: "Jäger",
    role: "Defender",
    gadget: "Active Defense System",
    hint: "Ta kaitseb ala aktiivse tuhandete kuulide eest",
    color: "#fbff03",
    image: "images/Jager.png",
  },
  {
    name: "Bandit",
    role: "Defender",
    gadget: "Shock Wire",
    hint: "Elektriline lõks, mis keelab purunemise",
    color: "#f0d90d",
    image: "images/Bandit.png",
  },
  {
    name: "Sledge",
    role: "Attacker",
    gadget: "Tactical Hammer",
    hint: "Tema vasar lööb läbi betooni ja õhku",
    color: "#c79b4a",
    image: "images/Sledge.png",
  },
  {
    name: "Glaz",
    role: "Attacker",
    gadget: "Thermal Scope",
    hint: "Näeb vaenlast läbi pimeduse",
    color: "#da1e17",
    image: "images/Glaz.png",
  },
  {
    name: "Mute",
    role: "Defender",
    gadget: "Signal Disruptor",
    hint: "Ta vaigistab droonid ja sidekanalid",
    color: "#b18423",
    image: "images/Mute.png",
  },
  {
    name: "Doc",
    role: "Defender",
    gadget: "Stim Pistol",
    hint: "Ta hoiab tiimi elusööstusega",
    color: "#0e58e0",
    image: "images/Doc.png",
  },
  {
    name: "Buck",
    role: "Attacker",
    gadget: "Skeleton Key",
    hint: "Tema püss kombineerib relva ja kangi",
    color: "#1079aa",
    image: "images/Buck.png",
  },
  {
    name: "Kapkan",
    role: "Defender",
    gadget: "Entry Denial Device",
    hint: "Ukse lävi ei tohiks talle sattuda",
    color: "#dd2019",
    image: "images/Kapkan.png",
  },
  {
    name: "IQ",
    role: "Attacker",
    gadget: "Electronics Detector",
    hint: "Ta näeb elektroonikat seinte läbi",
    color: "#fbff00",
    image: "images/IQ.png",
  },
  {
    name: "Fuze",
    role: "Attacker",
    gadget: "Cluster Charge",
    hint: "Tema kulkerid maitsevad palju",
    color: "#ff0800",
    image: "images/Fuze.png",
  },
  {
    name: "Pulse",
    role: "Defender",
    gadget: "Cardiac Sensor",
    hint: "Ta kuulab südameid seinte taga",
    color: "#ff7300",
    image: "images/Pulse.png",
  },
  {
    name: "Castle",
    role: "Defender",
    gadget: "Armor Panel",
    hint: "Tema paneelid tugevdavad aknaid",
    color: "#fc7100",
    image: "images/Castle.png",
  },
  {
    name: "Rook",
    role: "Defender",
    gadget: "Armor Pack",
    hint: "Ta jagab kiivrid kaitsmiseks",
    color: "#0059ff",
    image: "images/Rook.png",
  },
  {
    name: "Recruit",
    role: "Attacker/Defender",
    gadget: "Custom Loadout",
    hint: "Paindlik ja universaalne sõdur",
    color: "#888888",
    image: "images/Recruit.png",
  },
  {
    name: "Twitch",
    role: "Attacker",
    gadget: "Shock Drone",
    hint: "Tema droon taunib vaenlasi",
    color: "#0044ff",
    image: "images/Twitch.png",
  },
  {
    name: "Montagne",
    role: "Attacker",
    gadget: "Extendable Shield",
    hint: "Tema kilp on peaaegu vastutu",
    color: "#2552e6",
    image: "images/Montagne.png",
  },
  {
    name: "Valkyrie",
    role: "Defender",
    gadget: "Black Eye",
    hint: "Tema kaamerad jälgivad kõike",
    color: "#fffb00",
    image: "images/Valkyrie.png",
  },
  {
    name: "Vigil",
    role: "Defender",
    gadget: "ERC-7",
    hint: "Ta kaob droonide näkust",
    color: "#292b2a",
    image: "images/Vigil.png",
  },
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  currentRound = 0;
  score = 0;
  quizOrder = shuffle([...characters]).slice(0, totalRounds);
  updateStatus();
  setNextQuestion();
}

function updateStatus() {
  roundEl.textContent = `Ring: ${currentRound + 1} / ${totalRounds}`;
  scoreEl.textContent = `Skor: ${score}`;
}

function setNextQuestion() {
  const question = quizOrder[currentRound];
  activeQuestion = question;
  acceptingAnswer = true;
  hintText.textContent = `${question.hint} · Roll: ${question.role}`;
  renderImage(question);
  renderAnswers(question);
}

function renderImage(character) {
  characterImage.innerHTML = "";
  characterImage.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 35%), linear-gradient(135deg, ${character.color} 0%, #102034 100%)`;

  if (character.image) {
    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.name;
    img.onload = () => {
      characterImage.appendChild(img);
    };
    img.onerror = () => {
      const label = document.createElement("div");
      label.className = "image-label";
      label.textContent = character.name;
      characterImage.appendChild(label);
    };
  } else {
    const label = document.createElement("div");
    label.className = "image-label";
    label.textContent = character.name;
    characterImage.appendChild(label);
  }
}

function renderAnswers(question) {
  answersEl.innerHTML = "";
  const choices = shuffle([
    question,
    ...shuffle(characters.filter((c) => c.name !== question.name)).slice(0, 3),
  ]);

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = choice.name;
    button.dataset.name = choice.name;
    button.addEventListener("click", selectAnswer);
    answersEl.appendChild(button);
  });
}

function selectAnswer(event) {
  if (!acceptingAnswer) return;
  acceptingAnswer = false;
  const selectedName = event.currentTarget.dataset.name;
  const isCorrect = selectedName === activeQuestion.name;

  if (isCorrect) {
    score += 10;
    event.currentTarget.classList.add("correct");
  } else {
    event.currentTarget.classList.add("wrong");
    const correctButton = Array.from(answersEl.children).find(
      (button) => button.dataset.name === activeQuestion.name
    );
    if (correctButton) correctButton.classList.add("correct");
  }

  if (currentRound < totalRounds - 1) {
    setTimeout(() => {
      currentRound += 1;
      updateStatus();
      setNextQuestion();
    }, 1000);
  } else {
    setTimeout(showFinalScore, 1000);
  }
  updateStatus();
}

function showFinalScore() {
  characterImage.innerHTML = `<div class="image-label">Lõplik Skor: ${score} / ${totalRounds * 10}</div>`;
  hintText.textContent = "Tänan mängimise eest! Täida uuesti, et proovida jälle.";
  answersEl.innerHTML = "";
  currentRound = totalRounds;
  roundEl.textContent = `Ring: ${totalRounds} / ${totalRounds}`;
}

restartButton.addEventListener("click", () => {
  startQuiz();
});

startQuiz();
