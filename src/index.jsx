import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import React from 'react';
import ReactDOM from 'react-dom';
import myApp from './reducers';
import App from './containers/app.jsx';
import Login from "./containers/login.jsx";
import Register from "./containers/register.jsx";
import { init } from "./actions/index.js";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';


let store = createStore(myApp, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(init());

function render() {
    ReactDOM.render(

        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>

        </Provider>,
        document.getElementById("app")
    );
}

store.subscribe(render);

render();

