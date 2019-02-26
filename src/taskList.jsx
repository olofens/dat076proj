import React from 'react';
import ReactDOM from 'react-dom';
import LeftTask from "./leftTask.jsx"


class TaskList extends React.Component {
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
                <p>This is our Task List!</p>
                <ul>
                    {this.props.tasks.map(function (item, index) {
                        return (
                            <div key={index}>
                                <LeftTask 
                                    id={item.id} 
                                    name={item.name} 
                                    description={item.description} 
                                    estimatedTime={item.estimatedTime}
                                    action={this.childSelected}/>
                            </div>
                        )
                    }, this)
                    }
                </ul>
            </div>
        );
    }
}

export default TaskList;