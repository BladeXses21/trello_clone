import { ADD_CARD_REQUEST, ADD_CARD_FAIL, ADD_CARD_SUCCESS, GET_CARDS,
 ADD_CARD_LISTS_FAIL, ADD_CARD_LISTS_SUCCESS, ADD_CARD_LISTS_REQUEST} from "./types";
import axios from 'axios';

axios.defaults.xsrHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';

export const getCards = () => dispatch => {
    axios.get('/cards/')
        .then(result => {
            dispatch({
                type: GET_CARDS,
                payload: result.data
            });
        }).catch(error => console.log(error));
};

// ACTION CARD-LISTS

export const addCardListsSuccess = (cardList) => {
    return {
        type: ADD_CARD_LISTS_SUCCESS,
        payload: {
            cardList: cardList,
        },
    };
};

export const addCardListFailure = (error) => {
  return {
    type: ADD_CARD_LISTS_FAIL,
    payload: {
      error: error,
    },
  };
};

export const addCardListRequest = () => ({
    type: ADD_CARD_LISTS_REQUEST,
})

export const addCardList = (listID, cardData) => {
    return (dispatch) => {
        dispatch(addCardListRequest());

        axios.post('/cards-lists/', { card: cardData.id, list: listID })
        .then((response) => {
            const cardList = response.data;
            const card = cardList.card;
            dispatch(addCardListSuccess(cardList));
            dispatch(addCardSuccess(card, cardList.list.id));
        })
        .catch(error => {
            dispatch(addCardListFailure(error.message));
            dispatch(addCardFailure(error.message));
        });
    }
}

// ACTION ADD CARD

export const addCardRequest = () => ({
    type: ADD_CARD_REQUEST
});

export const addCardSuccess = (card, list) => ({
    type: ADD_CARD_SUCCESS,
    payload: {
        card,
        list
    },
});

export const addCardFailure = (error) => ({
    type: ADD_CARD_FAIL,
    payload: {
        error,
    },
});

export const addCard = (listId, name) => async (dispatch) => {
  try {
    const res = await axios.post('/cards/', { name });
    const card = res.data;
    dispatch({
      type: ADD_CARD,
      payload: { listId, card },
    });
    dispatch(addCardLists(listId, card.id));
  } catch (err) {
    console.log(err);
  }
};

