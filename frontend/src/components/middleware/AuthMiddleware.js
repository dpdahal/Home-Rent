import {Navigate, Outlet} from "react-router-dom";
import "../../assets/css/AdminStyle.css";
import "../../assets/bootstrap-icons/bootstrap-icons.css";


function AuthMiddleware() {
    const isLogged = localStorage.getItem("token");
    return isLogged ? <Outlet/> : <Navigate to=""/>;
}

export default AuthMiddleware;