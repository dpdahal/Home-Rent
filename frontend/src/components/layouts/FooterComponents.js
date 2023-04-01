import {Link} from "react-router-dom";

function FooterComponents() {
    let backGround = {
        backgroundColor: '#545bc4',
    }
    return (
        <div>
            <footer style={backGround} className="footer pt-5">
                <div className="container">
                    <div className="row pb-2">
                        <div className="col-md-4 col-sm-6">
                            <div className="widget widget-links widget-light pb-2 mb-4">
                                <h3 className="widget-title text-light">Company</h3>
                                <ul className="widget-list">
                                    <li className="widget-list-item">
                                        <Link to='/' className="widget-list-link text-light">Home</Link>
                                    </li>
                                    <li className="widget-list-item">
                                        <Link to='/about-us' className="widget-list-link text-light">About</Link></li>
                                    <li className="widget-list-item">
                                        <Link to="/contact-us" className="widget-list-link text-light">Contact Us</Link>
                                    </li>
                                    <li className="widget-list-item">
                                        <Link to="/faq" className="widget-list-link text-light">Faq</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="widget widget-links widget-light pb-2 mb-4">
                                <h3 className="widget-title text-light">Account info</h3>
                                <ul className="widget-list">
                                    <li className="widget-list-item">
                                        <Link to='/register' className="widget-list-link text-light">Register
                                        </Link>
                                    </li>
                                    <li className="widget-list-item">
                                        <Link to="/login" className="widget-list-link text-light">Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="widget pb-2 mb-4">
                                <h3 className="widget-title text-light pb-1">Stay informed</h3>
                                <form className="subscription-form validate" action="#"
                                      method="post" name="mc-embedded-subscribe-form">
                                    <div className="input-group flex-nowrap"><i
                                        className="ci-mail position-absolute top-50 translate-middle-y text-muted fs-base ms-3"/>
                                        <input className="form-control rounded-start" type="email" name="EMAIL"
                                               placeholder="Your email" required/>
                                        <button className="btn btn-primary" type="submit" name="subscribe">Subscribe*
                                        </button>
                                    </div>
                                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                                        <input className="subscription-form-antispam" type="text"
                                               name="b_c7103e2c981361a6639545bd5_29ca296126" tabIndex={-1}/>
                                    </div>
                                    <div className="form-text text-light opacity-50">*Subscribe to our newsletter to
                                        receive early discount offers, updates and new products info.
                                    </div>
                                    <div className="subscription-status"/>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </footer>

        </div>
    );
}

export default FooterComponents;