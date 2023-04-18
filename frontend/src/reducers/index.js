import { combineReducers } from 'redux';
import todos from './todos';
import auth from './auth';
import listReducer from './list_reducer';
import cardReducer from './card_reducer';

export default combineReducers({
    todos,
    auth,
    lists: listReducer,
    cards: cardReducer,
});