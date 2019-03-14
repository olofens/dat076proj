import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import React from 'react';
import ReactDOM from 'react-dom';
import myApp from './reducers';
import App from './containers/app.jsx';
import { init } from "./actions/index.js";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';


let store = createStore(myApp, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(init());

function render() {
    ReactDOM.render(

        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                </Switch>
            </BrowserRouter>

        </Provider>,
        document.getElementById("app")
    );
}

store.subscribe(render);

render();

