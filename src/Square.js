import React from 'react'

class Square extends React.Component {
    constructor(props){
        super(props);
    }    

    render(){
        console.log('hi')
        return(
            <div className="square">
                <p>{this.props.elem}</p>
            </div>
            
        )
    }
}

export default Square;