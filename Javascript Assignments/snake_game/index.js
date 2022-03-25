import { Canvas2dGraphics } from './canvas.js';
const canvas = document.getElementById('canvas'),
    _canvasObj = new Canvas2dGraphics(canvas),
    WIDTH = 500,
    HEIGHT = 500,
    numCol = 5,
    numRow = 5,
    boxSize = WIDTH / numCol,
    player1Color = "#cc3399",
    canvasPlayer = document.createElement('canvas'),
    _canvasPlayerObj = new Canvas2dGraphics(canvasPlayer);

//Variables
var boxArr = [],
    x = 0,
    y = (numRow - 1) * boxSize,
    dir = 1,
    count = 0,
    snake1 = new Image(),
    snake2 = new Image(),
    snake3 = new Image(),
    snake4 = new Image(),
    ladder1 = new Image(),
    ladder2 = new Image(),
    ladder3 = new Image(),
    player1 = new Player(player1Color, 1),
    dice = new Dice(20, 180, 100, '#fff');

snake1.src = './snake1.png';
snake2.src = './snake2.png';
snake3.src = './snake3.png';
snake4.src = './snake1.png';
ladder1.src = './ladder1.png';
ladder2.src = './ladder1.png';
ladder3.src = './ladder1.png';


canvas.width = WIDTH;
canvas.height = HEIGHT;
canvasPlayer.width = 300;
canvasPlayer.height = 300;
canvasPlayer.style.background = '#000';
canvasPlayer.style.float = 'left';
document.body.appendChild(canvasPlayer);

for (let i = 0; i < numCol * numRow; i++) {
    boxArr.push(new Box(x, y, boxSize, i));
    x = x + boxSize * dir;
    if (x >= WIDTH || x <= -boxSize) {
        dir *= -1;
        x += boxSize * dir;
        y -= boxSize;
    }
}

window.addEventListener('click', playGame);
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        window.location.reload();
    }
});

// player details
function drawPlayerDetails() {
    _canvasPlayerObj.ClearCanvas(0, 0, canvasPlayer.width, canvasPlayer.height);
    _canvasPlayerObj.FillText('Player 1', 20, 30, player1Color, '25px Arial');
    _canvasPlayerObj.FillCircle(150, 20, boxSize / 6, 0, 2 * Math.PI, false, player1Color);
    count = count + 1;
    _canvasPlayerObj.FillText('Player Steps - ' + count, 20, 70, player1Color, '25px Arial');
}

//function Dice
function Dice(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    this.drawDice = function (n) {
        _canvasPlayerObj.StrokeRectangle(this.x, this.y, this.size, this.size, this.color);
        switch (n) {
            case 1:
                _canvasPlayerObj.FillCircle(this.x + this.size / 2, this.y + this.size / 2, 10, 0, 2 * Math.PI, false, this.color);
                break;
            case 2:
                _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                break;
            case 3:
                _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + this.size / 2, this.y + this.size / 2, 10, 0, 2 * Math.PI, false, this.color);
                break;
            case 4:
                _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                break;
            case 5:
                _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 4, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + this.size / 2, this.y + this.size / 2, 10, 0, 2 * Math.PI, false, this.color);

                break;
            default:
                _canvasPlayerObj.FillCircle(this.x + this.size / 8 + 10, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 8 + 10, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 5 * this.size / 8 + 10, this.y + this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 1 * this.size / 8 + 10, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 3 * this.size / 8 + 10, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                _canvasPlayerObj.FillCircle(this.x + 5 * this.size / 8 + 10, this.y + 3 * this.size / 4, 10, 0, 2 * Math.PI, false, this.color);
                break;
        }
    }

}

//function play game
function playGame() {
    drawBoard();
    loadSnakeAndLadder();
    player1.rollDice();
    player1.drawPlayer();
    isPlayer1Turn = false;
}

//Player function
function Player(color, playerNumber) {
    this.position = 0;
    this.color = color;
    this.playerNumber = playerNumber;
    this.isActive = true;

    this.rollDice = function () {
        drawPlayerDetails();
        let r = Math.floor(Math.random() * 6) + 1; //1 to 6;
        dice.drawDice(r);
        if (r <= (boxArr.length - 1) - this.position && this.isActive) {
            this.position += r;
        }
        //Check if player wins
        if (this.position == boxArr.length - 1) {
            alert('Player ' + this.playerNumber + 'wins!!!\nPlease press enter to restart the game.');
        }
    };

    this.drawPlayer = function () {
        let currentPos = boxArr[this.position];
        if (this.position == 21) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 6;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        }
        else if (this.position == 19) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 10;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        }
        else if (this.position == 23) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 15;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        }
        else if (this.position == 14) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 5;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        }
        else if (this.position == 1) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 11;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        }
        else if (this.position == 2) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 7;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        }
        else if (this.position == 13) {
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            this.position = 22;
            setTimeout(() => {
                currentPos = boxArr[this.position];
                _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
            }, 2000);
        } else {
            //this.position = currentPos;
            _canvasObj.FillCircle(currentPos.x + currentPos.size / 2, currentPos.y + currentPos.size / 2, boxSize / 3, 0, 2 * Math.PI, false, this.color);
        }
    };
}

//function to draw image of snake and ladder
function loadSnakeAndLadder() {
    _canvasObj.DrawImageWH(snake1, boxSize * 0, boxSize * 1.2, 80, 170);
    _canvasObj.DrawImageWH(snake2, boxSize * 1, 0, 230, 400);
    _canvasObj.DrawImageWH(snake3, boxSize * 3.3, boxSize * 0.25, 150, 140);
    _canvasObj.DrawImageWH(snake4, boxSize * 4.1, boxSize * 2.2, 60, 160);
    _canvasObj.Save();
    _canvasObj.Rotate(0.22);
    _canvasObj.DrawImageWH(ladder1, boxSize * 2.1, boxSize * 2, 30, 220);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.Rotate(-0.30);
    _canvasObj.DrawImageWH(ladder2, boxSize * 2.3, boxSize * 1.1, 30, 230);
    _canvasObj.Restore();
    _canvasObj.Save();
    _canvasObj.Rotate(-0.1);
    _canvasObj.DrawImageWH(ladder3, boxSize * 2, boxSize * 3.5, 30, 130);
    _canvasObj.Restore();
}


//function box
function Box(x, y, size, index) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.index = index;

    if (this.index % 4 == 1) {
        this.color = '#87CEFA';
    } else if (this.index % 4 == 2) {
        this.color = '#E0FFFF';
    } else if (this.index % 4 == 3) {
        this.color = '#87CEFA';
    } else {
        this.color = '#E0FFFF';
    }
}

Box.prototype.drawBox = function () {
    _canvasObj.FillRectangle(this.x, this.y, this.size, this.size, this.color);
    _canvasObj.FillText(this.index + 1, this.x + this.size / 1.5, this.y + this.size / 4, '	#000000', '10px Arial');
}

function drawBoard() {
    boxArr.forEach((b) => {
        b.drawBox();
    });
}

window.onload = function () {
    drawBoard();
    loadSnakeAndLadder();
    player1.drawPlayer();
    drawPlayerDetails();
}
