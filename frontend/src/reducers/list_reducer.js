import {ADD_LIST, MOVE_LIST, GET_LISTS, ADD_LIST_SUCCESS, ADD_LIST_REQUEST, SORT_LISTS, SAVE_LISTS_SUCCESS} from '../actions/types';
import _ from 'lodash';

let listID = 1;

const initialState = {
    loading: false, error: null, lists: []
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state, lists: action.payload,
            };
        case ADD_LIST_REQUEST:
            return {
                ...state, loading: true, error: null,
            };
        case ADD_LIST_SUCCESS:
            return {
                ...state, loading: false, error: null, lists: [...state.lists, action.payload.list],
            };
        case SAVE_LISTS_SUCCESS:
            return {...state, loading: false, error: false}
        case MOVE_LIST: {
        }
        default:
            return state;
    }
};

export default listReducer;