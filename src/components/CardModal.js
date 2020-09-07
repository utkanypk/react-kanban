import React from 'react'
import Modal from 'react-modal'
import { findByLabelText } from '@testing-library/react';

export default function CardModal(props) {

    const [modalIsOpen,setIsOpen] = React.useState(false);
    const isUpdate= props.isUpdate;
    const [title, setTitle] = React.useState(props.title);
    const [id, setId] = React.useState(props.id);
    const [column, setColumn] =React.useState(props.column);
    const [context, setContext] =React.useState(props.context);
   
    
    
    function openModal() {
       setIsOpen(true);    
     
      }
      function closeModal(){
        setIsOpen(false);
      }
     const showInfo= props.addType==='column' ? true : false;
    
     const onChangeTitle= (e) =>  setTitle(e.target.value)
     
     const onChangeContext= (e) =>  setContext(e.target.value)
     const onChangeColumn= (e) =>  setColumn(e.target.value)
      
     const onClick = (e) => {
         e.preventDefault();
         setId(props.id)
         console.log(column);
         console.log(id);
         if(props.buttonText==="Add Card To Selected Column") {
            props.addCardByColumn(title, context);
         }
         if(props.buttonText==='Update'){
             props.updateCard(title,column,context,id);

         }else{
         props.addCard(title, column, context);
         setTitle('');
         setContext('');
        }
         closeModal();

         
     }
      const disable= props.selectedColumn=='Select Column' ? 'disabled': '';
      const isDisabled = props.buttonText==='Show Detail' ? 'disabled': '';
      const button = props.buttonText==='Update' ? 'Update' : 'Add';
      const header = props.buttonText==='Show Detail' ? 'Details' :props.buttonText=== 'Update' ? 'Update Your Card' : 'Add A New Card'

      


    return (<div>
        <button disabled= {disable} onClick={openModal}>{props.buttonText}</button>
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        > 
          <button style={closeStye} onClick={closeModal}>X</button>
          <h2>{header}</h2>          
          
          <form >
            
            <label>Title: </label>
            <br/>
            <input onChange={onChangeTitle} value={title} type="text" disabled={isDisabled} ></input>
            <br/>
            <div>
            <label>Card Content:</label> 
            <br/>  
            <textarea style={textStyle} onChange={onChangeContext} disabled={isDisabled} value={context} />
            </div>
            <button onClick= {onClick}  disabled={isDisabled} >{button}</button>
            
          </form>
        </Modal>
      </div>
    )
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '600px',
      height: '300px'
     
    }
  }
const textStyle = {
   padding: 'none', 
   width: '500px',
   height: '100px'


}

 const closeStye = {float: 'right'}
