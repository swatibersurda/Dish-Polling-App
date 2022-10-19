import { useSelector } from "react-redux"
import { NavBar } from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";

export const ResultPage = () => {
    // first get the data from the store
    const data = useSelector((state) => state.AppReducer.data);
    const user = useSelector((state) => state.AuthReducer.currentUser);
    // here getting data from localstorage so that we can find user and edit it.
    const [savedUserRank,setSavedUserRank]=useState( JSON.parse(localStorage.getItem('PolledData')));
    // A USESTATE FOR SHOWING TOP RANKED IN DESCENDING ORDER.
    const [toppedRanked,setTopedRanked]=useState([]);
    const [rankOne, setRankOne] = useState("");
    const [rankTwo, setRankTwo] = useState("");
    const [rankThree, setRankThree] = useState("");
    console.log(savedUserRank,"localstoragedat")
    console.log(toppedRanked,"unn")

    const handleData = (e) => {
        e.preventDefault();
        // console.log(rankOne, rankTwo, rankThree, "kkkkkk");
        // here using filter we will find user based on his/her id and try to edit it.
        if(savedUserRank && user){
            var savedData=[];
          const x=savedUserRank.filter((item)=>{
                if(item.id===user.id){
                    // if that paticular user found then please edit it and store it inside savedData array.
                    // console.log("hii")
                    let  userSelectedData;
                    userSelectedData = {
                        id: user.id,
                        [rankOne]: 30,
                        [rankTwo]: 20,
                        [rankThree]: 10,
                    }
                    savedData.push(userSelectedData)

                }
                else{
                    // if that is not user which we are seraching for please pushn inside savedData so that we can store 
                    // it inside local storage.
                    savedData.push(item);
                }
            })
        
           localStorage.setItem("PolledData",JSON.stringify(savedData))
           
        }
        var x=JSON.parse(localStorage.getItem("PolledData"));
        setSavedUserRank(x);
    }
    useEffect(()=>{
        const uniqueKey={};
        const keys=[];
        const value=[];
       
        if(savedUserRank.length>0){
            savedUserRank.map((item)=>{
                
                let keyss=Object.keys(item);
                
                // FORLOOP ON KEEYS SO WE CAN FIND THE UNIQUE KEY
                keyss.map((item)=>{
                 keys.push(item);
                   
                })
            
                let val=Object.values(item);
                // console.log(val);
                val.map((item)=>{
                    value.push(item);
                      
                   })
            })
        }
        // console.log(keys);
        // console.log(value);
    //    console.log(uniqueKey,"uniquekeyy")
      for(var i=0;i<keys.length;i++){
        let x=keys[i];
        if(uniqueKey[x]===undefined){
            uniqueKey[x]=value[i];
        }
        else{
            uniqueKey[x]=uniqueKey[x]+value[i]
        }
      }
    // console.log(uniqueKey,"kkk")
    
    setTopedRanked(uniqueKey)
    if(toppedRanked){
        toppedRanked.sort((a,b)=>{
            
        })
    }
    },[])
   

   return (
        <div>
            {/* nav bar placeing */}
            <NavBar />
            <div className="resultParentDiv">
                <div className="editPollPage">
                    <form onSubmit={handleData}>
                        <div id="firstRank">
                            <select onChange={(e) => setRankOne(e.target.value)}>
                                <option>SELECT_First_RANK</option>
                                {data.length > 0 && data.map((item) => {

                                    return <option value={item.dishName}>{item.dishName}</option>
                                })}
                            </select>
                        </div>
                        {/* second rank div */}
                        <div id="secondRank">
                            <select onChange={(e) => { setRankTwo(e.target.value) }}>
                                <option value={"none"}>SELECT-SECOND-RANK</option>
                                {data.length > 0 && data.map((item) => {
                                    return <option value={item.dishName}>{item.dishName}</option>
                                })}
                            </select>
                        </div>
                        {/* third rank div */}
                        <div id="thirdRank">
                            <select onChange={(e) => { setRankThree(e.target.value) }}>
                                <option value={"none"}>SELECT-THIRD-RANK</option>
                                {data.length > 0 && data.map((item) => {
                                    return <option value={item.dishName}>{item.dishName}</option>
                                })}
                            </select>
                        </div>
                        <input type={"submit"} value="Edit Your Submission" />
                    </form>

                </div>
                <div className="polledResults">
                
                </div>

            </div>
        </div>
    )
}