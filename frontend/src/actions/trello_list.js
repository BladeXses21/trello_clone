import { ADD_LIST, DRAG_HAPPENED, GET_LISTS } from "./types";
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';


export const addList = (list) => {
    axios.post(`api/lists/`, list)
        .then(result => {
            dispatch({
                type: ADD_LIST,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    };
};

export const getLists = () => dispatch => {
    axios.get('/api/lists/')
        .then(result => {
            dispatch({
                type: GET_LISTS,
                payload: result.data
            });
        }).catch(error => console.log(error));
};
