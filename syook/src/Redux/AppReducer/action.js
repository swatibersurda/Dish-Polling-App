import * as Types from "./actionType";
import axios from "axios";
export const getData=()=>(dispatch)=>{
    dispatch({type:Types.GET_DATA_REQUEST})
    return axios.get("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json").then((res)=>{
        console.log(res.data)
        dispatch({type:Types.GET_DATA_SUCESS,payload:res.data})
    }).catch((err)=>{
        dispatch({type:Types.GET_DATA_FAILURE})
    })
}


export const storeUser=(payload)=>(dispatch)=>{
    // console.log(payload,"userstore")
    dispatch({type:Types.STORED_USER_RANK,payload:payload})
}
