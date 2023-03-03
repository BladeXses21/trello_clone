import { ADD_CARD, ADD_LIST } from '../actions/types';

let listID = 2;
let cardID = 4;

const initialState = [
    {
        title: 'First Title',
        id: 0,
        cards: [
            {
                id: 0,
                text: 'first text',
            },
            {
                id: 1,
                text: 'second text',
            }
        ]
    },
    {
        title: 'Second Title',
        id: 1,
        cards: [
            {
                id: 2,
                text: 'second text',
            },
            {
                id: 3,
                text: 'second text',
            }
        ]
    }
];

const listReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: listID
            };
            listID += 1
            return [...state, newList];
        case ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: cardID
            };
            cardID += 1;
            console.log("action received", action);

            const newState = state.map(list => {
                if(list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    };
                } else {
                    return list;
                }
            });
            return newState;

        default:
            return state;
    }
};

export default listReducer;