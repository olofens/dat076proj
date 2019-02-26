import React from 'react';
import ReactDOM from 'react-dom';
import MiddleTask from "./middleTask.jsx"


class Board extends React.Component {
    constructor(props) {
        super(props);

        this.childSelected = this.childSelected.bind(this);
    }

    childSelected(id) {
        console.log(id + " clicked");
        this.props.action(id);
    }

    render() {
        console.log("Board now has these tasks: ");
        console.log(this.props.tasks);
        const rows = this.props.tasks.map((task, index) => {
            return (
                <tr key={index}>
                    <td>
                        <MiddleTask 
                            id={task.id} 
                            name={task.name} 
                            description={task.description} 
                            estimatedTime={task.estimatedTime}
                            action={this.childSelected}
                        />
                    </td>
                </tr>
            )
        });

        return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
        )
    }
}

export default Board;