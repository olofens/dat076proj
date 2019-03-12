
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import myReducer from "./myReducer.js"

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        myReducer: myReducer
    })






