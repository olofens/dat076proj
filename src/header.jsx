import React from 'react';
import ReactDOM from 'react-dom';
import "./header.css";


class Header extends React.Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="titleText">Eriks tid tagar ur!</div>
                <div className="recordButton"><button>Record</button></div>
                <div className="stopButton"><button>Stop</button></div>
            </div>
        );
    }
}

export default Header;