import React from "react";
import ReactDOM from "react-dom";
import "./righttask.css";
//import { getSQLdate } from "./dateConverter.js";

class RightTask extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    console.log(this.props.task.datefinished);
    this.props.task.datefinished = null;
    const tempTask = this.props.task;
    fetch("http://127.0.0.1:3000/api/update_task", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tempTask)
    });

    // fetch(
    //   `http://127.0.0.1:3000/update_datefinished?datefinished=${
    //     this.props.task.datefinished
    //   }&id=${this.props.task.id}`
    // );
    this.props.action(this.props.task);
  }

  componentWillMount() {
    if (this.props.task.datefinished === null) {
      this.props.task.datefinished = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // fetch(
      //   `http://127.0.0.1:3000/update_datefinished?datefinished=${
      //     this.props.task.datefinished
      //   }&id=${this.props.task.id}`
      // );
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
          </tr>
          <tr>
            <td>{this.props.task.description}</td>
            <td>
              <button onClick={this.clicked}>Select</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default RightTask;
