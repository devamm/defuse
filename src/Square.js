import React from 'react'

class Square extends React.Component {
    constructor(props){
        super(props);
    }    
    
    render(){
        const {elem, x,y, handleClick} = this.props;
        const coord = {x,y};
        return(
            <div className="square" onClick={ (e) => handleClick(e, coord) }>
                <p>{elem}</p>
            </div>
            
        )
    }
}

export default Square;