import React from 'react'
import Square from './Square.js'
const {generateMines, generateNeighbors, buildBoard, openSquare, getGameState, getTime} = require('./gameLogic')


class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board: buildBoard(),
            loaded: false,
            firstClick: true,
            flags: 10,
            status: 0,
            startTime: 0
        }

        this.handleClick = this.handleClick.bind(this);
        this.firstClick = this.firstClick.bind(this);
        this.placeFlag = this.placeFlag.bind(this);
        this.displayMsg = this.displayMsg.bind(this);

    }
    
    handleClick(e, coord){
        if(this.state.firstClick == true){
            this.firstClick(e, coord);
        } 
        if(this.state.status != 0){
            return;
        }
    
        
        let arr = this.state.board;
     
        arr = openSquare(arr, coord.x, coord.y);
        const status = getGameState(arr);
        this.setState({board: arr, status});
    }

    placeFlag(e, coord){
        e.preventDefault();
        if(this.state.status != 0){
            return;
        }
        let arr = this.state.board;
        let flags = this.state.flags;
        
        const {x,y} = coord;
        if(arr[x][y].status == 'open' || this.state.firstClick == true){
            //prevent placing flag on open square or before mines have been generated
            return;
        }
        
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
        const startTime = Date.now();
        const {x,y} = coord;
        let array = this.state.board;
        array = generateMines(array, x, y);
        array = generateNeighbors(array);

        this.setState({board: array, loaded: true, firstClick: false, startTime});
    }

    componentDidMount(){
        console.log("hey, no cheating!");
    }

    displayMsg(status){
        if(status == 1){
            console.log('🎉🎉🎉')
            const endTime = Date.now();
            const time = getTime(endTime - this.state.startTime);
           window.setTimeout(() => {
            if(confirm('You Win!\nCompleted in '+time)){
                window.location.reload();  
            }
           }, 100);
        }
    
        if(status == -1){
            console.log('BOOM!');
            window.setTimeout(() => {
                if(confirm('You Lose!')){
                    window.location.reload();  
                }
               }, 100);
        }
    }

    render(){
        
        const array = this.state.board;
       
        return(
            <center className="game">
                <div className="game-header">
                    <img src="img/flag.png" height="35em"  />
                    <h1 >{`${this.state.flags}/10`}</h1>
                </div>
               
                <div className="container">
                    {array.map((row, x) => row.map( (col, y) => {
                       
                        return(<Square elem={col} x={x} y={y} key={`${x}${y}`}
                        handleClick={this.handleClick} placeFlag={this.placeFlag} status={this.state.status} /> )
                        }))
                    }
                </div>
               
               {this.state.status != 0 ? this.displayMsg(this.state.status) : '' }
            </center>
        )
    }
}

export default App;