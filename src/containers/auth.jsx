import React from 'react';
import ReactDOM from 'react-dom';
import { authenticate } from "./../actions/index.js"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitor: {
                username: '',
                password: ''
            }
        }
    }

    updateVisitor(attribute, event) {
        const updatedVisitor = Object.assign({}, this.state.visitor);
        updatedVisitor[attribute] = event.target.value;

        this.setState({
            visitor: updatedVisitor
        })
    }

    register(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.visitor));
    }

    login(event) {
        event.preventDefault();
        this.props.authenticate(this.state.visitor.username, this.state.visitor.password);
        console.log(JSON.stringify(this.state.visitor));
    }

    render() {
        return (
            <div className="container">
            <p>{console.log("rendering auth")}</p>
                <div className="row">
                    <div className="col-md-6">
                        <h1>Register</h1>
                        <form>
                            <input onChange={this.updateVisitor.bind(this, 'username')} type="text" className="form-control" placeholder="Username"/>
                            <input onChange={this.updateVisitor.bind(this, 'password')} type="text" className="form-control" placeholder="Password"/>
                            <button onClick={this.register.bind(this)}>Register</button>
                        </form>

                        <hr/>

                        <h1>Login</h1>
                        <form>
                            <input onChange={this.updateVisitor.bind(this, 'username')} type="text" className="form-control" placeholder="Username"/>
                            <input onChange={this.updateVisitor.bind(this, 'password')} type="text" className="form-control" placeholder="Password"/>
                            <button onClick={this.login.bind(this)}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authenticated
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        authenticate: authenticate
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Auth);
