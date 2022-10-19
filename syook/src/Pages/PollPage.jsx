import { NavBar } from "./NavBar"
import { getData } from "../Redux/AppReducer/action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Card } from "./Card";
import { useState } from "react";
import { storeUser } from "../Redux/AppReducer/action";
export const PollPage = () => {
    const data = useSelector((state) => state.AppReducer.data);
    const user=useSelector((state)=>state.AuthReducer.currentUser);
    const [rankOne, setRankOne] = useState("");
    const [rankTwo, setRankTwo] = useState("");
    const [rankThree, setRankThree] = useState("");
    const dispatch = useDispatch();
    console.log(rankOne,rankTwo,rankThree);
    console.log(user,"currentuser")
    
   
    
    useEffect(() => {
        if (data.length === 0) {
            dispatch(getData())
        }
        
    }, [data.length])
    //  storing here whole user details..........
    const handleData=()=>{
    //   here storing first user selected rank and userid on local storage so that can access on next page otherwise after
    // refresh it will be wipe off
       let arr= JSON.parse(localStorage.getItem('PolledData'))||[];
        let userSelectedData={};

        if(rankOne && rankTwo && rankThree && user){
            // {[dyanmicKey]: val}
            userSelectedData={
                id:user.id,
               [rankOne]:30,
               [rankTwo]:20,
               [rankThree]:10,
            }  
            console.log(rankOne,rankTwo,rankThree,user);
            arr.push(userSelectedData);
            localStorage.setItem("PolledData",JSON.stringify(arr))
        }
       
    //   NAVIGATE USER TO 
          
   

    }


  

 

    return (
        <div>
            <NavBar />
            <div className="parentDiv">
                <div className="polldiv">
                    <h1>Poll for Top 3 Dishes </h1>
                    {/* FIRST SELECT OR FIRST RANK */}
                    <div id="firstRank">
                        <select onChange={(e)=>setRankOne(e.target.value)}>
                            <option>SELECT_First_RANK</option>
                            {data.length > 0 && data.map((item) => {
                               
                                return <option value={item.dishName}>{item.dishName}</option>
                            })}
                        </select>
                    </div>
                    {/* second rank div */}
                    <div id="secondRank">
                        <select onChange={(e)=>{setRankTwo(e.target.value)}}>
                            <option value={"none"}>SELECT-SECOND-RANK</option>
                            {data.length > 0 && data.map((item) => {
                                return <option value={item.dishName}>{item.dishName}</option>
                            })}
                        </select>
                    </div>
                    {/* third rank div */}
                    <div id="thirdRank">
                        <select onChange={(e)=>{setRankThree(e.target.value)}}>
                            <option value={"none"}>SELECT-THIRD-RANK</option>
                            {data.length > 0 && data.map((item) => {
                                return <option value={item.dishName}>{item.dishName}</option>
                            })}
                        </select>
                    </div>
                    {/* after submitting it should store the data on local storage*/}
                    <button onClick={handleData} >Submit Your Poll</button>


                </div>
                <div className="apiDiv">
                    {data.length > 0 && data.map((item) => {
                        return <div key={item.id}><Card item={item} /></div>
                    })}
                </div>

            </div>



        </div>
    )
}