import { combineReducers } from 'redux';
import todos from './todos';
import auth from './auth';
import listReducer from './trello_reducer';

export default combineReducers({
    todos,
    auth,
    lists: listReducer
});