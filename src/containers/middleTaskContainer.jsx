import React from "react";
import ReactDOM from "react-dom";
import MiddleTaskComponent from "../components/middleTaskComponent.jsx"

class MiddleTaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.task.elapsedtime,
      timerOn: false
    };
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  componentWillUnmount() {
    this.props.updateTime(this.props.task.id, this.state.time);
    clearInterval(this.timer);
  }

  //Timer logic
  //Updates the state
  toggleTimer() {
    if (!this.state.timerOn) {
      this.timer = setInterval(() => {
        this.setState({
          timerOn: true,
          time: this.state.time + 1
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
        time={this.state.time}
        edit={this.edit}
        delete={this.delete}
        toggleTimer={this.toggleTimer}
        timerOn={this.state.timerOn}
      />
    );
  }
}

export default MiddleTaskContainer;
