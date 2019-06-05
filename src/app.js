import React from 'react'
import Square from './Square.js'
import { throws } from 'assert';
const {generateMines, generateNeighbors, buildBoard, openSquare, getGameState} = require('./gameLogic')

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board: buildBoard(),
            loaded: false,
            firstClick: true,
            flags: 10,
            status: 0,
        }

        this.handleClick = this.handleClick.bind(this);
        this.firstClick = this.firstClick.bind(this);
        this.placeFlag = this.placeFlag.bind(this);

    }
    
    handleClick(e, coord){
        if(this.state.firstClick == true){
            this.firstClick(e, coord);
        } 
    
        const {x,y} = coord;
        let arr = this.state.board;
        //arr[x][y].status = "open";
        arr = openSquare(arr, coord.x, coord.y);
        const status = getGameState(arr);
        this.setState({board: arr, status});
        //console.log(coord);
    }

    placeFlag(e, coord){
        e.preventDefault();
        let arr = this.state.board;
        let flags = this.state.flags;
        
        const {x,y} = coord;
        if(arr[x][y].status == 'open' || this.state.firstClick == true){
            //prevent placing flag on open square or before mines have been generated
            return;
        }
        //console.log('toggle flag on ',x,y);
        const prev = arr[x][y].flag;
       
        if(prev == false){
            if(flags <= 0){
                return;
            }
            flags--;
        } else {
            flags++;
        }
        arr[x][y].flag = !arr[x][y].flag;
        this.setState({board: arr, flags});
    }

    firstClick(e, coord){
        const {x,y} = coord;
        let array = this.state.board;
        array = generateMines(array, x, y);
        array = generateNeighbors(array);

        this.setState({board: array, loaded: true, firstClick: false});
    }

    componentDidMount(){
        console.log("hey, no cheating!");
    }

    render(){
        
        const array = this.state.board;
        if(this.state.status == 1){
            console.log('🎉🎉🎉')
            if(confirm('You Win!')){
                window.location.reload();  
            }
        }

        if(this.state.status == -1){
            console.log('BOOM!');
            if(confirm('You Lose!')){
                window.location.reload();  
            }
        }
       
        return(
            <center className="game">
                <div className="game-header">
                    <img src="img/flag.png" height="35em"  />
                    <h1 >{`${this.state.flags}/10`}</h1>
                </div>
               
                <div className="container">
                    {array.map((row, x) => row.map( (col, y) => {
                       
                        return(<Square elem={col} x={x} y={y} key={`${x}${y}`}
                        handleClick={this.handleClick} placeFlag={this.placeFlag}  /> )
                        }))
                    }
                </div>
               
            </center>
        )
    }
}

export default App;