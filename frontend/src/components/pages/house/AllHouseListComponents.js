import React, {useEffect, useState} from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../../../config/api";
import {orderBook} from "../../../store/reducers/bookOrderSlice";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import BookNow from "../book/BookNow";


function AllHouseList() {
    const params = useParams();
    const [houseData, setHouseData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderHouseHandle = (houseId, ownerId) => {
        let loginUserId = localStorage.getItem('userId');
        if (loginUserId) {
            let sendData = {
                houseId: houseId,
                ownerId: ownerId,
                userId: loginUserId
            }
            dispatch(orderBook(sendData)).then((response) => {
                if (response.payload.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order was successfully',
                        showConfirmButton: true,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            });
        } else {
            navigate(`/login`);
        }
    }


    useEffect(() => {
        api.get(`/house/`).then((response) => {
            setHouseData(response.data.house);
        });
    }, []);

    return (
        <React.Fragment>
            <HeaderComponents/>
            <section className="container mt-5 pt-md-3 pb-5 mb-md-3">
                <h2 className="h3 text-left">House List</h2>
                <div className="row pt-4 mx-n2">
                    {houseData.map((house) => (
                        <div key={house._id} className="col-lg-3 col-md-4 col-sm-6 px-2 mb-4">
                            <div className="card product-card">
                                <button className="btn-wishlist btn-sm" type="button" data-bs-toggle="tooltip"
                                        data-bs-placement="left" title="Add to wishlist"><i className="ci-heart"/>
                                </button>
                                <Link to={`/house-details/${house._id}`} className="card-img-top d-block overflow-hidden">
                                    <img src={house.image} height="300" alt="Product"/></Link>
                                <div className="card-body py-2">
                                    <h3 className="product-title fs-sm">
                                        <Link to={`/house-details/${house._id}`}>{house.title}</Link></h3>
                                    <div className="d-flex justify-content-between">
                                        <div className="product-price"><span
                                            className="text-accent">Rs. {house.price}</span></div>
                                        <div className="star-rating"><i
                                            className="star-rating-icon ci-star-filled active"/><i
                                            className="star-rating-icon ci-star-filled active"/><i
                                            className="star-rating-icon ci-star-filled active"/><i
                                            className="star-rating-icon ci-star-half active"/><i
                                            className="star-rating-icon ci-star"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body card-body-hidden">

                                    <BookNow houseId={house._id} ownerId={house.ownerId}/>
                                    <div className="text-center">
                                        <Link to={`/house-details/${house._id}`} className="nav-link-style fs-ms">
                                            <i className="ci-eye align-middle me-1"/>
                                            Quick view</Link></div>
                                </div>
                            </div>
                            <hr className="d-sm-none"/>
                        </div>
                    ))}


                </div>
                <div className="text-center pt-3">
                    <Link to="/" className="btn btn-outline-accent">
                        More House<i className="ci-arrow-right ms-1"/>
                    </Link>
                </div>
            </section>
            <FooterComponents/>
        </React.Fragment>);
}

export default AllHouseList;
