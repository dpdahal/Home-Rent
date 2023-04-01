import React from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import api from "../../../config/api";
import {useParams} from "react-router-dom";


const contactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required().matches(/^[0-9]{10}$/, "Must be exactly 10 digits"),
    optional_phone: yup.string(),
    address: yup.string().required(),
    optional_address: yup.string(),
});

function BookComponents() {
    let params = useParams();
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(contactSchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    const contactUsRecord = (data) => {
        let houseId = params.houseId;
        let ownerId = params.ownerId;
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        let userId = user._id;
        data.houseId = houseId;
        data.ownerId = ownerId;
        data.userId = userId;
        api.post("/house/book-house", data).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: res.data.success,
                    showConfirmButton: false,
                    timer: 2000,
                });
                reset();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });

    }

    return (<React.Fragment>
        <HeaderComponents/>
        <div className="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="card-title-dp">Book House</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form action="" onSubmit={handleSubmit(contactUsRecord)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name:
                                        {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                    </label>
                                    <input type="text" name="name"
                                           {...register("name")}
                                           className="form-control"/>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email:
                                        {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                    </label>
                                    <input type="email" className="form-control"
                                           {...register("email")}
                                           name="email"/>


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="phone">Phone:
                                        {errors.phone && <a style={pStyle}>{errors.phone.message}</a>}
                                    </label>
                                    <input type="number" className="form-control"
                                           {...register("phone")}
                                           name="phone"/>


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="optional_phone">Optional Phone:
                                        {errors.optional_phone &&
                                            <a style={pStyle}>{errors.optional_phone.message}</a>}
                                    </label>
                                    <input type="number" className="form-control"
                                           {...register("optional_phone")}
                                           name="optional_phone"/>


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="address"> Address:
                                        {errors.address && <a style={pStyle}>{errors.address.message}</a>}
                                    </label>
                                    <input type="text" className="form-control"
                                           {...register("address")}
                                           name="address"/>


                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="optional_address">Optional Address:
                                        {errors.optional_address &&
                                            <a style={pStyle}>{errors.optional_address.message}</a>}
                                    </label>
                                    <input type="text" className="form-control"
                                           {...register("optional_address")}
                                           name="optional_address"/>


                                </div>
                            </div>
                        </div>


                        <div className="form-group mb-2">
                            <button className="btn btn-primary">Book Now</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <FooterComponents/>
    </React.Fragment>);
}

export default BookComponents;
