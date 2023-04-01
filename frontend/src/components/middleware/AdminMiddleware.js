import {Navigate, Outlet} from "react-router-dom";

function AdminMiddleware() {
    const isLogged = window.user.role === 'admin';
    return isLogged ? <Outlet/> : <Navigate to=""/>;
}

export default AdminMiddleware;