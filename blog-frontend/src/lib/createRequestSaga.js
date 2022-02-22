import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function*(action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      console.log(response); 
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}

/* 
import {call, put} from 'redux-saga/effects';
import {startLoading, finishLoading} from '../modules/loading';

export const createRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    // generator function 중간에 멈출 수 있는 함수 -> 일반 함수는 끝까지 가거나 중간에 throwing되어야한다. 
    // 호출한 부분에서 직접 next()를 사용하면서 yield까지 작동함
    // 지금 함수는 
    /*
    const fun = createRequestSaga(a, b); 
    fun.next() => 로딩시작
    fun.next() => 성공 - CALL request, action, fun.next() => PUT SUCCESS
               => 실패 - PUT FAILURE 
    fun.next() => put finishLoading function
    
    return function*(action) {
        yield put(startLoading(type)); // 로딩시작
        try {
            const response = yield call(request, action.payload);
            console.log(action.payload); 
            console.log(response);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); 
    };
}
*/