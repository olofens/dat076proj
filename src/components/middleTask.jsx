import React from "react";
import ReactDOM from "react-dom";

class MiddleTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
        this.clickedBack = this.clickedBack.bind(this);
        this.clickedForward = this.clickedForward.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    clickedBack() {
        this.props.actionBack(this.props.task);
    }

    clickedForward() {
        this.props.actionForward(this.props.task);
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.setState({
                time: this.state.time + 1
            });
            console.log("counting to", this.state.time);
        }, 1000);
        console.log("start")
    }

    render() {
        return (
            <table className="middletask.css">
                <tbody>
                    <tr>
                        <td>
                            {this.props.task.title}
                        </td>
                        <td>
                            {this.props.task.estimatedtime}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {this.props.task.description}
                        </td>
                        <td>
                            <button onClick={this.clickedBack}>Pause</button>
                            <button onClick={this.clickedForward}>Done</button>
                        </td>
                        <td>
                            <button onClick={this.startTimer}>Start timer</button>
                        </td>
                        <td>Time: {this.state.time}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default MiddleTask;
