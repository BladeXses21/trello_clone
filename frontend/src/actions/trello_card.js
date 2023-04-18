import {ADD_CARD_REQUEST, ADD_CARD_FAIL, ADD_CARD_SUCCESS, GET_CARDS_SUCCESS, GET_CARDS_REQUEST, GET_CARDS_FAIL, MOVE_CARD} from "./types";
import axios from 'axios';

axios.defaults.xsrHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';


export const moveCards = (cardID, listID, position) => ({
    type: MOVE_CARD, payload: {
        cardID, listID, position,
    },
});

export const addCardRequest = (name) => {
    return {
        type: ADD_CARD_REQUEST, payload: {
            name: name, description: "", icon: "", date: new Date().ISOString, comment: ""
        }
    };
};

export const addCardSuccess = (card) => {
    return {
        type: ADD_CARD_SUCCESS, payload: {
            card: card
        }
    };
};

export const addCardFail = (error) => {
    return {
        type: ADD_CARD_FAIL, payload: {
            error: error
        }
    };
};

export const getCardsFail = (error) => {
    return {
        type: GET_CARDS_FAIL, payload: {
            error: error
        }
    };
};

export const addNewCard = (title, listID) => async (dispatch) => {
    const description = 'null';
    const icon = 'https://example.com/icon.png';
    const date = new Date().toISOString();
    const position = 0;
    const comment = 'null';

    try {
        const {data} = await axios.post('/api/cards/', {
            name: title, list: listID, description: description, icon: icon, date: date,
            position: position, comment: comment
        });
        dispatch(addCardSuccess(data))
    } catch (error) {
        const errorMessage = error.message;
        dispatch(addCardFail(errorMessage))
    }
}

export const getCards = () => dispatch => {
    dispatch({
        type: 'GET_CARDS_REQUEST',
    });
    axios.get(`/api/cards/`)
        .then(response => {
            dispatch({
                type: 'GET_CARDS_SUCCESS', payload: response.data
            });
        })
        .catch(error => {
            const errorMessage = error.message;
            dispatch({
                type: 'GET_CARDS_FAILURE', payload: errorMessage
            });
        });
}