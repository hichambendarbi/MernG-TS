// import axios from 'axios';
import { put, all, call, fork, takeEvery } from "redux-saga/effects";
// import * as actions from './actions'
import { GET_USER_SUCCESS, GET_USER } from './constants/index';

// async function callApi(data: any) {
//   const res = await fetch("http://localhost:9000/graphql", {
//     method : "post",
//     mode : "no-cors",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   return res.json()
// }

// Get user test
export function* getUser() {
  const getRequest = {query: `query{ users{ name email }} `};


  try {
    const response: any = yield call(fetch, "http://localhost:9000/graphql", {
      method : "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getRequest)
    });

    if (!response) {
      yield console.log(response);
    } else {
      yield put({ type: GET_USER_SUCCESS, users: response.data });
    }
  } catch (err) {
    // yield put(actions.getUserFail('COULD NOT GET USER'));
    yield console.log(err);
  }
}

// Our worker Saga: will perform the async increment task
export function* helloSaga() {
  //  yield call(delay, 1000);
  // tslint:disable-next-line:no-console
  // console.log("Hello Sagas!"); ??????????????? hna kan 3andak el ghalat a chef 
  yield takeEvery(GET_USER, getUser) // @ERROR : hna katgoleeh fe ay action GET_USER fetchi liya el user
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([fork(helloSaga)/* , getUser()  */]); // @ERROR : hna get user ma3andeha 7ta 3ala9a khasseha tkon fe helloSage plus nta ma forkitich 
}
