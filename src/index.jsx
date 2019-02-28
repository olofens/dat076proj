import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import React from 'react';
import ReactDOM from 'react-dom';
import myApp from './reducers';
import App from './components/app.jsx';
import { init } from "./actions/index.js"
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(myApp, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(init());

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("app")
  );
}

store.subscribe(render);

render();

