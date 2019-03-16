import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Edit } from "styled-icons/boxicons-solid/Edit";
import { Delete } from "styled-icons/material/Delete";
import "./middletask.css";


function secondsToMS(sec) {
  var min = Math.floor(sec / 60);
  var seconds = sec - (min*60);
  seconds = Math.round(seconds * 100) / 100;

  var result = (min < 10 ? "0" + min : min);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  console.log(result)

  return result;

}

class MiddleTask extends React.Component {
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
  // Updates the time in the DB
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

  //Retrieves the timer value 
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
          that.setState({ time: data.elapsedtime });
        });
    }, 500);
  }

  componentWillUnmount() {
    this.updateElapsedTime();
    clearInterval(this.timer);
  }

  secondstoMS(sec) {
    var min = Math.floor(sec / 60);
    var seconds = sec - (min*60);
    seconds = Math.round(seconds * 100) / 100;

    var result = "-" + (min < 10 ? "0" + min : min);
    result += "-" + (seconds < 10 ? "0" + seconds : seconds);
    console.log(result)

    return result;

  }

  

  //Timer logic
  //Updates the state
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
            <td className="titletd">{this.props.task.title}</td>
            <td className="estimatedText">Est.</td>
            <td>{secondsToMS(this.props.task.estimatedtime)}</td>
            <td className="buttontd">
              <button className="transbutton" onClick={this.edit}>
                <Edit size={20} />
              </button>
            </td>
          </tr>
          <tr>
            <td className="desctd">{this.props.task.description}</td>
            <td>
              <button className="timer" onClick={this.toggleTimer}>
                {this.state.timerOn ? "Stop Timer" : "Start Timer"}
              </button>
            </td>
            <td id="timerLabel">{secondsToMS(this.state.time)}</td>
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

export default MiddleTask;
