import {ADD_CARD_REQUEST, ADD_CARD_FAIL, ADD_CARD_SUCCESS, GET_CARDS_FAIL, GET_CARDS_REQUEST, GET_CARDS_SUCCESS, MOVE_CARD} from '../actions/types';

let cardID = 1;

const initialState = {
    loading: false,
    error: null,
    cards: []
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                cards: [...state.cards, action.payload.card],
            };
        case ADD_CARD_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case GET_CARDS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_CARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                cards: action.payload
            };
        case GET_CARDS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MOVE_CARD: {
            const { cardID, listID, position } = action.payload;
            const cards = state.cards.map((card) => {
                if (card.id === cardID) {
                    return { ...card, listID, position };
                }
                return card;
            });
            return { ...state, cards };
        }
        default:
            return state;
    }
}

export default cardReducer;