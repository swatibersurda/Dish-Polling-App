import * as Types from "./actionType";
const initialState={
    data:[],
    isLoading:false,
    isError:false
}
export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case Types.GET_DATA_REQUEST:{
            return{
                ...state,
                isLoading:true
            }
        }
        case Types.GET_DATA_SUCESS:{
            return{
                ...state,
                data:action.payload,
                isLoading:false
            }
        }
        case Types.GET_DATA_FAILURE:{
            return{
                ...state,
                isError:true
               
                
            }
        }
       
        default:
            return state
    }
}