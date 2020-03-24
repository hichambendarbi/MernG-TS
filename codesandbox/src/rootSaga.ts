// import axios from 'axios';
import { put, all, call } from 'redux-saga/effects';
// import * as actions from './actions'
import { GET_USER_SUCCESS } from './constants/index';


export function* apiGetUser() {
  const getRequest = {
    query: `
    query{
      users{
        name
        email
      }
    }
      `
}

try {

  let response: any =  yield fetch('http://localhost:9000/',
  {
    method:'POST',
    body: JSON.stringify(getRequest),
    headers:{
        'Content-Type' : 'application/json'
    }
  })

  console.log(response)
 
  yield put({type: GET_USER_SUCCESS, users: response.data });
}
 catch (err) {
  // yield put(actions.getUserFail('COULD NOT GET USER'));
  yield console.log(err);
}
}


// Get user test
export function* getUser() {



    try {

    let response : any = yield call(apiGetUser);
    yield put({type: GET_USER_SUCCESS, users: response.data });

    } catch(err) {
     yield console.log("test",err);
    }
  }

// Our worker Saga: will perform the async increment task
export function* helloSaga() {
  //  yield call(delay, 1000);
  // tslint:disable-next-line:no-console
  console.log('Hello Sagas!');
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    getUser()
  ]);
}