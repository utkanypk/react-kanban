import React, { Component} from 'react'
import Card from './Card'
import AddCard from './AddCard'
import {useDrag, useDrop} from 'react-dnd'
import ITEM_TYPE from './types'
 
   function Column (props) {

    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE.ITEM },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });   
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE.ITEM,
        drop: (item,monitor) => props.changeColumn(item,props.column.id),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      })

    
        return (        
            <div ref={drop}
            
            style={{float: 'left',
            padding: '10px 10px',
            border: '3px red solid',
            margin: '10px',
            width: '"10%',
            justifyContent: 'left',
            backgroundColor : isOver ?'red' :'pink'}}>
                <button onClick={props.delColumn.bind(this, props.column.id)} style= {buttonStyle}>X</button>
                <h1>{props.column.title}({props.column.cards.length})</h1>
                <AddCard column= {props.column.id} addCard={props.addCard} />
                <div>
                {props.column.cards.map(card => (
                <Card updateCard= {props.updateCard} columnId={props.column.id} key={card.cardId} card={card} delCard={props.delCard}/>    
                ))}
                </div>
            </div>
         
        )
    
   
}


const columnStyle = {
   // display: 'inline-flex',
   float: 'left',
    padding: '10px 10px',
    border: '3px red solid',
    margin: '10px',
    width: '"10%',
    justifyContent: 'left',
    backgroundColor : 'pink'
    
}

const buttonStyle = {
    float :'right',
    backgroundColor : 'red',
    borderRadius: '15px'
    
}
export default Column
