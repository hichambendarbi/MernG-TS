import {GET_USER_SUCCESS} from '../constants/index';
const initialState = {
  users: []
}
export default function (state = initialState, action: any) {
    const {type, payload} = action;
 switch (type) {
    case GET_USER_SUCCESS:
    return {
      ...state,
      users: payload
    };
  default:
    return state;
  }
}