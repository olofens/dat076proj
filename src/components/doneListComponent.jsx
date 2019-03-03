import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RightTask from "../components/rightTask.jsx";
import { doneClick } from "../actions/index.js"
import "./column.css"

class DoneListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        var items = this.props.tasks.map((task) =>
            <li key={task.id}>
                <RightTask
                    task={task}
                    action={this.props.click}
                />
            </li>);
        return (<ul>{items}</ul>);
    }

    render() {
        return (
            <div className="column">
                <h3 className="title">Done</h3>
                {this.taskList()}
            </div>
        );
    }
}

export default DoneListComponent;
