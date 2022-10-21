import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
export const FinalResultPage=()=>{
    const [savedUserRank, setSavedUserRank] = useState(JSON.parse(localStorage.getItem('polledData')) || []);
    const [userChoice, setUsersChoice] = useState([]);
    const [final, setFinal] = useState();
    const [toppedRanked, setTopedRanked] = useState();
    const [desending, setDesendin] = useState();
   
    useEffect(() => {
        //   an empty object where we will put here so that we can add the key value and add it up.
        const met = {};
        if (savedUserRank.length > 0) {
            savedUserRank.map((item) => {
                let keyss = Object.keys(item);
                for (const [key, value] of Object.entries(item)) {
                    let keyy = key;
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

            
        }
        // if user edit do render again and if the data is changed on polledData array.
    }, [savedUserRank])

    useEffect(() => {
        if (toppedRanked) {
            // sortable is a array.
            let sortable = [];
            for (let key in toppedRanked) {
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
                var flag = false;
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

    return(
        <div className="polledResults">

        {final && final.map((item) => {
            // return {item[2]==true?<h1>{item[0]}{item[1]}</h1>:<h1>{item[0]}{item[1]}</h1>}
            return <h1 key={item[0]}>{item[0]}{item[1]}{item[2]}</h1>
        })}
    </div>
    )
}