import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./header.jsx";
import Board from "./board.jsx"
import './test.css';


class App extends React.Component {
    render() {
        return (
            <div className="container">
<<<<<<< HEAD
                <div className="itemHeader"> <Header/> </div>
                <div className="itemSidebar">This is a sidebar!</div>
                <div className="itemContent"><Board/></div>
=======
                <Header/>
                <Board/>
>>>>>>> e15e1ea6285c60316fd1b57f85a62cc300ebe585
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
