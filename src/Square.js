import React from 'react'

class Square extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
            flag: false
        }
        this.onClick = this.onClick.bind(this);
        this.onRightClick = this.onRightClick.bind(this);
    }    

    onClick(e, coord){
        this.setState({open: true});
        this.props.handleClick(e, coord)
    }

    onRightClick(e, coord){
        if(this.state.open == false){
            this.setState({flag: true})
        }
        
    }
    
    render(){
        let {elem, x,y, handleClick} = this.props;
        const coord = {x,y};
        if(elem == 0){
            elem = ""
        }
        return(
            <div className={`square ${this.state.open == true ? 'open' : ''}`} onClick={ (e) => this.onClick(e, coord) }
            onContextMenu={(e) => {this.onRightClick(e, coord)}} >
                {this.state.flag == false ?
                    elem == 'x' ? (<img src="bomb.png" />) : (<h1>{elem}</h1>) :
                    (<img src="flag.png" />)}
                
            </div>
            
        )
    }
}



export default Square;