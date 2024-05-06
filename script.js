document.addEventListener('DOMContentLoaded', function() {
    const words = ['javascript', 'hangman', 'programming', 'computer', 'coding', 'algorithm'];
    let currentWord;
    let jumbledWord;
    let timerInterval;
    let timeLeft = 30; // Time limit for guessing each word (in seconds)
  
    const jumbledWordContainer = document.getElementById('jumbled-word');
    const guessInput = document.getElementById('guess-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');
    const nextBtn = document.getElementById('next-btn');
    const timerContainer = document.getElementById('timer-container');
  
    // Initialize the game
    function init() {
      // Start timer
      startTimer();
  
      // Display jumbled word
      nextWord();
      
      // Submit button click event
      submitBtn.addEventListener('click', checkGuess);
  
      // Next button click event
      nextBtn.addEventListener('click', nextWord);
    }
  
    // Generate a random jumbled word
    function generateJumbledWord(word) {
      const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
      return shuffledWord;
    }
  
    // Display the jumbled word
    function displayJumbledWord() {
      jumbledWordContainer.textContent = jumbledWord;
    }
  
    // Start the timer
    function startTimer() {
      timerInterval = setInterval(() => {
        timerContainer.textContent = `Time left: ${timeLeft}s`;
  
        if (timeLeft === 0) {
          clearInterval(timerInterval);
          resultContainer.textContent = 'Time\'s up! Try the next word.';
          disableInput();
        }
  
        timeLeft--;
      }, 1000);
    }
  
    // Stop the timer
    function stopTimer() {
      clearInterval(timerInterval);
      timerContainer.textContent = '';
    }
  
    // Check the player's guess
    function checkGuess() {
      const guess = guessInput.value.toLowerCase();
      if (guess === currentWord) {
        resultContainer.textContent = 'Correct!';
        resultContainer.style.color = 'green';
      } else {
        resultContainer.textContent = 'Incorrect! Try again.';
        resultContainer.style.color = 'red';
      }
      disableInput();
      stopTimer();
    }
  
    // Disable input fields and buttons
    function disableInput() {
      guessInput.disabled = true;
      submitBtn.disabled = true;
      nextBtn.disabled = false;
    }
  
    // Enable input fields and buttons
    function enableInput() {
      guessInput.disabled = false;
      submitBtn.disabled = false;
      nextBtn.disabled = true;
      guessInput.value = '';
      resultContainer.textContent = '';
      resultContainer.style.color = '';
    }
  
    // Get the next word
    function nextWord() {
      currentWord = words[Math.floor(Math.random() * words.length)];
      jumbledWord = generateJumbledWord(currentWord);
      displayJumbledWord();
      enableInput();
      timeLeft = 30; // Reset time left
      startTimer(); // Restart timer for the next word
    }
  
    // Start the game
    init();
  });
  