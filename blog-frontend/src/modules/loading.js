import {createAction, handleActions} from 'redux-actions';

const STARTING_LOADING = ""; 
const FINISH_LOADING = ""; 

export const startLoading = createAction(
    STARTING_LOADING,
    requestType => requestType,
);

export const finishLoading = createAction(
    FINISH_LOADING,
    requestType => requestType,
);

const initialState = {}; 

const loading = handleActions(
    {
        [STARTING_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state, 
            [action.payload]: false,
        }),
    },
    initialState
);

export default loading; 