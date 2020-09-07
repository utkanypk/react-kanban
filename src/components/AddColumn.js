import React, { Component } from "react";

export class AddColumn extends Component {
  state = {
    column: "",
  };
  onChange = (e) => this.setState({ column: e.target.value });

  onClick = (e) => {
    if (this.state.column === "") {
      alert("You should enter column name!");
    } else {
      this.props.addColumn(this.state.column);
      this.setState({ column: "" });
    }
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Add Column</button>
        <input
          onChange={this.onChange}
          value={this.state.column}
          type="text"
          placeholder="Please Enter Title"
        />
      </div>
    );
  }
}

export default AddColumn;
