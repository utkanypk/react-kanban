import React, { Component } from 'react'
import Modal from 'react-modal'
import CardModal from './CardModal'

export class AddCard extends Component {
    
   
    render() {
        return (
            <div>
                <CardModal column = {this.props.column} addCard={this.props.addCard} buttonText="Add New Card"/>
            </div>
        )
    }
}



 

export default AddCard
