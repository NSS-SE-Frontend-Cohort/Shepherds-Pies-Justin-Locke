import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNavBar = () => {
    const navigate = useNavigate()

    return <>
    <ul className="navbar">
    <li className="navbar-item">
            <Link 
            className="nabar-link"
            to={"/"}>
                Home
            </Link>
        </li>
        <li className="navbar-item">
            <Link 
            className="nabar-link"
            to={"/orders"}>
                Orders
            </Link>
        </li>
        <li className="navbar-item">
            <Link 
            className="nabar-link"
            to={"/orders/create"}>
                New Order
            </Link>
        </li>

        {localStorage.getItem("shepherd_pie_user") ? (
        <li className="navbar-item navbar-logout">
            <Link
            className="navbar-link"
            to=""
            onClick={() => {
                localStorage.removeItem("shepherd_pie_user")
                navigate("/", { replace: true })
            }}
            >
            Logout
            </Link>
        </li>
        ) : (
        ""
        )}
    </ul>
    </>
}