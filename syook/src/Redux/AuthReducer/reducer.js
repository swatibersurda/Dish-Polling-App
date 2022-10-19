import * as Types from "./actionType";
const initialState = {
    
    isLoading: false,
    isError: false,
    currentUser:{}

}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_USER_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }

        case Types.LOGIN_USER_SUCESS: {
            return {
                ...state,
               
                currentUser:action.payload,
                isLoading: false
            }
        }
    

    case Types.LOGIN_USER_FAILURE: {
        return {
            ...state,
           isError:true
        }
    }
    default:
        return state
}


}