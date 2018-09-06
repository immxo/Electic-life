function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Grid = function(x,y){
    this.x = x;
    this.y = y;
}

Grid.prototype.generate = function(){
    let plan = [];
    let y = this.y;
    let x = this.x;

    for(let i = 0; i < y; i++){
        plan[i] = [];
        for(let j = 0; j < x; j++){
            if(i === 0){
                plan[i][j] = '#';
            }
            else if(i === y-1){
                plan[i][j] = '#';
            }
            else if((j === 0) || (j === x-1)){
                plan[i][j] = '#';
            }
            else{
                plan[i][j] = ' ';
            }

        }
    }
    return plan;
}

Grid.prototype.stones = function(array){
    let y = this.y;
    let x = this.x;
    let countStones;
    let randomY;
    let randomX;
    let countWall;
    if(y > x){
        countStones = y/1.5;
    }
    else{
        countStones = x/1.5;
    }

    for(let i = 0; i < countStones; i++ ){
        randomY = getRandomInt(3, y-3);
        randomX = getRandomInt(3, x-3);
        array[randomY][randomX] = '#';
        countWall = getRandomInt(1,5);
        switch (countWall){
            case 1:
                array[randomY][randomX+1] = '#';
                array[randomY][randomX+2] = '#';
                array[randomY+1][randomX+2] = '#';
                break;
            case 2:
                array[randomY][randomX+1] = '#';
                array[randomY-1][randomX+1] = '#';
                array[randomY+1][randomX+1] = '#';
                break;
            case 3:
                array[randomY+1][randomX] = '#';
                array[randomY+2][randomX+1] = '#';
                array[randomY+1][randomX+1] = '#';
                break;
            case 4:
                array[randomY-1][randomX-1] = '#';
                array[randomY-2][randomX+1] = '#';
                array[randomY+1][randomX+2] = '#';
                break;
            case 5:
                array[randomY+2][randomX+2] = '#';
                array[randomY+2][randomX+3] = '#';
                array[randomY+1][randomX+1] = '#';
                break;
        }
    }
    return array;
}

Grid.prototype.generateHerbivores = function(count, array){
    let y = this.y;
    let x = this.x;
    let randomY;
    let randomX;
    let i = 0;

    while(i < count){
        randomY = getRandomInt(1, y-1);
        randomX = getRandomInt(1, x-1);
        if(array[randomY][randomX] === ' '){
            array[randomY][randomX] = 'O';
        }
        i++;
    }
    return array;
}

Grid.prototype.generatePredators = function(count, array){
    let y = this.y;
    let x = this.x;
    let randomY;
    let randomX;
    let i = 0;

    while(i < count){
        randomY = getRandomInt(1, y-1);
        randomX = getRandomInt(1, x-1);
        if(array[randomY][randomX] === ' '){
            array[randomY][randomX] = 'P';
        }
        i++;
    }
    return array;
}

Grid.prototype.generateWeed = function(array){
    let y = this.y;
    let x = this.x;
    let randomY;
    let randomX;
    let i = 0;

    while(i < y){
        randomY = getRandomInt(1, y-1);
        randomX = getRandomInt(1, x-1);
        if(array[randomY][randomX] === ' '){
            array[randomY][randomX] = '*';
        }
        i++;
    }
    return array;
}

Grid.prototype.haveTurn = function(array){
    let y = this.y;
    let x = this.x;
    let haveTurn = [];

    for(let i = 0; i < y; i++){
        for(let j = 0; j < x; j++){
            if(array[i][j] === 'O'){
                haveTurn.push({
                    type: 'O',
                    y: i,
                    x: j
                });
            }
            else if(array[i][j] === 'P'){
                haveTurn.push({
                    type: 'P',
                    y: i,
                    x: j
                });
            }
        }
    }
    return haveTurn
}

function direction(){
    
}

Grid.prototype.turn = function(arrayHaveTurn, array){
    arrayHaveTurn.forEach(function(unit){
        array[unit.y][unit.x] = ' ';
        array[unit.y][unit.x+1] = unit.type;
    });
    return array;
}

Grid.prototype.string = function (array) {
    let string = '<pre>';
    let y = this.y;
    let x = this.x;
    for(let i = 0; i < y; i++){
        for(let j = 0; j < x; j++){
            if(j === x-1){
                string += array[i][j];
                string += '<br>';
            }
            else{
                string += array[i][j];
            }
        }
    }
    string += '</pre>';
    return string;

}

let grid = new Grid(60,30);
let root = document.getElementById('root');

let gridDone = grid.generateWeed(grid.generatePredators(10 ,grid.generateHerbivores(10,grid.stones(grid.generate()))));
console.log(grid.haveTurn(gridDone));
let data = grid.string(gridDone);
root.innerHTML = data;

function turn(){
   let data = grid.string(grid.turn(grid.haveTurn(gridDone), gridDone));
   root.innerHTML = data;
    setTimeout(turn, 2000);
}

setTimeout(turn, 2000);