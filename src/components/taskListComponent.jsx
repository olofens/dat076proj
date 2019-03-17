import React from 'react';
import ReactDOM from 'react-dom';
import LeftTaskContainer from "../containers/leftTaskContainer.jsx"
import "./column.css";
import Draggable from "../containers/draggable.jsx"
import Droppable from "../containers/droppable.jsx"
import { strict } from 'assert';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { DocumentAdd } from "styled-icons/typicons/DocumentAdd";



class TaskListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    taskList() {
        const items = this.props.tasks.map((task) =>
            <Draggable id={task.id} key={task.id}>
                <li>
                    <LeftTaskContainer task={task} openEdit={this.props.openEdit} deleteTask={this.props.deleteTask} />
                </li>
            </Draggable>);

        return (<ul>{items}</ul>);
    }



    render() {
        return (
            <div className="column">
                <Droppable id="drop1">

                    <h3 className="title">
                        <div id="centered">
                            To do
                        </div>
                        <div id="floating">
                            <div id="sidebar">
                                <button className="transbutton" onClick={this.props.showModal}>
                                    <DocumentAdd size={45} />
                                </button>
                            </div>
                        </div>
                    </h3>
                    {this.taskList()}
                </Droppable>

            </div>

        );
    }
}

export default TaskListComponent;