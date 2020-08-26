const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingBtn = document.getElementById('setting-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('setting-form');
const difficultySelect = document.getElementById('difficulty');


// List of words for game

const words = [
  'Assalomu aleykum',
  'Do`stlar',
  'Axvollar yahshimi',
  'nima gapla',
  'charchamay',
  'Ulug`bek',
  'Shohmurod',
  'Otabek',
  'Bobur Mirzo',
  'Azamat',
  'Abdulaziz',
  'Umidjon',
  'Hasanboy',
  'modernizatsiyalashtirilganmikin',
  'yeb qo`yding uvaaa',
  'Ajoyib',
  'Yaxshi yetyapsiz',
  'Tezlashing',
  'Sekinroq',
  'katta T ni bosing',
  'Sardor',
  'Namangan',
  'Sardoba',
  'Chorsu'
];

//Init word

let randomWord;

// init score
let score = 0;

//init time
let time = 10;


// Set difficulty to value in ls or medium
let difficulty = 
 localStorage.getItem('difficulty') !== null 
  ? localStorage.getItem('difficulty') 
  : 'medium';

// Set difficulty select value
difficultySelect.value = 
localStorage.getItem('difficulty') !== null 
? localStorage.getItem('difficulty') 
: 'medium';

//Focus on Text on start

text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000); 

//Generate random word from array
function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//UpdateScore
function UpdateScore(){
  score++;
  scoreEl.innerHTML = score;
}

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';
 
   if (time === 0) {
     clearInterval(timeInterval);
     //end game
     gameOver();
   }
}

// Game over, show end screeen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}


addWordToDOM();

// Event listener  

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  
  if (insertedText === randomWord){
    addWordToDOM();
   UpdateScore();
    //Clear

   e.target.value= '';
    if(difficulty === 'hard'){
     time+= 2;
    } else if(difficulty === 'medium'){
      time += 3;
    } else {
      time += 5;
    }
    
   updateTime();
  }

});

// Settings  btn click

settingBtn.addEventListener('click', () => 
settings.classList.toggle('hide'));

// Settings select

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});