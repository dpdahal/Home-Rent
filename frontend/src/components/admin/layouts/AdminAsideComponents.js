import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import React from "react";

function AdminAsideComponents() {
    const findData = useSelector((state) => state);
    let user = findData.auth.data;

    let handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    return (<aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link collapsed">
                    <i className="bi bi-grid"/>
                    Dashboard
                </Link>
            </li>
            {(() => {
                if (user.role === 'owner' || user.role === 'admin') return <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              to="#">
                            <i className="bi bi-journal-text"/><span>House</span><i
                            className="bi bi-chevron-down ms-auto"/>
                        </Link>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/add-house">
                                    <i className="bi bi-circle"/><span>Add House</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/show-house">
                                    <i className="bi bi-circle"/><span>Show House</span>
                                </Link>
                            </li>

                        </ul>
                    </li>
                </React.Fragment>

                else return <span></span>
            })()}


            <li className="nav-item">
                <Link to="/chat" className="nav-link collapsed">
                    <i className="bi bi-messenger"></i>
                    Chat
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/order-list" className="nav-link collapsed">
                    <i className="bi bi-cart4"></i>
                    Orders
                </Link>
            </li>

            {(() => {
                if (user.role === 'admin') return <React.Fragment>
                    <li className="nav-item">
                        <Link to="/show-users" className="nav-link collapsed">
                            <i className="bi bi-people-fill"></i>
                            Users
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact-list" className="nav-link collapsed">
                            <i className="bi bi-person-workspace"></i>
                            Contact
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav-banner"
                              data-bs-toggle="collapse"
                              to="#">
                            <i className="bi bi-journal-text"/><span>Banners</span><i
                            className="bi bi-chevron-down ms-auto"/>
                        </Link>
                        <ul id="forms-nav-banner" className="nav-content collapse "
                            data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/add-banner">
                                    <i className="bi bi-circle"/><span>Add Banner</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/show-banner">
                                    <i className="bi bi-circle"/><span>Show Banner</span>
                                </Link>
                            </li>

                        </ul>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav-about"
                              data-bs-toggle="collapse"
                              to="#">
                            <i className="bi bi-journal-text"/><span>About Us</span><i
                            className="bi bi-chevron-down ms-auto"/>
                        </Link>
                        <ul id="forms-nav-about" className="nav-content collapse "
                            data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/add-about">
                                    <i className="bi bi-circle"/><span>Add </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/show-about">
                                    <i className="bi bi-circle"/><span>Show </span>
                                </Link>
                            </li>

                        </ul>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav-blog"
                              data-bs-toggle="collapse"
                              to="#">
                            <i className="bi bi-journal-text"/><span>Blogs</span><i
                            className="bi bi-chevron-down ms-auto"/>
                        </Link>
                        <ul id="forms-nav-blog" className="nav-content collapse "
                            data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to="/add-blog">
                                    <i className="bi bi-circle"/><span>Add Blog</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/show-blog">
                                    <i className="bi bi-circle"/><span>Show Blog</span>
                                </Link>
                            </li>

                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link to="/setting" className="nav-link collapsed">
                            <i className="bi bi-gear-fill"></i>
                            Settings
                        </Link>
                    </li>
                </React.Fragment>

                else return <span></span>
            })()}


            <li className="nav-item">
                <button
                    onClick={() => handleLogout()}
                    className="btn btn-danger">Logout
                </button>
            </li>
        </ul>
    </aside>);
}

export default AdminAsideComponents;