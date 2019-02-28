import React from "react";
import ReactDOM from "react-dom";
import MiddleTask from "./middleTask.jsx";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.childPauseSelected = this.childPauseSelected.bind(this);
    this.childDoneSelected = this.childDoneSelected.bind(this);
  }

  childPauseSelected(id) {
    console.log(id + " Pause clicked");
    this.props.actionPause(id);
  }
  childDoneSelected(id) {
    console.log(id + " Done clicked");
    this.props.actionDone(id);
  }

  render() {
    console.log("Board now has these tasks: ");
    console.log(this.props.tasks);
    const rows = this.props.tasks.map((task, index) => {
      return (
        <tr key={index}>
          <td>
            <MiddleTask
              id={task.id}
              name={task.name}
              description={task.description}
              estimatedTime={task.estimatedTime}
              actionPause={this.childPauseSelected}
              actionDone={this.childDoneSelected}
            />
          </td>
        </tr>
      );
    });

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Board;
