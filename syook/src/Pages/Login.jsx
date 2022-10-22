import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Redux/AuthReducer/action";
import { LOGIN_USER_SUCESS } from "../Redux/AuthReducer/actionType";

export const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const store = useSelector((state) => state.AuthReducer.userRegistered);
    const user = useSelector((state) => state.AuthReducer.currentUser);
    const navigate = useNavigate();

    const handleData = (e) => {
        e.preventDefault();
        let payload;
        if (name && password) {
            payload = {
                name, password
            }
            dispatch(LoginUser(payload)).then((res) => {

                if (res === LOGIN_USER_SUCESS) {
                    navigate("/pollpage", { replace: true })
                }
            })
        }

    }

    return (
        <div className="formmDiv">
            <p className="heading">Please Login Here</p>
            <form onSubmit={handleData} className="formm" >
                {/* <h1 className="heading">Please Login Here</h1> */}
                <div className="labell">  <label >Enter Name:</label></div>

                <input className="inputt" placeholder="Enter Your UserName"
                 type={"text"} value={name} onChange={(e) => setName(e.target.value)} required />
                <div className="labell"> <label>Enter Password:</label></div>

                <input className="inputt" placeholder="Enter Your Password"
                 required type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="submitForm" type={"submit"} />


            </form>
        </div>
    )
}