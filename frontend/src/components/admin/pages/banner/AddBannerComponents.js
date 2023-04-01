import React, {useState, useRef} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import Swal from "sweetalert2";
import JoditEditor from 'jodit-react';

import {useDispatch} from "react-redux";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {createBanner} from "../../../../store/reducers/bannerSlice";
import {Link} from "react-router-dom";

const bannerSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
});

function AddBannerComponents() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(bannerSchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const [images, setImages] = useState([]);


    const imageHandler = (e) => {
        setImages(e.target.files);
    }
    const addBanner = (data) => {
        let sendData = new FormData();
        sendData.append('title', data.title);
        sendData.append('subtitle', data.title);
        sendData.append('description', content);
        Object.values(images).forEach(file => {
            sendData.append("images", file);
        });
        dispatch(createBanner(sendData)).then((res) => {
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Banner added successfully',
                    showConfirmButton: false,
                    timer: 1500
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
    return (<div>
        <AdminHeaderComponents/>
        <AdminAsideComponents/>
        <main id="main" className="main">
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title-dp">
                                    <i className="bi bi-bag-plus-fill"></i> Add Banner
                                    <Link to="/show-banner" className="btn btn-primary float-end">
                                        <i className="bi bi-arrow-right-square-fill"></i> Show Banner
                                    </Link>
                                </h1>
                                <form action="" onSubmit={handleSubmit(addBanner)}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="title">Title:
                                            {errors.title && <a style={pStyle}>{errors.title.message}</a>}
                                        </label>
                                        <input type="text" name="title"
                                               {...register("title")}
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="subtitle">Sub Title:
                                            {errors.subtitle && <a style={pStyle}>{errors.subtitle.message}</a>}
                                        </label>
                                        <input type="text" name="subtitle"
                                               {...register("subtitle")}
                                               className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Description: </label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            tabIndex={1}
                                            onChange={newContent => setContent(newContent)}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="images">Images:

                                        </label>
                                        <input type="file" name="images" multiple
                                               onChange={imageHandler}
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-success">
                                            <i className="bi bi-bag-plus-fill"></i> Add Banner
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
    </div>)
}

export default AddBannerComponents;


