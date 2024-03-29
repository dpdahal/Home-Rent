import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getHouseImages} from "../../../../store/reducers/houseGallerySlice";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import api from "../../../../config/api";

function HouseGallery() {
    const dispatch = useDispatch();
    const params = useParams();
    let galleryImage = useSelector((state) => state);
    let houseImages = galleryImage.houseGallery.data.houseImages;

    const [images, setImages] = useState([]);
    const imageHandler = (e) => {
        setImages(e.target.files);
    }
    const addImage = (e) => {
        e.preventDefault();
        let sendData = new FormData();
        sendData.append('houseId', params.id);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });
        api.post('/house/house-gallery', sendData).then((response) => {
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'house images successfully inserted',
                    showConfirmButton: true,
                    timer: 3000,
                })
                setImages([]);
                dispatch(getHouseImages(params.id));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {
        dispatch(getHouseImages(params.id));
    }, []);


    return (
        <div>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main id="main" className="main">
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="card-title-dp">
                                        <i className="bi bi-bag-plus-fill"></i> Manage House Gallery
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form action="" onSubmit={addImage}>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="bookImage">Add Image</label>
                                                    <input type="file" onChange={imageHandler} required
                                                           className="form-control" multiple/>
                                                </div>
                                                <div className="form-group">
                                                    <button className="btn btn-success">Upload Image</button>
                                                </div>
                                            </form>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {houseImages && houseImages.map((hImage, index) => (
                                            <div className="col-md-3" key={hImage._id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <img src={hImage.image} alt="bookImage"
                                                             className="img-fluid"/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <AdminFooterComponents/>
        </div>
    )
}

export default HouseGallery;