import { useSelector } from "react-redux"
import { NavBar } from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { EditPage } from "./EditPage";
import { FinalResultPage } from "./FinalResultPage";

export const ResultPage = () => {
    const data = useSelector((state) => state.AppReducer.data);
    const user = useSelector((state) => state.AuthReducer.currentUser);
    const [savedUserRank, setSavedUserRank] = useState(JSON.parse(localStorage.getItem('polledData')) || []);
    // a usestate for seeing users choice so we can itrate over it because you need to iterate over it so first need to get in useeFFECT AND STORE IN FORM 
    // OF ARRAY INSIDE USERSCHOICE.
    const [userChoice, setUsersChoice] = useState([]);
    const [final, setFinal] = useState();
    const [toppedRanked, setTopedRanked] = useState();
    const [desending, setDesendin] = useState();
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

    useEffect(() => {
        //   an empty object where we will put here so that we can add the key value and add it up.
        const met = {};
        if (savedUserRank.length > 0) {
            savedUserRank.map((item) => {
                let keyss = Object.keys(item);
                for (const [key, value] of Object.entries(item)) {
                    var keyy = key;
                    if (keyy !== "id") {
                        if (met[keyy] === undefined) {
                            met[keyy] = value
                        }
                        else {
                            met[keyy] = met[keyy] + value;
                        }
                    }
                }
            })

            setTopedRanked(met);

            // console.log("sortable", sortable);

        }
        // if user edit do render again and if the data is changed on polledData array.
    }, [savedUserRank])

    useEffect(() => {
        if (toppedRanked) {
            // sortable is a array.
            let sortable = [];
            for (var key in toppedRanked) {
                sortable.push([key, toppedRanked[key]]);
            }
            sortable.sort(function (a, b) {
                return b[1] - a[1];
            });
            // console.log("sortable", sortable);/
            setDesendin(sortable);
        }
    }, [toppedRanked])

    useEffect(() => {

        let choice = JSON.parse(localStorage.getItem("userChoice"));
        let arr = [];
        for (let key in choice) {
            if (key !== 'id') {
                // {id:1,lasgna:30:fish:20} need to store only dishes name that is the reason not taken id
                arr.push(key);
            }

        }
        setUsersChoice(arr);

    }, [desending])

    useEffect(() => {
        let arr = [];

        if (desending && userChoice) {
            for (let i = 0; i < desending.length; i++) {
                let flag = false;
                for (let j = 0; j < userChoice.length; j++) {
                    if (desending[i][0] === userChoice[j]) {
                        arr.push([desending[i][0], desending[i][1], "your choice"])
                        flag = true;
                        break;
                    }
                    else {
                        flag = false;
                        continue
                    }
                }
                if (!flag) {
                    arr.push([desending[i][0], desending[i][1]])
                }

            }

        }

        setFinal(arr);
    }, [desending, userChoice])




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
                        {/* third rank div  */}
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
                    <div className="polledResults"> 
                                     
                    {final && final.map((item) => {
                        
                        return <h1 key={item[0]}>{item[0]}{item[1]}{item[2]}</h1>
                    })}
                    



                </div>

            </div>
        </div>
    )
}