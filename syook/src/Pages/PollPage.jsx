import { NavBar } from "./NavBar"
import { getData } from "../Redux/AppReducer/action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Card } from "./Card";
export const PollPage=()=>{
    const data=useSelector((state)=>state.AppReducer.data);
    const dispatch=useDispatch();
    console.log(data);
    useEffect(()=>{
        if(data.length===0){
         dispatch(getData())   
        }
    },[])

    return(
        <div>
            <NavBar/>
            <div className="parentDiv">
                <div className="polldiv">

                </div>
            <div className="apiDiv">
                {data.length>0 && data.map((item)=>{
                    return <Card item={item}/>
                })}
            </div>

            </div>
          

          
        </div>
    )
}