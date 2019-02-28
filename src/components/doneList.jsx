import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RightTask from "./rightTask.jsx";
import {doneClick} from "../actions/index.js"

class DoneList extends React.Component {
  constructor(props) {
    super(props);
    this.childSelected = this.childSelected.bind(this);
  }

  childSelected(task) {
    this.props.doneClick(task);
  }

  render() {
    return (
      <div>
        <p>This is our Done List!</p>
        <ul>
          {this.props.tasks.map(function(task, index) {
            return (
              <div key={index}>
                <RightTask
                  task={task}
                  action={this.childSelected}
                />
              </div>
            );
          }, this)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      tasks: state.doneTasks
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ doneClick: doneClick}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DoneList);
