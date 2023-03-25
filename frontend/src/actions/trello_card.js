import { ADD_CARD, GET_CARDS } from "./types";
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';

//export const addCard = (listID, text) => {
//    return {
//        type: ADD_CARD,
//        payload: { text, listID }
//    };
//};

export const getCards = () => dispatch => {
    axios.get('api/cards/')
        .then(result => {
            dispatch({
                type: GET_CARDS,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

export const addCard = (card) => {
    axios.post(`api/cards/`, card)
        .then(result => {
            dispatch({
                type: ADD_CARD,
                payload: result.data
            });
        }).catch(error = console.log(error));
}