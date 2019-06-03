import React from 'react'

class Square extends React.Component {
    constructor(props){
        super(props);
    }    
    
    render(){
        let {elem, x,y, handleClick} = this.props;
        const coord = {x,y};
        if(elem == 0){
            elem = ""
        }
        return(
            <div className="square" onClick={ (e) => handleClick(e, coord) }>
                {elem == 'x' ? (<img src="bomb.png" />) : (<h2>{elem}</h2>)}
                
            </div>
            
        )
    }
}

export default Square;