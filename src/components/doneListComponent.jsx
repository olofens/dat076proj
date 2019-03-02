import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RightTask from "../components/rightTask.jsx";
import { doneClick } from "../actions/index.js"

class DoneListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        var items = this.props.tasks.map((task) =>
            <li key={task.id}>
                <RightTask
                    task={task}
                    click={this.props.click}
                />
            </li>);
        return (<ul>{items}</ul>);
    }

    render() {
        return (
            <div>
                {this.taskList()}
            </div>
        );
    }
}

export default DoneListComponent;
