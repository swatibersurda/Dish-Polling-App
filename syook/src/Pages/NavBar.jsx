import { Link } from "react-router-dom"
import "../style/style.css"
export const NavBar = () => {
    return (

        <nav className="navBar">
            <ul>
                <li><Link to="/pollpage">PollePage</Link></li>
                <li><Link to="/resultpage">ResultPage</Link></li>
            </ul>
        </nav>

    )
}