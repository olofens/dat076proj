import React from "react";
import ReactDOM from "react-dom";
import RightTask from "./rightTask.jsx";

class DoneList extends React.Component {
  constructor(props) {
    super(props);
    this.childSelected = this.childSelected.bind(this);
  }

  childSelected(id) {
    console.log(id + " clicked");
    this.props.action(id);
  }

  render() {
    return (
      <div>
        <p>This is our Done List!</p>
        <ul>
          {this.props.tasks.map(function(item, index) {
            return (
              <div key={index}>
                <RightTask
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  estimatedTime={item.estimatedTime}
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

export default DoneList;
