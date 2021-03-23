// Selecting elements with certain classes from the HTML page
const desc1 = document.querySelector('.desc1');
//const desc2 = document.querySelector('.desc2');
const readmorebtn = document.querySelector('.read-more-btn');
const readlessbtn = document.querySelector('.read-less-btn');
const message = document.querySelector('.message');
const output = document.querySelector('.que');
const nx = document.querySelector('.next');
const results = document.querySelector('.results')
const rightwrong = document.querySelector('.rwratio');
const rating = document.querySelector('.rating');
const anspic = document.querySelector('.anspic');

const game = {};

nx.addEventListener('click', createQuestion);
const url = 'https://script.google.com/macros/s/AKfycby2G0npdssP1nQ-Rs36j_F3gu238TlurDJ7nTuQOdF4d3XUcgoxuFlM/exec'; // Script that retrieves the data from the spreadsheet with all of the questions, answers, and options


fetch(url).then(function(res){
  return res.json();
}).then(function(data){
  console.log(data.data);
  game.total = data.data.length;
  game.val = 0; // question we are on
  game.score = 0; // # of questions answered correctly
  game.arr = data.data; // Array for the game with the data from the spreadsheet
  data.data.forEach(function(el){
    console.log(el);
  })
  createQuestion();
});

function createQuestion() { // Finds and loads a question on screen with what number it is out of the total along with the answer options
  nx.style.display = "none"; // hides the Next Question button before you pick an answer
  anspic.style.display = "none"; // hides the right/wrong answer picture before you pick answer
  let scorepercent = (game.score/game.total) * 100;
  if(game.val + 1 > game.total){ // If the game is over...
    message.textContent = 'Score: ' + game.score + ' out of ' + game.total;
    output.textContent = "GAME OVER";
    results.textContent = "You got " + scorepercent + "% correct";
    rightwrong.textContent = "Correct/Incorrect Answers Ratio - " + game.score + ":" + (game.total - game.score);

    // Rating: 1-20% bad, 21-40% poor, 41%-60% average, 61-80% decent, 81%-99% great job, 100% terrific 
    if (scorepercent <= 20) {
      rating.textContent = "Bad"
      rating.style.backgroundColor = "red";
      rating.style.color = "white";
    } else if (scorepercent <= 40) {
      rating.textContent = "Poor"
      rating.style.backgroundColor = "orange";
    } else if (scorepercent <= 60) {
      rating.textContent = "Average"
      rating.style.backgroundColor = "yellow";
    } else if (scorepercent <= 80) {
      rating.textContent = "Decent"
      rating.style.backgroundColor = "lightseagreen";
    } else if (scorepercent < 100) {
      rating.textContent = "Great job!"
      rating.style.backgroundColor = "green";
      rating.style.color = "white";
    } else if (scorepercent == 100) {
      rating.textContent = "Terrific!"
      rating.style.backgroundColor = "green";
      rating.style.color = "white";
    }

  } else{ // If the game is not over...
    message.textContent = 'Question #' + (game.val + 1) + ' out of ' + game.total;

    // Hides the output, results, right-wrong ratio, and rating (which show up at the end) while the game is still going on
    output.innerHTML = '';
    results.innerHTML = '';
    rightwrong.innerHTML = '';
    rating.innerHTML = '';

    console.log(game); 
    let q = game.arr[game.val]; // Grabs the correct question (with answers and options) from the array with the spreadsheet's data, grabs the # question that the user is on
    console.log(q);

    const main = document.createElement('div');
    main.textContent = q.question;
    main.classList.add('question');
    output.appendChild(main);
    arrayRandom(q.opt);
    q.opt.forEach(function(el){ // Loads all of the different answer options after the question
      console.log(el);
      let span = document.createElement('span');
      span.textContent = el;
      span.classList.add('answer');
      span.classList.add('btn');
      output.appendChild(span);
      span.ans = q.answer;
      span.addEventListener('click', checker); // When you pick an answer, it will run the function that checks if it is right or wrong
    })
  }
}

readmorebtn.addEventListener('click', readMore);
readlessbtn.addEventListener('click', readLess);

function readMore() { // When you click "Read More", it will hide the read more button, show the "Read less" button, and show the full content of the text in the description
  readmorebtn.style.display = "none"; 
  readlessbtn.style.display = "block";
  desc1.textContent = "When each question appears, you'll have multiple options. Choose the one that you believe is correct. Then, it will tell you whether you got it right or wrong, and you can click the button to move to the next problem.";
} 
  
  /* desc2.textContent = "Because it is. Don't ask questions. You should answer them, though. The ones in the quiz, I mean." */

function readLess() { // When you click "Read less", it will hide the "read less" button, show the "Read more" button, and change the content of the description to "..." 
  readlessbtn.style.display = "none";
  readmorebtn.style.display = "block";
  desc1.textContent = '...';
}

function arrayRandom(arr){ // Causes the answers for the questions to be in a random order (so that the answer isn't always the first one)
  arr.sort(function(){
    return .5 - Math.random();
  })
}


function checker(e){
  //console.log(e.target);
  //console.log(this.ans);

  const selAns = document.querySelectorAll('.answer');
  selAns.forEach(function(ele){
    ele.classList.remove('answer');
    ele.style.color = '#ddd'; // Greys out all other answers (the ones not picked)
    ele.removeEventListener('click', checker); // Makes it so you can't pick another answer again after answering the question
  })

  let sel = e.target;
  console.log(sel.textContent);
  if(sel.textContent == sel.ans){ // If the user picked the correct answer...
    console.log('correct');
    sel.style.color = 'green' // Change the color of the picked answer's text to green
    nx.textContent = 'Correct - click to move to the next question'; // The next button will say "Correct..."
    anspic.innerHTML = `<img src="images/greenthumbup1.png" alt="Nice job!">`; // Show a green thumbs up before the next button
    game.score++;
  } else{ // If the user picked the wrong answer...
    console.log('wrong');
    sel.style.color = 'red'; // Change the color of the picked answer to red
    nx.textContent = 'Wrong - click to move to the next question'; // The next button will say "Wrong..."
    anspic.innerHTML = `<img src="images/redthumbdown.png" alt="Oops! Try again next time">`; // Show a red thumbs down image before the next button
  }

  game.val++;
  nx.style.display = "block";
  anspic.style.display = "block";
}