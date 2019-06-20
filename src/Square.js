import React from 'react'

const Square = (props) => {
   let {elem} = props;
   let state = props.status;
   if(state == -1 && elem.val == "x"){
       elem.status = "open";
   }

    return (
        <div className="square-click" onClick={ e => props.handleClick(e, {x: props.x, y: props.y})}
        onContextMenu={e => props.placeFlag(e, {x: props.x, y: props.y})}>
            <div className='square' >
                {elem.status ==  'init'? (<div className={`${elem.flag == true ? 'flag': ''} closed`}/>) : ''}
                {elem.val == 'x' ? (<img src="img/bomb.png" className="mine" />) : (<h1>{elem.val == 0? "" : elem.val}</h1>)}
            </div>
        </div>
    )
}



export default Square;