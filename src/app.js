import React from 'react'
import Square from './Square.js'

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            board : Array(8).fill('0').map(() => Array(8).fill('0'))
        }
    }

    componentDidMount(){
        //generate empty board
        let array = this.state.board
        //generate mine (10)
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
        console.log('generated mines')
        //console.log(array);
        this.setState({board: array})
    }

    render(){
        let array = this.state.board;  
        console.log(array);
        return(
            <center className="game">
                <h1>Hello There</h1>
               
                <div className="container">
                 {array.map((row, i) => row.map( (col, x) => {return(<Square elem={col} /> )}))}
                </div>
            </center>
        )
    }
}

export default App;