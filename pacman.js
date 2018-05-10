// Setup initial game stats
var score = 0;
var lives = 2;
var powerpellet = 4;
var dots = 240;
var eatInSequence = 0;


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};
// replace this comment with your four ghosts setup as objects
var ghosts = [inky, pinky, blinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\nPower-Pellet: ' + powerpellet + '\nDots: ' + dots + '\nCombo: ' + eatInSequence);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat 1 Dot');
  console.log('(t) Eat 10 Dots');
  console.log('(q) Quit');
  if (powerpellet > 0){
  console.log('(p) Power-Pellet');}
  for (var i = 0; i < ghosts.length; i++) {
   if (ghosts[i]['edible'] === true) {
    console.log( '(' + (i + 1) + ') ' + ghosts[i]['name'] + ' - (Edible)')
  } else {console.log( '(' + (i + 1) + ') ' + ghosts[i]['name'] + ' - (Inedible)')}
  }
}

function eatGhost(ghost) {
  if (ghost['edible'] === true){
    console.log('\nWell done! you eat ' + ghost['name']);
    if (eatInSequence === 0){
    score += 200}else if (eatInSequence === 1){
    score += 400}else if (eatInSequence === 2){
    score += 800}else{
    score += 1600}
    eatInSequence += 1
    ghost['edible'] = false
  } else {
      eatInSequence = 0
      if (lives > 1){
      console.log('\nGhost ' + ghost['name'] + ' Colour ' + ghost['colour'] + ' not edible')
      lives -= 1
    } else {
      console.log('\nGhost ' + ghost['name'] + ' Colour ' + ghost['colour'] + ' not edible')
      console.log('You have no more lifes - GAME OVER');
      process.exit();
    }
  }
}

function eatPowerPellet() {
  if (powerpellet > 0) {
    powerpellet -= 1
    console.log('\nYou eat a Power-Pellet');
    score += 50
    for (var i = 0; i < ghosts.length; i++) {
      ghosts[i]['edible'] = true
    }
  } else {console.log('\nYou don´t have more Power-Pellet');
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot(number) {
  console.log('\nChomp!');
  score += (10 * number);
  dots -= number
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case 'd':
      eatDot(1);
      break;
    case 't':
      eatDot(10);
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
