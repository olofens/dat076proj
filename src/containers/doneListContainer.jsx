import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RightTask from "../components/rightTask.jsx";
import { doneClick } from "../actions/index.js"
import DoneListComponent from "../components/doneListComponent.jsx"
import Droppable from "./droppable.jsx"

class DoneListContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Droppable id="drop3">
                <DoneListComponent
                    tasks={this.props.tasks}
                    click={this.props.doneClick}
                />
            </Droppable>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.doneTasks
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ doneClick: doneClick }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DoneListContainer);
