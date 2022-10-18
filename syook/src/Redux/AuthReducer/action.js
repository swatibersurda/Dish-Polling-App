import * as Types from "./actionType";

export const LoginUser = (payload) => (dispatch, getState) => {
    console.log("lo",payload)
    dispatch({ type: Types.LOGIN_USER_REQUEST })
    dispatch({ type: Types.LOGIN_USER_SUCESS, payload: payload })
    dispatch({ type: Types.LOGIN_USER_FAILURE })

}