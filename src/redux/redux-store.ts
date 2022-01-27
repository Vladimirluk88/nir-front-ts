import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { appReducer } from "./reducer";

let rootReducer = combineReducers({appReducer});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export let store = createStore(rootReducer, applyMiddleware(thunk));