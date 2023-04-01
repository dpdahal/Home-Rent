import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBanner} from "../../store/reducers/bannerSlice";

function HomeBannerComponents() {
    let dispatch = useDispatch();
    let bannerData = useSelector((state) => state);
    useEffect(() => {
        dispatch(getBanner());
    }, []);
    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {bannerData && bannerData.banner.data.map((banner, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={banner.image} className="d-block w-100" height="650px" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{banner.title}</h5>

                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default HomeBannerComponents;
