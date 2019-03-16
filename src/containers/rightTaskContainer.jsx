import React from "react";
import ReactDOM from "react-dom";
import RightTaskComponent from "../components/rightTaskComponent.jsx"

class RightTaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit() {
    this.props.startEditTask(this.props.task, "doneTasks");
  }

  delete() {
    this.props.deleteTask(this.props.task, "doneTasks");
  }

  render() {
    return (
        <RightTaskComponent 
            task={this.props.task}
            edit={this.props.edit}
            delete={this.props.delete}
        />
    );
  }
}

export default RightTaskContainer;
