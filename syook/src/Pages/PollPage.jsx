import { NavBar } from "./NavBar"
import { getData } from "../Redux/AppReducer/action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { Card } from "./Card";
import { useState } from "react";
import { storeUser } from "../Redux/AppReducer/action";
import { useNavigate } from "react-router-dom";
export const PollPage = () => {
    const data = useSelector((state) => state.AppReducer.data);
    const user = useSelector((state) => state.AuthReducer.currentUser);
    const [rankOne, setRankOne] = useState("");
    const [rankTwo, setRankTwo] = useState("");
    const [rankThree, setRankThree] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data.length === 0) {
            dispatch(getData())
        }

    }, [data.length])
    //  storing here whole user details..........
    const handleData = (e) => {
        e.preventDefault();
        //   here storing first user selected rank and userid on local storage so that can access on next page otherwise after
        // refresh it will be wipe off
        let arr = JSON.parse(localStorage.getItem('polledData')) || [];
        let userSelectedData = {};
        // let userChoice={};

        if (rankOne && rankTwo && rankThree && user) {
            // {[dyanmicKey]: val}
            userSelectedData = {
                id: user.id,
                [rankOne]: 30,
                [rankTwo]: rankOne === rankTwo ? 30 : 20,
                [rankThree]: rankThree === rankOne ? 30 : rankTwo === rankThree ? 20 : 10,
            }
            // console.log(rankOne, rankTwo, rankThree, user);
            arr.push(userSelectedData);
            localStorage.setItem("polledData", JSON.stringify(arr))
            // this to make users choice so we can refleact it on the page.
            localStorage.setItem("userChoice", JSON.stringify(userSelectedData))
        }

        //   NAVIGATE USER TO resultpage
        navigate("/resultpage", { replace: true });
    }
    return (
        <div>
            <NavBar />
            <div className="parentDiv">
                <div className="pollDiv">
                    <p className="headingPollPage">Poll for Top 3 Dishes </p>
                    {/* FIRST SELECT OR FIRST RANK */}
                    <form onSubmit={handleData}>
                        <div id="firstRank">
                            <select onChange={(e) => setRankOne(e.target.value)}>
                                <option>SELECT-FIRST-RANK</option>
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

                        <input className="selctInputPollpage" type={"submit"} value="Your Submission"/>
                    </form>
                </div>
                <div className="apiDiv">
                    {data.length > 0 && data.map((item) => {
                        return <Card item={item} key={item.id} />
                    })}
                </div>

            </div>



        </div>
    )
}