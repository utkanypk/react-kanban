import React, { Component, createContext } from "react";
import "./App.css";
import Column from "./components/Column";
import AddColumn from "./components/AddColumn";
import Modal from "react-modal";
import CardModal from "./components/CardModal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//export const CardContext = createContext({
  //changeColumn: null,
//});

class App extends Component {
  state = {
    columns: [
      {
        id: 1,
        title: "Requests",
        cards: [
          {
            cardId: 1,
            cardTitle: "Learn React",
            cardContext: "You should learn React already!",
          },
          {
            cardId: 2,
            cardTitle: "Learn Redux",
            cardContext: "You should learn Redux already!",
          },
        ],
      },
      {
        id: 2,
        title: "OnGoing",
        cards: [
          {
            cardId: 1,
            cardTitle: "Learn JS",
            cardContext: "You should learn JS already!",
          },
        ],
      },
      {
        id: 3,
        title: "Finished",
        cards: [
          {
            cardId: 1,
            cardTitle: "Learn JS",
            cardContext: "You should learn JS already!",
          },
        ],
      },
    ],
    selected: "Select Column",
  };
  delCard = (id, columnId) => {
    console.log(`${id}`);
    console.log(columnId);
    this.setState({
      columns: [
        ...this.state.columns.map((column, index, columns) => {
          if (column.id === columnId) {
            columns[index].cards = column.cards.filter(
              (card) => card.cardId !== id
            );
          }
          return column;
        }),
      ],
    });
  };

  addCardByColumn = (title, context) => {
    let newCard = {
      cardId: 1,
      cardTitle: title,
      cardContext: context,
    };

    console.log(newCard);

    this.setState({
      columns: [
        ...this.state.columns.map((column, index, columns) => {
          if (column.title == this.state.selected) {
            newCard.cardId = columns[index].cards.length + 1;
            console.log(newCard);
            columns[index].cards.push(newCard);
          }
          return column;
        }),
      ],
    });
  };

  addCard = (title, columnId, cardContext) => {
    console.log(columnId);

    let newCard = {
      cardId: 1,
      cardTitle: title,
      cardContext,
    };

    console.log(newCard);

    this.setState({
      columns: [
        ...this.state.columns.map((column, index, columns) => {
          if (column.id == columnId) {
            newCard.cardId = columns[index].cards.length + 1;
            console.log(newCard);
            columns[index].cards.push(newCard);
          }
          return column;
        }),
      ],
    });
  };
  updateCard = (title, columnId, context, id) => {
    console.log(context);
    console.log(columnId);
    console.log(id);
    this.setState({
      columns: [
        ...this.state.columns.map((column, index, columns) => {
          if (column.id == columnId) {
            columns[index].cards.map((card, index, cards) => {
              if (card.cardId == id) {
                cards[index].cardTitle = title;
                cards[index].cardContext = context;
              }
              return card;
            });
          }
          return column;
        }),
      ],
    });
  };
  changeColumn = (item, targetColumn) => {
    console.log(item);
    if (item.column !== targetColumn) {
      this.delCard(item.id, item.column);
      this.addCard(item.title, targetColumn, item.context);
    }
  };

  delColumn = (id) => {
    if (window.confirm("column is deleting!")) {
      this.setState({
        columns: [...this.state.columns.filter((column) => column.id !== id)],
      });
    }
  };

  addColumn = (title) => {
    let newColumn = {
      id: this.state.columns.length + 1,
      title,
      cards: [],
    };
    this.setState({
      columns: [...this.state.columns, newColumn],
    });
  };

  columnChange = (e) => {
    this.setState({ selected: e.target.value });
    console.log(this.state.selected);
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <select onChange={this.columnChange} value={this.state.selected}>
              <option>Select Column</option>
              {this.state.columns.map((column, index) => (
                <option key={index} value={column.title}>
                  {column.title}
                </option>
              ))}
            </select>
            <CardModal
              selectedColumn={this.state.selected}
              addCardByColumn={this.addCardByColumn}
              addCard={this.addCard}
              addType="column"
              buttonText="Add Card To Selected Column"
            />
          </div>
          <AddColumn addColumn={this.addColumn} />
          <div className="Column">
            {this.state.columns.map((column, index) => (
              <Column
                updateCard={this.updateCard}
                changeColumn={this.changeColumn}
                key={column.id}
                column={column}
                addCard={this.addCard}
                delColumn={this.delColumn}
                delCard={this.delCard}
              />
            ))}
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default App;
