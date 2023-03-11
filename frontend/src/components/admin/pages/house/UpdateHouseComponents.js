import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import api from "../../../../config/api";
import {Link, useParams} from "react-router-dom";

const HouseSchema = yup.object().shape({
    title: yup.string().required(),
    price: yup.number().required(),
    location: yup.string().required(),
    rooms: yup.number().required(),
    area: yup.number().required(),
    description: yup.string().required(),
});

function UpdateHouseComponents() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(HouseSchema)
    });

    let params = useParams();

    const getHouseById = () => {
        api.get(`/house/show/${params.id}`).then(res => {
            let hData = res.data.house;
            setValue('title', hData.title);
            setValue('price', hData.price);
            setValue('location', hData.location);
            setValue('rooms', hData.rooms);
            setValue('area', hData.area);
            setValue('description', hData.description);
        });

    }

    useEffect(() => {
        getHouseById();
    }, []);


    let pStyle = {
        color: "#f60000",
    }


    const update = (data) => {
        let user= localStorage.getItem("user");
        user = JSON.parse(user);
        let userId= user._id;
        data = {...data, ownerId: userId};
        api.put(`/house/update/${params.id}`, data).then(res => {
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'house updated successfully',
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
                                        <i className="bi bi-pencil-square"></i> Update House
                                        <Link to="/show-house" className="btn btn-primary float-end">
                                            <i className="bi bi-arrow-right-square-fill"></i> Show Houses
                                        </Link>
                                    </h1>
                                    <form action="#"
                                          onSubmit={handleSubmit(update)}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="title">Title:
                                                {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                            </label>
                                            <input type="text" name="title"
                                                   {...register("title")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="price">Price:
                                                {errors.price && <a style={pStyle}>{errors.price.message}</a>}
                                            </label>
                                            <input type="number" name="price"
                                                   {...register("price")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="location">Location:
                                                {errors.location && <a style={pStyle}>{errors.location.message}</a>}
                                            </label>
                                            <input type="text" name="location"
                                                   {...register("location")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="rooms">Rooms:
                                                {errors.rooms && <a style={pStyle}>{errors.rooms.message}</a>}
                                            </label>
                                            <input type="number" name="rooms"
                                                   {...register("rooms")}
                                                   className="form-control"/>
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="area">Area:
                                                {errors.area && <a style={pStyle}>{errors.area.message}</a>}
                                            </label>
                                            <input type="number" name="area"
                                                   {...register("area")}
                                                   className="form-control"/>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="description">Description:
                                                {errors.description &&
                                                    <a style={pStyle}>{errors.description.message}</a>}
                                            </label>
                                            <textarea name="description"
                                                      {...register("description")}
                                                      className="form-control"></textarea>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button className="btn btn-success">
                                                <i className="bi bi-pencil-square"></i> Update House
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

export default UpdateHouseComponents;