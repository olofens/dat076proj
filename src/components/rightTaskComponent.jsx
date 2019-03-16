import React from "react";
import ReactDOM from "react-dom";
import "./righttask.css";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";

class RightTaskComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="righttask">
        <tbody>
          <tr>
            <td>{this.props.task.title}</td>
            <td>{this.props.task.id}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.props.edit}>
                <Edit size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td>{this.props.task.description}</td>
            <td></td>
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

export default RightTaskComponent;
