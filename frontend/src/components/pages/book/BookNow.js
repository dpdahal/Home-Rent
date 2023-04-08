import {useNavigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import api from "../../../config/api";
import Swal from "sweetalert2";


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
            let bookData = {
                houseId: houseId,
                ownerId: ownerId,
                userId: loginId,
                paymentStatus: "pending"
            }
            api.post('/house/book-house', bookData).then((response) => {
                if (response.data.bookingInfo) {
                    navigate(`/booking-confirm/${response.data.bookingInfo._id}`);
                } else if (response.data.success) {
                    Swal.fire({
                        title: "Error",
                        text: response.data.success,
                    });
                } else if (response.data.errors) {
                    console.log("errors")
                }
            }).catch((error) => {
                console.log("errors")
            });

        }
    }

    return (<React.Fragment>
        {loginButton ? <Link className="btn btn-primary btn-sm d-block w-100 mb-2"
                             to={`/update-house/${houseId}`}>Edit</Link> :
            <button className="btn btn-primary btn-sm d-block w-100 mb-2"
                    onClick={() => book()}
                    type="button">
                <i className="ci-cart fs-sm me-1"/>Book Now
            </button>
        }
    </React.Fragment>);
}

export default BookNow;