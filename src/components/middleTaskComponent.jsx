import React from "react";
import ReactDOM from "react-dom";
import "./middletask.css";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";

class MiddleTaskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timerOn: false
    };
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  toggleTimer() {
    console.log("Timer: ", this.state.timerOn);
    if (!this.state.timerOn) {
      this.timer = setInterval(() => {
        this.setState({
          timerOn: true,
          time: this.state.time + 1
        });
        console.log("counting to", this.state.time);
      }, 1000);
      console.log("start");
    } else {
      this.setState({ timerOn: false });
      clearInterval(this.timer);
    }
  }

  edit() {
    this.props.startEditTask(this.props.task, "doingTasks");
  }

  delete() {
    this.props.deleteTask(this.props.task, "doingTasks");
  }

  render() {
    return (
      <table className="middletask">
        <tbody>
          <tr>
            <td>{this.props.task.title}</td>
            <td>{this.props.task.estimatedtime}</td>
            <td />
            <td className="buttontd">
              <button className="transbutton" onClick={this.edit}>
                <Edit size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td>{this.props.task.description}</td>
            <td>
              <button className="timer" onClick={this.toggleTimer}>
                {this.state.timerOn ? "Stop Timer" : "Start Timer"}
              </button>
            </td>
            <td>Time: {this.state.time}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.delete}>
                <Delete size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MiddleTaskComponent;