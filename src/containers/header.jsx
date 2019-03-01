import React from 'react';
import ReactDOM from 'react-dom';
import "./header.css";


class Header extends React.Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="titleText">Eriks tid tagar ur!</div>
                <div className="recordButton"></div>
                <div className="stopButton"></div>
            </div>
        );
    }
}

export default Header;