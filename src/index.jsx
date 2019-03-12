import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import React from 'react';
import ReactDOM from 'react-dom';
import createRootReducer from './reducers/index.js';
import Auth from "./containers/auth.jsx"
import App from "./containers/app.jsx"
import Login from "./containers/login.jsx";
import Register from "./containers/register.jsx";
import { init } from "./actions/index.js";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';
import PrivateRoute from "./containers/privateRoute.jsx"
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import {history} from "./helpers/history.js"



let store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);
store.dispatch(init());

function render() {
    ReactDOM.render(
        <div>
            <p>{console.log("re-render")}hi</p>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <BrowserRouter>
                        <Switch>
                            <PrivateRoute exact path="/" component={App} />
                            <Route path="/login" auth={store.getState().myReducer.authenticated} component={Auth} />
                        </Switch>
                    </BrowserRouter>
                </ConnectedRouter>

            </Provider>
        </div>,

        document.getElementById("app")
    );
}

store.subscribe(render);

render();

