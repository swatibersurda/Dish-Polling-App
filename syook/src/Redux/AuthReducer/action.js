import axios from "axios";
import * as Types from "./actionType";

export const LoginUser = (payload) => (dispatch, getState) => {

    dispatch({ type: Types.LOGIN_USER_REQUEST })
    return axios.post(" http://localhost:8080/userjson", payload).then((res) => {
        dispatch({ type: Types.LOGIN_USER_SUCESS, payload: res.data})
        return Types.LOGIN_USER_SUCESS
    }).catch((err) => {
         dispatch({ type: Types.LOGIN_USER_FAILURE })
         return Types.LOGIN_USER_FAILURE
    })



}