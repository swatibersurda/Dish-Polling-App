import { Link } from "react-router-dom"
import "../style/style.css"
export const NavBar = () => {
    return (

        <nav className="navBar">
            <Link to="/">Login</Link>
            <Link to="/pollpage">PollePage</Link>
            <Link to="/resultpage">ResultPage</Link>

        </nav>

    )
}