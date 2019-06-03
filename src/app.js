import React from 'react'
import Square from './Square.js'
const {generateMines, generateNeighbors} = require('./gameLogic')

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board : Array(8).fill('0').map(() => Array(8).fill('0')),
            loaded: false,
            firstClick: true,
        }

        this.handleClick = this.handleClick.bind(this);
        this.firstClick = this.firstClick.bind(this);
    }

    handleClick(e, coord){
        if(this.state.firstClick == true){
            this.firstClick(e, coord);
        } else {
            console.log('clicked!', coord);
        }
    }

    firstClick(e, coord){
        const {x,y} = coord;
        let array = this.state.board;
        array = generateMines(array, x, y);
        array = generateNeighbors(array);

        this.setState({board: array, loaded: true, firstClick: false});
    }


    render(){
        //let array = Array(8).fill('0').map(() => Array(8).fill('0'));
        //array = generateMines(array);
        //array = generateNeighbors(array);
        const array = this.state.board;
        return(
            <center className="game">
                <h1>Hello There</h1>
               
                <div className="container">
                    {array.map((row, x) => row.map( (col, y) => {
                        return(<Square elem={col} x={x} y={y} key={`${x}${y}`} handleClick={this.handleClick} /> )
                        }))
                    }
                </div>
            </center>
        )
    }
}

export default App;