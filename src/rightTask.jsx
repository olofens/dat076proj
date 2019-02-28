import React from "react";
import ReactDOM from "react-dom";

class RightTask extends React.Component {
  constructor(props) {
    super(props);

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    console.log("Clicked task select with name " + this.props.name);
    this.props.action(this.props.id);
  }

  render() {
    var tempStyle = {
      borderStyle: "solid"
    };

    return (
      <div>
        <table style={tempStyle}>
          <tbody>
            <tr>
              <td>{this.props.name}</td>
              <td>{this.props.id}</td>
            </tr>
            <tr>
              <td>{this.props.description}</td>
              <td>
                <button onClick={this.clicked}>Select</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RightTask;
