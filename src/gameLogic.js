const generateMines = (array, initX, initY) => {
    let count = 0
    while(count < 10){
        //generate random coordinates
        let x = Math.floor(Math.random() * 8);
        let y = Math.floor(Math.random() * 8);
      
        if(x == initX && y == initY){
              //coords generated = coords of initial skip, generate new number
            continue;
        }
        //if coordinate is empty, place mine
        if(array[x][y].val == '0'){
            array[x][y].val = 'x';
            count++;
        }  
    }
    return array;
}

const generateNeighbors = (array) => {
    
    for(let x = 0; x < array[0].length; x++){
        for(let y = 0; y < array[x].length; y++){
            //for elem at [x][y]
            // if mine, skip step
            if(array[x][y].val != 'x'){
                let adjacentMines= 0;
                for(let i = -1; i <=1; i++){
                    for(let j = -1; j <=1; j++){
                        //check if [x+i][x+j] exists
                        if(x+i in array && y+j in array[x+i]){
                            //if i == 0 && j == 0, skip
                            if(i == 0 && j == 0){
                                continue;
                            }
                            //if exists, check if mine   
                            if(array[x+i][y+j].val == 'x'){
                                //if mine, increment adjacentMine
                                adjacentMines++;
                            }
                        } else {
                            continue;
                        }
                    }
                }
                array[x][y].val = adjacentMines;
            } else {
                //console.log('mine, skipping');
            }
        }
    }
    //console.log('generated neighbors');
    return array;
}

const buildBoard = () => {
    let board = [];
    for(let i = 0; i < 8; i++){
        board[i] = [];
        for(let x = 0; x < 8; x++){
            board[i][x] = {val: 0, status: 'init', flag: false}
        }
    }
    return board;
}

const openSquare = (array, x, y) =>{

    //open square
    array[x][y].status = 'open';
   
    //if square is a mine or number, return 
    if(array[x][y].val != 0){
        return array;
    }

    //get all neighbors for [x][y]
    for(let i = -1; i <=1; i++){
        for(let j = -1; j <=1; j++){
            //check if neighbor exists
            if(x+i in array && y+j in array[x+i]){
                //open direct neighbor only if it is numeric (non empty and not a mine) && unopened
                if(array[x+i][y+j].val > 0 && array[x+i][y+j].status == 'init'){
                    array[x+i][y+j].status = 'open';
                    continue;
                }
                //direct neighbor is empty, recurse if unopened
                if(array[x+i][y+j].status != 'open'){
                    array = openSquare(array, x+i, y+j);
                }
            } else {
                continue;
            }
        }
    }
    
    //return array containing new game state
    //console.log('returning');
    return array;
}

const getGameState = (array) => {
    //returns -1 if game lost, 0 if in progress, and 1 if victory condition

}

export {generateMines, generateNeighbors, buildBoard, openSquare, getGameState}