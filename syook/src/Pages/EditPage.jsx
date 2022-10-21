import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
export const EditPage = () => {

    const data = useSelector((state) => state.AppReducer.data);
    const user = useSelector((state) => state.AuthReducer.currentUser);
    const [savedUserRank, setSavedUserRank] = useState(JSON.parse(localStorage.getItem('polledData')) || []);
    // a usestate for seeing users choice so we can itrate over it because you need to iterate over it so first need to get in useeFFECT AND STORE IN FORM 
    // OF ARRAY INSIDE USERSCHOICE.
    const [rankOne, setRankOne] = useState("");
    const [rankTwo, setRankTwo] = useState("");
    const [rankThree, setRankThree] = useState("");
    const handleData = (e) => {
        e.preventDefault();

        // here using filter we will find user based on his/her id and try to edit it.
        if (savedUserRank && user) {
            let savedData = [];
            let userChoice = {};
            const x = savedUserRank.filter((item) => {
                if (item.id === user.id) {
                    // if that paticular user found then please edit it and store it inside savedData array.
                    // console.log("hii")
                    let userSelectedData = {};
                    userSelectedData = {
                        // here with because
                        id: user.id,
                        [rankOne]: 30,
                        [rankTwo]: rankOne === rankTwo ? 30 : 20,
                        [rankThree]: rankThree === rankOne ? 30 : rankTwo === rankThree ? 20 : 10,
                    }
                    console.log(userSelectedData,"user")
                    savedData.push(userSelectedData)
                    // here setting user's edited choice on ls
                    localStorage.setItem("userChoice", JSON.stringify(userSelectedData))

                }
                else {
                    // if that is not user which we are seraching for please pushn inside savedData so that we can store 
                    // it inside local storage.
                    savedData.push(item);
                }
            })

            localStorage.setItem("polledData", JSON.stringify(savedData))

        }
        var x = JSON.parse(localStorage.getItem("polledData")) || savedUserRank;
        setSavedUserRank(x);
    }
  console.log(savedUserRank,"oneditO")
   
    return (


        <div className="editPollPage">
            <form onSubmit={handleData}>
                <div id="firstRank">
                    <select onChange={(e) => setRankOne(e.target.value)}>
                        <option>SELECT_First_RANK</option>
                        {data.length > 0 && data.map((item) => {

                            return <option key={item.id} value={item.dishName}>{item.dishName}</option>
                        })}
                    </select>
                </div>
                {/* second rank div */}
                <div id="secondRank">
                    <select onChange={(e) => { setRankTwo(e.target.value) }}>
                        <option value={"none"}>SELECT-SECOND-RANK</option>
                        {data.length > 0 && data.map((item) => {
                            return <option key={item.id} value={item.dishName}>{item.dishName}</option>
                        })}
                    </select>
                </div>
                {/* third rank div */}
                <div id="thirdRank">
                    <select onChange={(e) => { setRankThree(e.target.value) }}>
                        <option value={"none"}>SELECT-THIRD-RANK</option>
                        {data.length > 0 && data.map((item) => {
                            return <option key={item.id} value={item.dishName}>{item.dishName}</option>
                        })}
                    </select>
                </div>
                <input type={"submit"} value="Edit Your Submission" />
            </form>

        </div>


    )
}