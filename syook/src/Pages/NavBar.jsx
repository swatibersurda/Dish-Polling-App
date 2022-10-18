import { Link } from "react-router-dom"
import "../style/style.css"
export const NavBar = () => {
    return (
        <div id="navbardiv">
            <ul>
                <li><Link to={"/pollpage"}>PollPage</Link></li>
                <li> <Link to="/resultpage">ResultPage</Link> </li>
            </ul>

        </div>
    )
}