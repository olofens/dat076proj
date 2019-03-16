import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RightTask from "../components/rightTask.jsx";
import { startEditTask, deleteTask } from "../actions/index.js"
import DoneListComponent from "../components/doneListComponent.jsx"
import Droppable from "./droppable.jsx"

class DoneListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DoneListComponent
                tasks={this.props.tasks}
                startEditTask={this.props.startEditTask}
                deleteTask={this.props.deleteTask}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.doneTasks
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ 
        startEditTask: startEditTask, 
        deleteTask: deleteTask,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DoneListContainer);
