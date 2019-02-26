import React from 'react';
import ReactDOM from 'react-dom';
import LeftTask from "./leftTask.jsx"


class TaskList extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: [], 
            childClicks: 0
        }

        this.childHandler = this.childHandler.bind(this);
    }
    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(response => this.setState({ tasks: response }));
    }

    childHandler(dataFromChild) {
        console.log(dataFromChild);
        console.log("Previous state: " + this.state.childClicks);
        this.setState({
            childClicks: this.state.childClicks + 1
        }, () => console.log("Updated parent state: " + this.state.childClicks));
    }

    render() {
        return (
            <div>
                <p>This is our Task List!</p>
                <ul>
                    {this.state.tasks.map(function (item, index) {
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