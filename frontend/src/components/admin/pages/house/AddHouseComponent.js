import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {createHouse} from "../../../../store/reducers/houseSlice";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {Link} from "react-router-dom";

const BookSchema = yup.object().shape({
    title: yup.string().required(),
    price: yup.number().required(),
    location: yup.string().required(),
    rooms: yup.number().required(),
    area: yup.number().required(),
    description: yup.string().required(),
});

function AddHouseComponent() {
    let dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(BookSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [images, setImages] = useState([]);


    const imageHandler = (e) => {
        setImages(e.target.files);
    }


    const addHouse = (data) => {
        let sendData = new FormData();
        sendData.append('title', data.title);
        sendData.append('price', data.price);
        sendData.append('location', data.location);
        sendData.append('rooms', data.rooms);
        sendData.append('area', data.area);
        sendData.append('description', data.description);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });

        sendData.append("ownerId", window.user._id);
        dispatch(createHouse(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'houses added successfully',
                    showConfirmButton: true,
                    timer: 3000,
                    footer: '<a href="/show-houses">Go to houses list</a>'
                })
                reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        });
    }
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
                                        <i className="bi bi-bag-plus-fill"></i> Add House
                                        <Link to="/show-house" className="btn btn-primary float-end">
                                            <i className="bi bi-arrow-right-square-fill"></i> Show House
                                        </Link>
                                    </h1>
                                    <form action="#" onSubmit={handleSubmit(addHouse)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <label htmlFor="title">Title:
                                                        {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                                    </label>
                                                    <input type="text" name="title"
                                                           {...register("title")}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <label htmlFor="location">Location:
                                                        {errors.location &&
                                                            <a style={pStyle}>{errors.location.message}</a>}
                                                    </label>
                                                    <input type="text" name="location"
                                                           {...register("location")}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <label htmlFor="area">Area:
                                                        {errors.area && <a style={pStyle}>{errors.area.message}</a>}
                                                    </label>
                                                    <input type="number" name="area"
                                                           {...register("area")}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-1">
                                                    <label htmlFor="rooms">Rooms:
                                                        {errors.rooms && <a style={pStyle}>{errors.rooms.message}</a>}
                                                    </label>
                                                    <input type="number" name="rooms"
                                                           {...register("rooms")}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group mb-1">
                                            <label htmlFor="price">Price:
                                                {errors.price && <a style={pStyle}>{errors.price.message}</a>}
                                            </label>
                                            <input type="number" name="price"
                                                   {...register("price")}
                                                   className="form-control"/>
                                        </div>

                                        <div className="form-group mb-1">
                                            <label htmlFor="description">Description:
                                                {errors.description &&
                                                    <a style={pStyle}>{errors.description.message}</a>}
                                            </label>
                                            <textarea name="description"
                                                      {...register("description")}
                                                      className="form-control"></textarea>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="images">Images:

                                            </label>
                                            <input type="file" name="images" multiple
                                                   onChange={imageHandler}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <button className="btn btn-success">
                                                <i className="bi bi-bag-plus-fill"></i>
                                                Add House
                                            </button>
                                        </div>
                                    </form>

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

export default AddHouseComponent;