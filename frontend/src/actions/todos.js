import axios from 'axios';
import { GET_TODO_LIST, ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../actions/types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';

// GET_TODO_LIST
export const getTodos = () => dispatch => {
    axios.get('api/todo/')
        .then(result => {
            dispatch({
                type: GET_TODO_LIST,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

// DELETE_TODO
export const deleteTodo = (id) => dispatch => {
    axios.delete(`api/todo/${id}/`)
        .then(result => {
            dispatch({
                type: DELETE_TODO,
                payload: id
            });
        }).catch(error => console.log(error));
};

// TOGGLE_TODO
export const toggleTodo = (todo) => dispatch => {
    todo.done = !todo.done;
    axios.put(`api/todo/${todo.id}/`, todo)
        .then(result => {
            dispatch({
                type: TOGGLE_TODO,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

// ADD_TODO
export const addTodo = (todo) => dispatch => {
    axios.post(`api/todo/`, todo)
        .then(result => {
            dispatch({
                type: ADD_TODO,
                payload: result.data
            });
        }).catch(error => console.log(error));
}