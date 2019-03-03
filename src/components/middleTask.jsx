import React from "react";
import ReactDOM from "react-dom";

class MiddleTask extends React.Component {
    constructor(props) {
        super(props);

        this.clickedBack = this.clickedBack.bind(this);
        this.clickedForward = this.clickedForward.bind(this);
    }

    clickedBack() {
        this.props.actionBack(this.props.task);
    }

    clickedForward() {
        this.props.actionForward(this.props.task);
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
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default MiddleTask;
