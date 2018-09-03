function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Grid = function(x,y){
    this.x = x;
    this.y = y;
}

let Herbivore = function(){
    this.hp = 100;
    this.energy = 100;
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

Grid.prototype.generateHerbivore = function(count){
    for(let i = 0; i < count; i++){
        
    }
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
let data = grid.string(grid.stones(grid.generate()));
root.innerHTML = data;