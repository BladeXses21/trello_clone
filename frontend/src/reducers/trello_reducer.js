import { ADD_CARD, ADD_LIST, DRAG_HAPPENED, GET_LISTS, GET_CARDS } from '../actions/types';
import _ from 'lodash';

let listID = 1;
let cardID = 1;

const initialState = {
  loading: false,
  error: null,
  lists: []
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                lists: action.payload,
            };
        case ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            };
            listID += 1
            return { ...state, lists: [...state.lists, newList] };
        case ADD_CARD: {
            const newCard = {
                cards: action.payload,
                id: `card-${cardID}`
            };
            cardID += 1;
            console.log("action received", action);

            const newState = state.lists.map((list) => {
                if(list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    };
                } else {
                    return list;
                }
            });
            return { ...state, lists: newState };
        }
        case DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload;

            //dragging list
            if (type === "list") {
                // find the list from state
//                const list = newState.splice(droppableIndexStart, 1);
//                newState.splice(droppableIndexEnd, 0, ...list);
                return state.lists;
            }

            // in the same list
            if (droppableIdStart === droppableIdEnd) {
                // find the list where dragged happened
//                const list = state.lists.find(list => droppableIdStart === list.id);
                const list = state.lists[droppableIdStart];
                // find the card from this list
                const card = list.cards.splice(droppableIndexStart, 1);
                // put the card in the old list
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            if (droppableIdStart !== droppableIdEnd) {
                // find the list where drag happened
                const listStart = state.lists.find(list => droppableIdStart === list.id);
                // find the card from this list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                // find the list where drag ended
                const listEnd = state.lists.find(list => droppableIdEnd === list.id);
                // put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }
            return newState;
        default:
            return state;
    }
};

export default listReducer;