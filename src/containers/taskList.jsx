import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import LeftTask from "../components/leftTask.jsx"
import { todoClick } from "../actions/index.js"

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.childSelected = this.childSelected.bind(this);
        this.taskList = this.taskList.bind(this);
    }

    childSelected(task) {
        this.props.todoClick(task);
    }

    taskList() {
        const items = this.props.tasks.map((task) =>
            <li key={task.id}>
                <LeftTask task={task} action={this.childSelected} />
            </li>);
        return (<ul>{items}</ul>);
    }

    render() {
        return (
            <div>
                <h3>To do</h3>
                {this.taskList()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.todoTasks
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ todoClick: todoClick}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskList);