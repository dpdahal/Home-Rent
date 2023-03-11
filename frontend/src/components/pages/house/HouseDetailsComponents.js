import React, {useEffect, useState} from "react";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../../config/api";
import {orderBook} from "../../../store/reducers/bookOrderSlice";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";


function HouseDetailsComponents() {
    const params = useParams();
    const [house, setHouse] = useState([]);
    const [review, setReview] = useState("");
    const [isReview, setIsReview] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reviewValue = (event) => {
        const reValue = event.target.value;
        setReview(reValue)
    }

    const ratingValues = (events) => {
        const ratValue = events.target.value;
        const houseId = house._id;
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let userId = user._id;
        if (userId) {
            setIsReview(true);
            const data = {
                houseId: houseId,
                userId: userId,
                rating: ratValue
            }
            api.post('/house/house-rating', data).then((response) => {
                getHouseById();
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            navigate(`/login`);
        }


    }

    const addRatingAndReview = (event) => {
        event.preventDefault();
        const houseId = house._id;
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        let userId = user._id;
        if (userId) {
            let data = {
                houseId: houseId,
                userId: userId,
                review: review
            }
            api.post('/house/house-review', data).then((response) => {
                console.log(response.data);
                setReview("");
                getHouseById();
            }).catch((error) => {
                console.log(error);
            });
        } else {
            navigate(`/login`);
        }

    }


    const getHouseById = () => {
        api.get(`/house/show/${params.id}`).then((response) => {
            setHouse(response.data.house);
        });
    }

    useEffect(() => {
        getHouseById();
    }, []);

    const orderBookHandle = (bookId, ownerId) => {
        let loginUserId = localStorage.getItem('userId');
        if (loginUserId) {
            let sendData = {
                bookId: bookId,
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


    return (
        <React.Fragment>
            <HeaderComponents/>
            <div className="container mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="card-title-dp">House Details</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={house.image} className="img-fluid" alt=""/>
                        <hr/>
                        <div className="row">
                            {house.gallery && house.gallery.map((item, index) => (
                                <div className="col-md-3" key={index}>
                                    <img src={item.image} width="100" height="40" alt=""/>
                                </div>
                            ))}

                        </div>

                    </div>
                    <div className="col-md-8">
                        <h1 className="card-title-dp">{house.title}</h1>

                        <p>Price: {house.price}</p>
                        <p> Rooms: {house.rooms}</p>
                        <p> Location: {house.location}</p>
                        <p> Owner: {house.ownerName}</p>
                        <br/>
                        <p>{house.description}</p>
                        <br/>
                        <button onClick={() => orderBookHandle(house._id, house.ownerId)}
                                className="btn btn-danger">Order Now
                        </button>

                        <form action="" className="mt-5" onSubmit={addRatingAndReview}>
                            <div className="row">
                                <div className="col-md-3">
                                    <h3>Rating</h3>
                                    <input type="radio" onChange={ratingValues} value="5" name="rating"/>
                                    <input
                                        type="range" name="demo" value="100"/>
                                    <br/>
                                    <input type="radio" onChange={ratingValues} value="4" name="rating"/> <input
                                    type="range" name="demo" value="80"/> <br/>
                                    <input type="radio" onChange={ratingValues} value="3" name="rating"/> <input
                                    type="range" name="demo" value="60"/> <br/>
                                    <input type="radio" onChange={ratingValues} value="2" name="rating"/> <input
                                    type="range" name="demo" value="40"/> <br/>
                                    <input type="radio" onChange={ratingValues} value="1" name="rating"/> <input
                                    type="range" name="demo" value="10"/> <br/>
                                </div>
                                {isReview ? (
                                    <div className="col-md-9">
                                        <h3>Review</h3>
                                        <div className="form-group mb-1">
                                        <textarea name="review" id="review" required cols="30" rows="3"
                                                  value={review}
                                                  onChange={reviewValue}
                                                  className="form-control"></textarea>

                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-success">Review</button>
                                        </div>
                                    </div>
                                ) : ""}
                            </div>
                        </form>
                        <div className="row mt-3">
                            <hr/>
                            <div className="col-md-12">
                                <h3>Reviews</h3>
                                <hr/>
                                {house.houseRatingsData && house.houseRatingsData.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-md-2">
                                            <img src={item.userImage} width="100" height="40" alt=""/>
                                        </div>
                                        <div className="col-md-8">
                                            <h5>{item.userName}</h5>
                                            <p>{item.review}</p>
                                        </div>
                                        <div className="col-md-2">

                                            <div className="some-container">
                                                {
                                                    (() => {
                                                        if (item.rating == 5)
                                                            return <h4>*****</h4>
                                                        if (item.rating == 4)
                                                            return <h4>****</h4>
                                                        if (item.rating == 3)
                                                            return <h4>***</h4>
                                                        if (item.rating == 2)
                                                            return <h4>**</h4>
                                                        else
                                                            return <span>*</span>
                                                    })()
                                                }
                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h1 className="card-title-dp">Related House</h1>
                    </div>
                    <div className="row">


                    </div>
                </div>
            </div>
            <FooterComponents/>
        </React.Fragment>);
}

export default HouseDetailsComponents;