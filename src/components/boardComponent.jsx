import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { doingClickBack, doingClickForward } from "../actions/index.js"
import MiddleTask from "../components/middleTask.jsx"


class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        var items = this.props.tasks.map((task) =>
            <li key={task.id}>
                <MiddleTask
                    task={task}
                    actionBack={this.props.backClick}
                    actionForward={this.props.forwardClick}
                />
            </li>);
        return (<ul>{items}</ul>);
    }

    render() {
        return (
            <div className="column">
                <h3 className="title">Board</h3>
                {this.taskList()}
            </div>
        );
    }
}

export default BoardComponent;
