import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Redux/AuthReducer/action";
import { LOGIN_USER_SUCESS } from "../Redux/AuthReducer/actionType";

export const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch=useDispatch();
    const store=useSelector((state)=>state.AuthReducer.userRegistered);
    const user=useSelector((state)=>state.AuthReducer. currentUser);
    const navigate=useNavigate();
    // console.log(store);
    // console.log(name, password);
    // console.log(user,"LGINAGE")

    const handleData=(e)=>{
        e.preventDefault();
        let payload;
        if(name && password){
              payload={
                   name,password
              }
              dispatch(LoginUser(payload)).then((res)=>{
           
                if(res===LOGIN_USER_SUCESS){
                    navigate("/pollpage",{replace:true})
                }
            })
        }
        
       
    }

    return (
        <div>
            <form onSubmit={handleData}>
                <div>
                    <div>
                        <label>enter userName</label>
                    </div>
                    <div>
                        <input type={"text"} value={name} onChange={(e) =>setName(e.target.value)} required />
                    </div>
                </div>
                <div>
                    <div>
                        <label>enter Password</label>
                    </div>
                    <div>
                        <input type={"password"} value={password} onChange={(e) =>setPassword(e.target.value)} required />
                    </div>
                </div>
                <input type={"submit"}/>
            </form>
        </div>
    )
}