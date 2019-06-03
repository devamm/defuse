import React from 'react'
import Square from './Square.js'
const {generateMines, generateNeighbors} = require('./gameLogic')

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board : Array(8).fill('0').map(() => Array(8).fill('0')),
            loaded: false
        }
    }

    componentDidMount(){
        //generate empty board
        let array = this.state.board
        //generate mine (10)
        array = generateMines(array);
        console.log('generated mines');

        //add neighbor numbers for all squares neighboring a mine
        array = generateNeighbors(array);
        console.log(array);
        this.setState({board: array, loaded: true})
    }

    render(){
        let array = Array(8).fill('0').map(() => Array(8).fill('0'));
        array = generateMines(array);
        array = generateNeighbors(array);
        if(this.state.loaded == true){
            //let array = this.state.board;  
            return(
                <center className="game">
                    <h1>Hello There</h1>
                   
                    <div className="container">
                     {array.map((row, i) => row.map( (col, x) => {return(<Square elem={col} /> )}))}
                    </div>
                </center>
            )
        } else {
            return (
                <h1>Loading</h1>
            )
        }
    }
}

export default App;