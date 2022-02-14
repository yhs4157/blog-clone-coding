import {createAction, handleActions} from 'redux-actions';
import produce from 'immer'; 
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';
import {takeLatest} from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// 필요한 부분을 쉽게 만들기 위해서 이렇게 한 것이지 위의 CHANGE_FIELD, INITIALIZE_FORM 과는 다를게 없음. 
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    "auth/REGISTER",
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    "auth/LOGIN",
);


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

export const register = createAction(REGISTER, ({username, password}) => ({
    username, 
    password,
}));

export const login = createAction(LOGIN, ({username, password}) => ({
    username, 
    password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register); 
const loginSaga = createRequestSaga(LOGIN, authAPI.login); 
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

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
    auth: null,
    authError: null,
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
        authError: null,
     }),
     [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
         ...state, 
         authError: null,
         auth,
     }),
     [REGISTER_FAILURE]: (state, {payload: error}) => ({
         ...state,
         authError: error,
     }),
     [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
         ...state, 
         authError: null,
         auth,
     }),
     [LOGIN_FAILURE]: (state, {payload: error}) => ({
         ...state,
         authError: error,
     }),
    },
    initialState,
);

export default auth; 