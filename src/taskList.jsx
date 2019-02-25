import React from 'react';
import ReactDOM from 'react-dom';


class TaskList extends React.Component {
    render() {
        return (
            <div>
                <p>This is our Task List!</p>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                    <li>Task 4</li>
                </ul>
            </div>
        );
    }
}

export default TaskList;