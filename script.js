// ==========================
// Tous les mots (substantifs, adjectifs, verbes, pronoms, mots invariables)
const words = {
  substantifs: [ /* mettre tous les substantifs */ ],
  adjectifs: [ /* mettre tous les adjectifs */ ],
  verbes: [ /* mettre tous les verbes */ ],
  pronoms: [ /* mettre tous les pronoms */ ],
  motsInvariables: [ /* mettre tous les mots invariables */ ]
};

// ==========================
// Variables
let mode = "grec-fr";
let allWords = [];
let wrongWords = [];
let currentWord = null;
let correctCount = 0, wrongCount = 0;

// ==========================
// Initialisation
function flattenWords() {
  allWords = [];
  for (let cat in words) allWords = allWords.concat(words[cat]);
}
flattenWords();

// ==========================
// Pages
const homePage = document.getElementById("homePage");
const quizPage = document.getElementById("quizPage");
const dictPage = document.getElementById("dictPage");

// Boutons navigation
document.getElementById("enterBtn").onclick = () => { homePage.classList.add("hidden"); quizPage.classList.remove("hidden"); showWord(); };
document.getElementById("showDictBtn").onclick = () => { quizPage.classList.add("hidden"); dictPage.classList.remove("hidden"); showDictionary(); };
document.getElementById("backQuiz").onclick = () => { dictPage.classList.add("hidden"); quizPage.classList.remove("hidden"); };

// ==========================
// Quiz logique
function getRandomWord() {
  if (wrongWords.length > 0 && Math.random() < 0.5) return wrongWords[Math.floor(Math.random()*wrongWords.length)];
  return allWords[Math.floor(Math.random()*allWords.length)];
}

function showWord() {
  currentWord = getRandomWord();
  const card = document.getElementById("card");
  const wordDiv = document.getElementById("word");
  const defDiv = document.getElementById("definition");

  defDiv.classList.add("hidden");
  card.classList.remove("correct", "wrong");

  if (mode === "grec-fr") { wordDiv.textContent = currentWord.grec; defDiv.textContent = currentWord.fr; }
  else { wordDiv.textContent = currentWord.fr; defDiv.textContent = currentWord.grec; }
}

function updateCounters() {
  document.getElementById("correct").textContent = correctCount;
  document.getElementById("wrong").textContent = wrongCount;
}

function handleKnow() {
  correctCount++;
  const card = document.getElementById("card");
  card.classList.add("correct");
  wrongWords = wrongWords.filter(w => w !== currentWord);
  updateCounters();
  setTimeout(showWord, 800);
}

function handleDontKnow() {
  wrongCount++;
  const card = document.getElementById("card");
  card.classList.add("wrong");
  document.getElementById("definition").classList.remove("hidden");
  if (!wrongWords.includes(currentWord)) wrongWords.push(currentWord);
  updateCounters();
}

// ==========================
// Dictionnaire
function showDictionary() {
  const container = document.getElementById("dictionary");
  container.innerHTML = "";
  for (let cat in words) {
    const catDiv = document.createElement("div");
    catDiv.classList.add("category");
    const title = document.createElement("h3"); title.textContent = cat.toUpperCase();
    catDiv.appendChild(title);
    const ul = document.createElement("ul");
    words[cat].forEach(w => { const li = document.createElement("li"); li.textContent = `${w.grec} → ${w.fr}`; ul.appendChild(li); });
    catDiv.appendChild(ul);
    container.appendChild(catDiv);
  }
}

// ==========================
// Événements
window.onload = function() {
  document.getElementById("know").onclick = handleKnow;
  document.getElementById("dontknow").onclick = handleDontKnow;
  document.getElementById("mode").onchange = (e) => { mode = e.target.value; showWord(); };
};