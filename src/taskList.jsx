import React from 'react';
import ReactDOM from 'react-dom';
import LeftTask from "./leftTask.jsx"


class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.childHandler = this.childHandler.bind(this);
    }

    childHandler(dataFromChild) {
        console.log(dataFromChild);
        console.log("Previous state: " + JSON.stringify(this.state));
        this.setState({
            // something here
        }, () => console.log("Updated parent state: " + JSON.stringify(this.state)));
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
                                    action={this.childHandler}/>
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