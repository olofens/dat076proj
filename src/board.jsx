import React from 'react';
import ReactDOM from 'react-dom';


class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.tasks.map((row, index) => {
            console.log("Board now has these tasks: ");
            console.log(row);
            return (
                <tr key={index}>
                    <td>
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