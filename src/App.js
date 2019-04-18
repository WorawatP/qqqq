import axios from 'axios';
import React, {Component} from 'react';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import Count from './count'
import Github from './Github/Github';
import Bears from './Bears/Bears';
// ========  action (As Dispatcher) ==========
export const add = () => ({type: 'ADD'})
export const minus = () => ({ type: 'MINUS'})

export const getGithub = (githubname = 'worawatP') => async (dispatch) => {
    const res = await axios.get(`https://api.github.com/users/${githubname}`);
    dispatch({
        type: 'GET_GITHUB',
        value: res.data
    })
}

export const getBears = () => async dispatch => {
    const res = await axios.get('http://localhost:8000/api/bears');
    dispatch({
        type: 'GET_BEARS',
        value: res.data
    })
    
}

export const createBears = (bear, callbackSuccess) => async dispatch => {
    await axios.post('http://localhost:8000/api/bears', bear);
    callbackSuccess();
}

export const editBear = (bearId, bear, callbackSuccess) => async dispatch => {
    await axios.put(`http://localhost:8000/api/bears/${bearId}`, bear);
    callbackSuccess();
}

export const deleteBears = (bearId, callbackSuccess) => async dispatch => {
    await axios.delete(`http://localhost:8000/api/bears/${bearId}`);
    callbackSuccess();
}

// ========  reducer (As Controller) =========
export const numberReducer = (state = 0, action) => {
   switch (action.type) {
       case 'ADD':
           return state + 1
       case 'MINUS':
           return state - 1
       default:
           return state
   }
}

export const githubReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_GITHUB':
            return action.value  // state = action.value
    
        default:
            return state;
    }
}

export const bearsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_BEARS':
            
            return action.value
    
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    number: numberReducer,
    github: githubReducer,
    bears: bearsReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

// ======== wrap root element by Provider with Store ========
class App extends Component {
   render() {
       return (
        <Provider store={store}>
            <Count/> <br />
            <Github /> <br />
            <Bears />
        </Provider>
       );
   }
}

export default App