import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import { employeesReducers } from "./reducers/employeesReducer";

export const store = createStore(employeesReducers, applyMiddleware(thunk))