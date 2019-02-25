import React from 'react';
import ReactDOM from 'react-dom';


class Board extends React.Component {
    render() {
        return (
            <div>
                <p>This is our board!</p>
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

export default Board;