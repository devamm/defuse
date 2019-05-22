import React from 'react'


class App extends React.Component {
    constructor(props){
        super(props);
    }

    

    render(){
        console.log('updated stuff');
        return(
            <div className="game">
                <h1>Hello There</h1>
            </div>
        )
    }
}

export default App;