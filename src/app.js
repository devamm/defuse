import React from 'react'
import Square from './Square.js'
const {generateMines, generateNeighbors, buildBoard} = require('./gameLogic')

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board: buildBoard(),
            loaded: false,
            firstClick: true
        }

        this.handleClick = this.handleClick.bind(this);
        this.firstClick = this.firstClick.bind(this);
        this.placeFlag = this.placeFlag.bind(this);

    }
    
    handleClick(e, coord){
        if(this.state.firstClick == true){
            this.firstClick(e, coord);
        } 
      ;
        const {x,y} = coord;
        let arr = this.state.board;
        arr[x][y].status = "open";
        this.setState({board: arr});
        //console.log(coord);
    }

    placeFlag(e, coord){
        e.preventDefault();
        let arr = this.state.board;
        
        const {x,y} = coord;
        if(arr[x][y].status == 'open' || this.state.firstClick == true){
            //prevent placing flag on open square or before mines have been generated
            return;
        }
        console.log('toggle flag on ',x,y);
        arr[x][y].flag = !arr[x][y].flag;
        this.setState({board: arr});
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
        return(
            <center className="game">
                <h1>Hello There</h1>
               
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