import {ADD_LIST_SUCCESS, GET_LISTS, MOVE_LIST, SAVE_LISTS_SUCCESS} from "./types";
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrCookieName = 'csrftoken';

// export const moveList = (listIdStart, listIdEnd, listIndexStart, listIndexEnd) => async (dispatch) => {
//     console.log(listIdStart, listIdEnd, listIndexStart, listIndexEnd)
//     try {
//         // Make API call to update list position
//         await axios.patch(`/api/lists/${listIdStart}/`, {
//             position: listIndexEnd
//         });
//         await axios.patch(`/api/lists/${listIdEnd}/`, {
//             position: listIndexStart
//         });
//
//         // Dispatch action to update state with the moved list
//         dispatch(moveListSuccess(listIdStart, listIdEnd, listIndexStart, listIndexEnd));
//     } catch (error) {
//         console.log(error);
//     }
// };

export const getLists = () => async (dispatch) => {
    try {
        const result = await axios.get('/api/lists/');
        dispatch({
            type: GET_LISTS, payload: result.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const addList = (title) => async (dispatch) => {
    try {
        const {data} = await axios.post('/api/lists/', {title: title});
        dispatch(addListSuccess(data));
    } catch (error) {
        console.error(error);
    }
};