import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import React, {useEffect, useState} from "react";
import api from "../../../../config/api";

function ShowMyOrders() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);

    const confirmBooking = async (bookingId, type) => {
        let sendData = {
            bookingId: bookingId,
            type: type
        }
        await api.post("/house/booking-confirm/", sendData).then((response) => {
            window.location.href = '/order-list';
        })
    }

    let token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `${token}`;
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        api.get(`/house/show-order-by-login/`).then((response) => {
            setRooms(response.data.bookingData);
        });
    }, []);




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
                                        <i className="bi bi-bag-plus-fill"></i> Order List
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>S.n</th>
                                                    <th>House</th>
                                                    {user.role === 'admin' || user.role === 'owner' && <th>Client</th>}
                                                    <th>Price</th>
                                                    <th>Payment Status</th>
                                                    <th>Status</th>
                                                    <th>Images</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {rooms.map((room, index) => (
                                                    <tr key={index}>
                                                        <td>{++index}</td>
                                                        <td>{room.houseId.title}</td>
                                                        {user.role === 'admin' || user.role === 'owner' && <td>{room.userId.name}</td>}
                                                        <td>{room.houseId.price}</td>
                                                        <td>{room.paymentStatus}</td>
                                                        <td>{room.status}</td>
                                                        <td>
                                                            <img src={room.houseId.image} width="60" alt=""/>
                                                        </td>
                                                        <td>

                                                            {
                                                                (() => {
                                                                    if (user.role === 'admin' || user.role === 'owner') {
                                                                        return (
                                                                            <React.Fragment>
                                                                                {room.status === 'pending' ?
                                                                                    <div>
                                                                                        <button
                                                                                            onClick={(e) => confirmBooking(room._id, 'approved')}
                                                                                            className="btn btn-sm btn-success">Approved
                                                                                        </button>
                                                                                        <button
                                                                                            onClick={(e) => confirmBooking(room._id, 'reject')}
                                                                                            className="btn btn-sm btn-danger">Reject
                                                                                        </button>
                                                                                    </div>
                                                                                    :
                                                                                    <div></div>
                                                                                }
                                                                                {room.status === 'approved' ?
                                                                                    <div>
                                                                                        <button
                                                                                            className="btn btn-sm btn-success">
                                                                                            <i className="bi bi-check"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                    : <div></div>
                                                                                }

                                                                                {room.status === 'reject' ?
                                                                                    <div>
                                                                                        <button
                                                                                            className="btn btn-sm btn-danger">
                                                                                            <i className="bi bi-file-earmark-excel-fill"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                    : <div></div>
                                                                                }
                                                                            </React.Fragment>
                                                                        )
                                                                    } else
                                                                        return <React.Fragment>
                                                                            {room.status === 'approved' ?
                                                                                <div>
                                                                                    <button
                                                                                        className="btn btn-sm btn-success">
                                                                                        <i className="bi bi-check"></i>
                                                                                    </button>
                                                                                </div>
                                                                                : <div></div>
                                                                            }
                                                                            {room.status === 'reject' ?
                                                                                <div>
                                                                                    <button
                                                                                        className="btn btn-sm btn-danger">
                                                                                        <i className="bi bi-file-earmark-excel-fill"></i>
                                                                                    </button>
                                                                                </div>
                                                                                : <div></div>
                                                                            }
                                                                        </React.Fragment>
                                                                })()
                                                            }


                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>

    )
}

export default ShowMyOrders