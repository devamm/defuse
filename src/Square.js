import React from 'react'

const Square = (props) => {
   
    return (
        <div className="square-click" onClick={ e => props.handleClick(e, {x: props.x, y: props.y})}
        onContextMenu={e => props.placeFlag(e, {x: props.x, y: props.y})}>
            <div className='square' >
                {props.elem.status ==  'init'? (<div className={`${props.elem.flag == true ? 'flag': ''} closed`}/>) : ''}
                {props.elem.val == 'x' ? (<img src="img/bomb.png" />) : (<h1>{props.elem.val == 0? "" : props.elem.val}</h1>)}
            </div>
        </div>
    )
}



export default Square;