import React from "react";
import ReactDOM from "react-dom";

class MiddleTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      description: props.description,
      estimatedTime: props.estimatedTime,
      actionPause: props.actionPause,
      actionDone: props.actionDone
    };
    this.clickedPause = this.clickedPause.bind(this);
    this.clickedDone = this.clickedDone.bind(this);
  }

  clickedPause() {
    console.log("PAUSED: Clicked task select with name " + this.state.name);
    this.state.actionPause(this.state.id);
  }
  clickedDone() {
    console.log("DONE: Clicked task select with name " + this.state.name);
    this.state.actionDone(this.state.id);
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
              <td>{this.state.name}</td>
              <td>{this.state.id}</td>
            </tr>
            <tr>
              <td>{this.state.description}</td>
              <td>
                <button onClick={this.clickedPause}>Pause</button>
                <button onClick={this.clickedDone}>Done</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MiddleTask;
