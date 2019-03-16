import React from "react";
import ReactDOM from "react-dom";
import "./righttask.css";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";

class RightTask extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit() {
    this.props.startEditTask(this.props.task, "doneTasks");
  }

  delete() {
    this.props.deleteTask(this.props.task, "doneTasks");
  }

  componentWillMount() {
    if (this.props.task.datefinished === (null || "null")) {
      this.props.task.datefinished = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const tempTask = this.props.task;
      fetch("http://127.0.0.1:3000/api/update_task", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempTask)
      });
    }
    console.log(this.props);
  }

  render() {
    return (
      <table className="righttask">
        <tbody>
          <tr>
            <td>{this.props.task.title}</td>
            <td>{this.props.task.id}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.edit}>
                <Edit size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td>{this.props.task.description}</td>
            <td></td>
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

export default RightTask;
