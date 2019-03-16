import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";
import "./../components/middletask.css";

class MiddleTaskComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="middletask">
        <tbody>
          <tr>
            <td className="titletd">{this.props.task.title}</td>
            <td>{this.props.task.estimatedtime}</td>
            <td />
            <td className="buttontd">
              <button className="transbutton" onClick={this.props.edit}>
                <Edit size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td className="desctd">{this.props.task.description}</td>
            <td>
              <button className="timer" onClick={this.props.toggleTimer}>
                {this.props.timerOn ? "Stop Timer" : "Start Timer"}
              </button>
            </td>
            <td id="timerLabel">Time: {this.props.time}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.props.delete}>
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
