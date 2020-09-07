import React, { Component } from 'react'
import CardModal from './CardModal'
import {useDrag, useDrop} from 'react-dnd'
import ITEM_TYPE from './types'

function Card (props)  {
   
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE.ITEM ,
            id: props.card.cardId,
            column: props.columnId,
            context: props.card.cardContext,
            title: props.card.cardTitle,
        },
              
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });   

    
        return (
            <div ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
              fontSize: 25,
              fontWeight: 'bold',
              cursor: 'move',}}
            style={cardStyle} >
                <button onClick={props.delCard.bind(this,props.card.cardId,props.columnId)} style={buttonStyle}>X</button>
                <h2> 
                {props.card.cardTitle }</h2>
                <span>{props.card.cardContext.length<13  ? props.card.cardContext : `${props.card.cardContext.substring(0,30)}...`}</span>
                <CardModal isUpdate="true" id={props.card.cardId} updateCard={props.updateCard} column={props.columnId}
                title={props.card.cardTitle} context={props.card.cardContext} buttonText="Show Detail" />      
                <CardModal isUpdate="true" id={props.card.cardId} updateCard={props.updateCard} column={props.columnId}
                title={props.card.cardTitle} context={props.card.cardContext} buttonText="Update" />                
            </div>
        )
    
}

const cardStyle = {

    backgroundColor: 'grey',
    width: '200px'
}

const updateStyle = {
    float: 'right',
    margin: '0px',
    backgroundColor: 'grey'
}

const buttonStyle = {
    float :'right',
    backgroundColor : 'dark-grey',
    borderRadius: '15px',
    borderColor: 'black'
    
}

export default Card
