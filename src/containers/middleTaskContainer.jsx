import React from "react";
import ReactDOM from "react-dom";
import MiddleTaskComponent from "../components/middleTaskComponent.jsx"

class MiddleTaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.task.elapsedtime,
      timerOn: false,
      progress: this.calcProg(this.props.task.elapsedtime, this.props.task.estimatedtime)
    };
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.secondsToMS = this.secondsToMS.bind(this);
    this.calcProg = this.calcProg.bind(this);
  }

  componentWillUnmount() {
    this.props.updateTime(this.props.task.id, this.state.time);
    clearInterval(this.timer);
  }

  secondsToMS(sec) {
    var min = Math.floor(sec / 60);
    var seconds = sec - (min * 60);
    seconds = Math.round(seconds * 100) / 100;
  
    var result = (min < 10 ? "0" + min : min);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  
    return result;
  }

  //Calculate progress for progress bar
  calcProg(elap, est) {
  
    if (elap == 0 || est == 0) {
      return 0;
    }
    else {
      return parseInt(elap / est * 100)
    }
  }

  //Timer logic
  //Updates the state
  toggleTimer() {
    if (!this.state.timerOn) {
      this.timer = setInterval(() => {
        this.setState({
          timerOn: true,
          time: this.state.time + 1,
          progress: this.calcProg(this.state.time, this.props.task.estimatedtime)
        });
      }, 1000);
    } else {
      this.props.updateTime(this.props.task.id, this.state.time);
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
      <MiddleTaskComponent
        task={this.props.task}
        time={this.secondsToMS(this.state.time)}
        estimatedtime={this.secondsToMS(this.props.task.estimatedtime)}
        edit={this.edit}
        delete={this.delete}
        toggleTimer={this.toggleTimer}
        timerOn={this.state.timerOn}
        progress={this.state.progress}
      />
    );
  }
}

export default MiddleTaskContainer;
