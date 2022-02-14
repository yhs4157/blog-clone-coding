import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'; 

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// login, register 선택
export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form, // register, login
        key, // username, password, passworConfirm
        value, // 변경값
    }),
);

// form 내용 초기화
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
};

const auth = handleActions(
    {
    [CHANGE_FIELD]: (state, {payload: {form, key, value} }) => // 할당
        produce(state, draft =>{
            draft[form][key] = value; 
        }),
    [INITIALIZE_FORM]: (state, {payload: form}) => ({ // 초기화
        ...state,
        [form]: initialState[form],
     }),
    },
    initialState,
);

export default auth; 