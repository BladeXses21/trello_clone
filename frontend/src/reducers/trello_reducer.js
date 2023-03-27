import { ADD_CARD_REQUEST, ADD_CARD_FAIL, ADD_CARD_SUCCESS, ADD_LIST, DRAG_HAPPENED, GET_LISTS, GET_CARDS,
ADD_CARD_LISTS_FAIL, ADD_CARD_LISTS_SUCCESS, ADD_CARD_LISTS_REQUEST} from '../actions/types';
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
            console.log(action.payload, 'payload get lists');
            return {
                ...state,
                lists: action.payload,
            };
        case ADD_LIST:
            const newList = {
                title: action.payload.title,
                cards: [],
                id: `list-${listID}`
            };
            listID += 1
            console.log(action.payload, 'payload add list');
            return { ...state, lists: [...state.lists, newList] };
        case ADD_CARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_CARD_SUCCESS:
        const { card, listId } = action.payload;
        return {
            ...state,
            lists: state.lists.map((list) => {
            if (list.id === listId) {
                // знаходимо індекс списку за його id
                const listIndex = state.lists.findIndex((list) => list.id === listId);
                // додаємо карточку до списку за індексом
                const updatedList = {
                    ...list,
                    cards: list.cards.concat(card),
                };
                // повертаємо новий масив списків з оновленим списком
                return [
                  ...state.lists.slice(0, listIndex),
                  updatedList,
                  ...state.lists.slice(listIndex + 1),
                ];
                } else {
                    return list;
                }
            }),
        };
        case ADD_CARD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_CARD_LISTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_CARD_LISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: [...state.lists, action.payload]
            };
        case ADD_CARD_LISTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
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
                return state;
            }

            // in the same list
            if (droppableIdStart === droppableIdEnd) {
            // find the list where dragged happened
            const list = state.trello.find(list => list.id === droppableIdStart);
            // find the card from this list
            const card = list.cards.splice(droppableIndexStart, 1);
            // put the card in the old list
            list.cards.splice(droppableIndexEnd, 0, ...card);
        }
        if (droppableIdStart !== droppableIdEnd) {
            // find the list where drag happened
            const listStart = state.trello.find(list => list.id === droppableIdStart);
            // find the card from this list
            const card = listStart.cards.splice(droppableIndexStart, 1);
            // find the list where drag ended
            const listEnd = state.trello.find(list => list.id === droppableIdEnd);
            // put the card in the new list
            listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        }
            return newState;
        default:
            return state;
    }
};

export default listReducer;