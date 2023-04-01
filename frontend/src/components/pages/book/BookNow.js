import {useNavigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

function BookNow({houseId, ownerId}) {
    let commonData = useSelector((state) => state);
    let auth = commonData.auth.data ?? false;
    let loginId = auth._id ?? false;
    let loginButton = false;
    if (loginId === ownerId) {
        loginButton = true;
    }
    const navigate = useNavigate();

    const book = () => {
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        } else {
            navigate(`/book-house/${houseId}/${ownerId}`);
        }
    }

    return (<React.Fragment>
        {loginButton ? '' :
            <button className="btn btn-primary btn-sm d-block w-100 mb-2"
                    onClick={() => book()}
                    type="button">
                <i className="ci-cart fs-sm me-1"/>Book Now
            </button>
        }
    </React.Fragment>);
}

export default BookNow;