import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Redux/AuthReducer/action";

export const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch=useDispatch();
    const store=useSelector((state)=>state.AuthReducer.userRegistered);
    console.log(store);
    console.log(name, password);

    const handleData=(e)=>{
        e.preventDefault();
        let payload;
        if(name && password){
              payload={
                   name,password
              }
        }
        dispatch(LoginUser(payload))
    }

    return (
        <div>
            <form onSubmit={handleData}>
                <div>
                    <div>
                        <label>enter userName</label>
                    </div>
                    <div>
                        <input type={"text"} value={name} onChange={(e) =>setName(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>enter Password</label>
                    </div>
                    <div>
                        <input type={"password"} value={password} onChange={(e) =>setPassword(e.target.value)} />
                    </div>
                </div>
                <input type={"submit"}/>
            </form>
        </div>
    )
}