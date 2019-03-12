import React from "react";
import ReactDOM from "react-dom";

class MiddleTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      timerOn: false
    };
    this.clickedBack = this.clickedBack.bind(this);
    this.clickedForward = this.clickedForward.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  updateElapsedTime() {
    const toggledTime = this.state.time;
    //Replace console log with database call?

    fetch(
      `http://127.0.0.1:3000/update_time?id=${
        this.props.task.id
      }&time=${toggledTime}`
    );
  }

  componentDidMount() {
    const that = this;
    fetch(`http://127.0.0.1:3000/get_task?id=${this.props.task.id}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const items = data;
        that.setState({ time: items[0].elapsedtime });
      });
  }

  componentWillUnmount() {
    this.updateElapsedTime();
    clearInterval(this.timer);
  }

  clickedBack() {
    this.props.actionBack(this.props.task);
  }

  clickedForward() {
    this.props.actionForward(this.props.task);
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

  render() {
    return (
      <table className="middletask.css">
        <tbody>
          <tr>
            <td>{this.props.task.title}</td>
            <td>{this.props.task.estimatedtime}</td>
          </tr>
          <tr>
            <td>{this.props.task.description}</td>
            <td>
              <button onClick={this.clickedBack}>Pause</button>
              <button onClick={this.clickedForward}>Done</button>
            </td>
            <td>
              <button onClick={this.toggleTimer}>
                {this.state.timerOn ? "Stop Timer" : "Start Timer"}
              </button>
            </td>
            <td>Time: {this.state.time}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MiddleTask;
