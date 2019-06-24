// create an object that contains game content and methods
var game = {

    // array of game questions, options, and answers
    array: [
        {
            question: 'Which pokemon does Pikachu evolve into?',
            option: ['MEWTWO', 'PICHU', 'RAICHU', 'SQUIRTLE'],
            answer: 'RAICHU',
        },
        {
            question: 'What\'s the most effective Poke Ball in the game',
            option: ['POKE BALL', 'ULTRA BALL', 'SUPER BALL', 'MASTER BALL'],
            answer: 'MASTER BALL'
        },
        {
            question: 'Which was the first gym leader that beated Ash?',
            option: ['BROCK', 'MISTY', 'GIOVANNI', 'ERIKA'],
            answer: 'BROCK'
        },
        {
            question: 'Which was the first pokemon that was released from Ash?',
            option: ['PIDGEOT', 'BUTERFREE', 'CHARIZARD', 'LAPRAS'],
            answer: 'BUTERFREE'
        },
        {
            question: 'How many Gym Badges must a trainer collect before challenging the Elite Four?',
            option: ['4', '6', '8', '9'],
            answer: '8'
        },
        {
            question: 'What was the first pokemon ever created?', 
            option: ['BULBASAUR', 'CHARMANDER', 'RHYDON', 'PIKACHU'], 
            answer: 'RHYDON'
        },
        {
            question: 'Which pokemon has the same cry as Charizard in games?',
            option: ['MEWTWO', 'RHYHORN', 'DRAGONITE', 'LUGIA'],
            answer: 'RHYHORN'
        },
        {
            question: 'Which pokemon is the longest one to hatch from an egg?',
            option: ['DRATINI', 'ONIX', 'CATERPIE', 'VENOMOTH'],
            answer: 'ONIX'
        },
        {
            question: 'Which is the lightest pokemon?',
            option: ['METAPOD', 'PIKACHU', 'GHASTLY', 'CATERPIE'],
            answer: 'GHASTLY'
        },
        {
            question: 'What food do Kinglers mainly eat?',
            option: ['PIKACHU', 'KRABBY', 'SHELLDER', 'MAGIKARP'],
            answer: 'SHELLDER'
        }
    ],

    // win or lose images after player guesses
    winImage: './assets/images/pokemon-pikachu-dancing.gif',
    loseImage: 'https://media1.tenor.com/images/84c4e8c1a24b84bece745d2dcd2a5aa8/tenor.gif?itemid=5220649',
    gameOver: function() {
        clearInterval(clock);
        $('#content').empty();
        $('#message').empty();
        $('#game-timer').hide();
        $('#content').append('<div id="game-over"> Game Over');
        $('#content').append('<div> Press START to try again!');
        $('#content').append(`<div id="correct" class="mt-2"> Correct: ${correct}`);
        $('#content').append(`<div id="incorrect"> Incorrect: ${incorrect}`);
        $('#start').show();
    },

    // checks if button press is correct
    check: function() {
        buttonVal = $(this).attr('value');
        if (buttonVal === triviaAnswer) {
            correct++;
            console.log(`Correct: ${correct}`);
            isCorrect = true;
        } else {
            incorrect++;
            console.log(`Incorrect: ${incorrect}`);
            isCorrect = false;
        }
        clearInterval(clock);
        game.results(); // comment out to pause the game
    },

    // show page after player win or lose
    results: function() {

        // declare that round is not running; set interval to 3; clear content
        round = false;
        count = 3;
        $('#content').empty();
        $('#message').empty();
        $('#game-timer').hide();

        // check if answer is correct
        if (isCorrect) {
            $('#content').append(`<img src="${game.winImage}" alt="Win Image">`);
            $('#message').append('<div class="mt-5">You Are Correct!');
        } else {
            $('#content').append(`<img src="${game.loseImage}" alt="Lose Image">`);
            $('#message').append(`<div class="mt-5">Sorry, the answer is ${triviaAnswer}`);
        }

        // restart timer
        game.startTimer();
    },
    // advance to next round
    round: function() {

        // declare that round is running, start count at 5
        round = true;
        count = 15;

        // display timer and question
        $('#content').empty();
        $('#message').empty();
        $('#game-timer').show();
        $('#game-timer').text(`Time remaining: ${count}`);
        $('#content').append(`<div id='question' class='mb-5'>${JSON.stringify(game.array[questionNum].question)}`);

        // define and loop through array of questions
        triviaQuestion = Object.values(game.array[questionNum])[1];
        triviaAnswer = Object.values(game.array[questionNum])[2];
        triviaIMG = Object.values(game.array[questionNum])[3];
        console.log(`\n== Round: ${questionNum} ==`);
        console.log(`Question: ${triviaQuestion}`);
        console.log(`Answer: ${triviaAnswer}`);

        // create options as buttons
        for (var i = 0; i < triviaQuestion.length; i++) {
            $('#content').append(`<li><button id='option-${i}' class='option btn btn-warning btn-lg' value="${triviaQuestion[i]}">${triviaQuestion[i]}</button>`);
        }

        // when player presses an option button, check if answer is correct
        $('.option').on('click', game.check);

        // check if game is over
        if (questionNum === game.array.length) {
            console.log(`${questionNum} | ${game.array.length}`);
            clearInterval(clock);
            game.gameOver();
        } else {
            // increment to advance to next question; restart timer
            questionNum++;
            game.startTimer();
        }
    },

    // start counting down; choose game state when timer hits 0
    countdown: function() {
        count--;
        console.log(count);

        // if count reaches 0, stop the clock, and advance to proper page
        if (count === 0 && questionNum === game.array.length) {
            console.log('gameover');
            incorrect++;
            game.gameOver();
        } else if (count === 0 && round === true) {
            isCorrect = false;
            incorrect++;
            console.log(`Times up | isCorrect: ${isCorrect} | Incorrect: ${incorrect}`);
            clearInterval(clock);
            game.results();
        } else if (count === 0 && round === false) {
            isCorrect = false;
            console.log(`Times up | isCorrect: ${isCorrect} | Incorrect: ${incorrect}`);
            clearInterval(clock);
            game.round();
        }

        // display time
        $('#game-timer').text(`Time remaining: ${count}`);
    },

    // starts a 1 sec interval
    startTimer: function() {
        clock = setInterval(game.countdown, 1000); // for every second, run timer
    },

    // start game; define variables
    play: function() {
        questionNum = 0;
        round = false;
        isCorrect = false;
        correct = 0;
        incorrect = 0;
        $('#start').hide();
        game.round();
    }
};

// when user presses start, play game
$(document).ready(function() {
    $('#start').on('click', game.play);
});