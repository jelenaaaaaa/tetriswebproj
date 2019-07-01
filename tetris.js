const cvs=document.getElementById("tetris");
const ctx=cvs.getContext("2d");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");

const ROW=20;
const COL=COLUMN=10;
const SQ=squareSize=20;
const VACANT="WHITE";


//draw a square

function drawSquare(x,y,color){
    ctx.fillStyle=color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle="BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

//create board

var board=[];
for(var r=0;r<ROW;r++){
    board[r]=[];
    for(var c=0;c<COL;c++){
        board[r][c]=VACANT;
    }
}

//draw the board

function drawBoard(){
    for(var r=0;r<ROW;r++){
        for(var c=0;c<COL;c++){
           drawSquare(c,r,board[r][c]);
        }
    }
}

drawBoard();

// the pieces and their colors

const PIECES= [
    [Z,"red"],
    [S,"green"],
    [T,"purple"],
    [O,"yellow"],
    [L,"orange"],
    [I,"cyan"],
    [J,"blue"]
];

// generate random pieces

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Piece( PIECES[r][0],PIECES[r][1]);
}

p = randomPiece();

// The Object Piece

function Piece(tetromino,color){
    this.tetromino=tetromino;
    this.color=color; //the color of every piece

    this.tetrominoN=0; //the first pattern, it goes from 0 to 3
    this.activeTetromino=this.tetromino[this.tetrominoN]; //the tetronimo we are playing with

    //to control the pieces, with this we see where the piece is on the board

    this.x=3;
    this.y=-2;
}

//fill function

Piece.prototype.fill = function(color){
    for(var r=0;r<this.activeTetromino.length;r++){
        for(var c=0;c<this.activeTetromino.length;c++){
            if(this.activeTetromino[r][c]){   //we only need to draw the occupied squares
                drawSquare(this.x + c,this.y + r,color);

            }
        }
    }
};


// draw a piece to the board

Piece.prototype.draw = function(){
    this.fill(this.color);
};

//undraw the piece (because the piece is keeping its shape in every block as it falls)

Piece.prototype.unDraw = function(){
    this.fill(VACANT);
};



//move the piece right

Piece.prototype.moveDown = function(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }else{
        this.lock();   // we lock the piece and generate a new one
        p = randomPiece();
    }
};

//move the piece down

Piece.prototype.moveRight = function(){
    if(!this.collision(1,0,this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw()
    }
};

//move the piece left

Piece.prototype.moveLeft = function(){
    if(!this.collision(-1,0,this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

//rotate the piece

Piece.prototype.rotate = function(){
    var nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    var kick = 0;

    if(this.collision(0,0,nextPattern)){
        if(this.x > COL/2){
            // it's the right wall
            kick = -1; // we need to move the piece to the left
        }else{
            // it's the left wall
            kick = 1; // we need to move the piece to the right
        }
    }

    if(!this.collision(kick,0,nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
};

var score = 0;
var level = 1;

Piece.prototype.lock = function(){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we skip the vacant squares

            if( !this.activeTetromino[r][c]){
                continue;
            }

            // pieces to lock on top = game over

            if(this.y + r < 0){
                alert("Game Over!");
                //stop request animation frame
                window.name = prompt ('Please enter your username: ');
                if(name==""){
                    name=prompt ('This field cant be empty. Please enter your username: ');
                }
                else{
                    window.confirmName=confirm("This is your username: "+name+
                        "This is your score: " +score);
                }
                window.getScore=score;
                document.cookie=getScore;

                if(confirmName==true)
                {
                    document.getElementById("hiddenbutton").style.visibility='visible';
                }
                gameOver = true;
                return;
            }

            // we lock the piece
            board[this.y+r][this.x+c] = this.color;
        }
    }
    // remove full rows
    for(r = 0; r < ROW; r++){
        var isRowFull = true;
        for( c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if(isRowFull){
            // if the row is full
            // we move down all the rows above it
            for( y = r; y > 1; y--){
                for( c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            // the top row board[0][..] has no row above it
            for( c = 0; c < COL; c++){
                board[0][c] = VACANT;
            }
            // increment the score
            score += 10;
            level += 1;

            if(time>300){
                time -= 50;
            }else{
                time -= 5;
            }

        }
    }
    // update the board
    drawBoard();

    // update the score
    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;
};

//collision function

Piece.prototype.collision = function(x,y,piece){
    for(var r=0; r < piece.length;r++){
        for(var c=0; c < piece.length;c++){

            if(!piece[r][c]){   //if the square is empty, we skip it
                continue;
            }

            var newX = this.x + c + x;  //coordinates of the piece after movement, the +x and +y at the end represent the
            var newY = this.y + r + y;  //new positions of the coordinates from this: Piece.prototype.collision = function(x,y,piece)

            /*conditions for the collision detection:
            the first rule is for the left wall,
            the second rule is for the right wall
            the third rule is for the bottom wall*/

            if(newX < 0 || newX >=COL || newY >= ROW){
                return true;
            }

            //skip newY < 0; eg. board[-1] will crash the game!

            if(newY < 0){
                continue;
            }

            //check if there is a locked piece on the board

            if(board[newY][newX] != VACANT){
                return true;
            }
        }
    }
    return false;

};

//control the piece

document.addEventListener('keydown',CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

//drop the piece every 1 second

var dropStart = Date.now();
var gameOver = false;
var time = 1000; //seconds for falling

function drop(){
    var now=Date.now();
    var delta = now - dropStart;
    if(delta > time){
        p.moveDown();
        dropStart = Date.now();
    }

    if( !gameOver){
        requestAnimationFrame(drop);
    }
}


