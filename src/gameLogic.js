const generateMines = (array) => {
    let count = 0
    while(count < 10){
        //generate random coordinates
        let x = Math.floor(Math.random() * 8);
        let y = Math.floor(Math.random() * 8);
        //if coordinate is empty, place mine
        if(array[x][y] == '0'){
            array[x][y] = 'x';
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
            if(array[x][y] != 'x'){
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
                            if(array[x+i][y+j] == 'x'){
                                //if mine, increment adjacentMine
                                adjacentMines++;
                            }
                        } else {
                            continue;
                        }
                    }
                }
                array[x][y] = adjacentMines;
            } else {
                //console.log('mine, skipping');
            }
        }
    }
    //console.log('generated neighbors');
    return array;
}

export {generateMines, generateNeighbors}