import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";
import "./middletask.css";
import MiddleTaskComponent from "./middleTaskComponent.jsx";

class MiddleTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timerOn: false
    };
  }

  updateElapsedTime() {
    const toggledTime = this.state.time;
    this.props.task.elapsedtime = toggledTime;
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

  componentDidMount() {
    const that = this;
    setTimeout(() => {
      const tempTask = this.props.task;
      console.log(JSON.stringify(tempTask, null, 2));
      fetch("http://127.0.0.1:3000/get_task_time", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempTask, null, 2)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          const items = data;
          that.setState({ time: items[0].elapsedtime });
        });
    }, 500);
  }

  componentWillUnmount() {
    this.updateElapsedTime();
    clearInterval(this.timer);
  }

  render() {
    return (
      <MiddleTaskComponent
        task={this.props.task}
        startEditTask={this.props.startEditTask}
        deleteTask={this.props.deleteTask}
      />
    );
  }
}

export default MiddleTask;
