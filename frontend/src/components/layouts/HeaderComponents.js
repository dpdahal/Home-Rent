import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import api from "../../config/api";

function HeaderComponents() {
    let commonData = useSelector((state) => state);
    const [search, setSearch] = React.useState('');
    const [searchBook, setSearchBook] = React.useState(false);
    const [searchBookData, setSearchBookData] = React.useState([]);
    let auth = commonData.auth.data ?? false;

    let loginId = auth._id ?? false;
    let loginUserId = false;
    if (loginId) {
        loginUserId = true;
    }


    let handleSearch = (e) => {
        setSearch(e.target.value);
        setSearchBook(true);

    }

    useEffect(() => {
        if (search !== '') {
            api.get(`/house/house-search/${search}`).then((response) => {
                setSearchBookData(response.data.house);
            });
        }

    }, [search]);

    let searchBookClose = () => {
        setSearchBook(false);
    }

    function logout() {
        localStorage.removeItem('userId');
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <header>
            <div className="header-content-top">
                <div className="content">
                    <span><i className="fas fa-phone-square-alt"/> {commonData.setting.data.phone}</span>
                    <span><i className="fas fa-envelope-square"/> {commonData.setting.data.email}</span>
                </div>
            </div>

            <div className="container-section">

                <strong className="logo-section">
                    <img src={commonData.setting.data.logo} width="290" alt="Logo"/>
                </strong>
                <div className="open-search">
                    <div className="search">
                        <input type="text" placeholder="What are you looking for?"
                               value={search}
                               onChange={handleSearch}
                               className="input-search"/>

                    </div>

                </div>

                <nav className="nav-content">

                    <ul className="nav-content-list">
                        <React.Fragment>
                            {loginId ?
                                <li className="nav-content-item account-login">
                                    <label className="open-menu-login-account" htmlFor="open-menu-login-account">
                                        <input className="input-menu" id="open-menu-login-account" type="checkbox"
                                               name="menu"/>
                                        <i className="fas fa-user-circle"/><span
                                        className="login-text">Hello, <strong>{auth.name}</strong></span>
                                        <span className="item-arrow"/>

                                        <ul className="login-list">
                                            <li className="login-list-item"><Link to='/update-profile'>My
                                                account</Link></li>


                                        </ul>
                                    </label>
                                </li>
                                : <li className="nav-content-item account-login">
                                    <label className="open-menu-login-account" htmlFor="open-menu-login-account">
                                        <input className="input-menu" id="open-menu-login-account" type="checkbox"
                                               name="menu"/>
                                        <i className="fas fa-user-circle"/><span
                                        className="login-text">Hello, Sign in <strong>Create Account</strong></span>
                                        <span className="item-arrow"/>

                                        <ul className="login-list">
                                            <li className="login-list-item">
                                                <Link to="/login">Login</Link>
                                            </li>
                                            <li className="login-list-item">
                                                <Link to="/register">Create
                                                    account</Link>
                                            </li>

                                        </ul>
                                    </label>
                                </li>
                            }
                        </React.Fragment>


                    </ul>
                </nav>
            </div>
            {searchBook ? <div className="dp-search-section">
                <div className="container">
                    <ul>
                        {searchBookData && searchBookData.map((book, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/house-details/${book._id}`} onClick={searchBookClose}>
                                        <div className="dp-search-section-content">
                                            <h3>{book.title}</h3>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <button className="dp-search-section-btn-close" onClick={() => searchBookClose()}>Close</button>
                </div>
            </div> : ''}

            <div className="nav-container">
                <nav className="featured-category">
                    <ul className="nav-row">
                        <li className="nav-row-list">
                            <Link to="/" className="nav-row-list-link">Home</Link>
                        </li>
                        <li className="nav-row-list">
                            <Link to="/about-us" className="nav-row-list-link">About Us</Link>
                        </li>
                        <li className="nav-row-list">
                            <Link to="/house-list" className="nav-row-list-link">House</Link>
                        </li>
                        <li className="nav-row-list">
                            <Link to="/blog-list" className="nav-row-list-link">Blog</Link>
                        </li>
                        <li className="nav-row-list">
                            <Link to="/faq" className="nav-row-list-link">Faq</Link>
                        </li>
                        <li className="nav-row-list">
                            <Link to="/contact-us" className="nav-row-list-link">Contact</Link>
                        </li>
                        {loginId ?
                            <React.Fragment>
                                <li className="nav-row-list">
                                    <Link to="/dashboard" className="nav-row-list-link">Dashboard</Link>
                                </li>
                                <li className="nav-row-list">
                                    <button onClick={() => logout()} className="btn btn-danger">Logout</button>
                                </li>
                            </React.Fragment> :
                            <React.Fragment>
                                <li className="nav-row-list">
                                    <Link to="/login" className="nav-row-list-link">Login</Link>
                                </li>
                                <li className="nav-row-list">
                                    <Link to="/register" className="nav-row-list-link">Register</Link>
                                </li>
                            </React.Fragment>
                        }


                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderComponents;