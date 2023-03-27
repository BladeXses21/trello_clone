import { ADD_LIST, DRAG_HAPPENED, GET_LISTS } from "./types";
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';


export const getLists = () => dispatch => {
    axios.get('/lists/')
        .then(result => {
            dispatch({
                type: GET_LISTS,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

export const addList = (title) => async (dispatch) => {
    try {
        const { data } = await axios.post('/lists/', { title });
        dispatch({
            type: ADD_LIST,
            payload: data
        });
    } catch (error) {
        console.error(error);
    }
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