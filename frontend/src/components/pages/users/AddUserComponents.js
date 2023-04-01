import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import {createUser} from "../../../store/reducers/usersSlice";
import HeaderComponents from "../../layouts/HeaderComponents";
import FooterComponents from "../../layouts/FooterComponents";
import "./Login.css";
import {Link} from "react-router-dom";


const RegisterSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    gender: yup.string().required(),
    role: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required().matches(/^[0-9]{10}$/, "Must be exactly 10 digits"),
});

function AddUserComponents() {
    const dispatch = useDispatch();
    const {
        setValue, register, handleSubmit, reset, formState: {errors}
    } = useForm({
        resolver: yupResolver(RegisterSchema)
    });
    let pStyle = {
        color: "#f60000",
    }


    const insertUser = (data) => {
        let sendData = new FormData();
        sendData.append('name', data.name);
        sendData.append('email', data.email);
        sendData.append('password', data.password);
        sendData.append('gender', data.gender);
        sendData.append('role', data.role);
        sendData.append('address', data.address);
        sendData.append('phone', data.phone);
        sendData.append("image", data.image ?? "");
        dispatch(createUser(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    position: 'center', icon: 'success', title: `${res.payload.success} `, showConfirmButton: true,
                });
                reset();
                setTimeout(() => {
                    window.location.href = "/login";
                }, 5000)

            } else if (res.payload.message) {
                Swal.fire({
                    position: 'center', icon: 'error', title: `${res.payload.message} `, showConfirmButton: true,
                });
            }

        }).catch((err) => {
            console.log(err);
        });
    }


    return (<React.Fragment>
        <HeaderComponents/>
        <div className="container mb-5 mt-5">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h1 className="card-title-dp">Create New Account</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form action="" onSubmit={handleSubmit(insertUser)}>
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="gender">Account Role:
                                                {errors.role && <a style={pStyle}>{errors.role.message}</a>}
                                            </label>
                                            <select name="gender"  {...register("role")} className="form-control">
                                                <option value="">--Select Role---</option>
                                                <option value="owner">Owner</option>
                                                <option value="tenant">Tenant</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="gender">Gender:
                                                {errors.gender && <a style={pStyle}>{errors.gender.message}</a>}
                                            </label>
                                            <select name="gender"  {...register("gender")} className="form-control">
                                                <option value="">--select gender---</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password:
                                        {errors.password && <a style={pStyle}>{errors.password.message}</a>}
                                    </label>
                                    <input type="password" className="form-control"
                                           {...register("password")} name="password"/>

                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="confirm_password">Confirm Password:
                                        {errors.confirm_password &&
                                            <a style={pStyle}>{errors.confirm_password.message}</a>}
                                    </label>
                                    <input type="password" className="form-control"
                                           {...register("confirm_password")} name="confirm_password"/>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="address">Address:
                                        {errors.address && <a style={pStyle}>{errors.address.message}</a>}
                                    </label>
                                    <input type="text" className="form-control"
                                           {...register("address")} name="address"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="phone">Phone:
                                        {errors.phone && <a style={pStyle}>{errors.phone.message}</a>}
                                    </label>
                                    <input type="number" maxLength="10" className="form-control"
                                           {...register("phone")} name="phone"/>
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" className="form-control"
                                           onChange={(e) => setValue('image', e.target.files[0])}/>
                                </div>
                            </div>
                        </div>


                        <div className="form-group mb-5 mt-2">
                            <button className="login-btn">New User</button>
                            <Link to="/login" className="float-end">Login</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <FooterComponents/>
    </React.Fragment>);
}

export default AddUserComponents;
