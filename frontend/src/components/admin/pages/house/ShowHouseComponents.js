import React, {useEffect,useSta} from "react";
import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import AdminFooterComponents from "../../layouts/AdminFooterComponents";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {deleteHouse, getLoginHouse} from "../../../../store/reducers/houseSlice";
import api from "../../../../config/api";

function ShowHouseComponents() {

    const dispatch = useDispatch();
    let houseData = useSelector((state) => state)
    let houses = houseData.house.data;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getLoginHouse())
    }, []);
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteHouse(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };

    const gotoGallery = (id) => {
        navigate(`/house-gallery/${id}`);
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
                                        <i className="bi bi-bag-plus-fill"></i> House List
                                        <Link to="/add-house" className="btn btn-primary float-end">
                                            <i className="bi bi-arrow-right-square-fill"></i> Add House
                                        </Link>

                                    </h1>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>S.n</th>
                                            <th>Title</th>
                                            <th>Location</th>
                                            <th>Price</th>
                                            <th>Area</th>
                                            <th>Rooms</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {houses && houses.map((house, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{house.title}</td>
                                                <td>{house.location}</td>
                                                <td>{house.price}</td>
                                                <td>{house.area}</td>
                                                <td>
                                                    {house.rooms}
                                                </td>
                                                <td>
                                                    <img src={house.image} width="40" alt=""/>
                                                    <hr/>
                                                    <button onClick={() => gotoGallery(house._id)}>Goto Gallery</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary"
                                                            onClick={() => navigate(`/update-house/${house._id}`)}
                                                            title="Update House">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button title="Delete Book"
                                                            onClick={() => handleDelete(house._id)}
                                                            className="btn btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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

export default ShowHouseComponents;