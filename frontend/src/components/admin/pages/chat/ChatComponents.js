import React, {useEffect, useState} from "react";
import socket from "./appContext";

import AdminHeaderComponents from "../../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../../layouts/AdminAsideComponents";
import "./style.css";
import api from "../../../../config/api";

function ChatComponents() {
    const [findUser, setFindUser] = useState([]);
    const [chatBox, setChatBox] = useState(false);
    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);

    let getUser = localStorage.getItem('user');
    let localUser = JSON.parse(getUser);


    useEffect(() => {
        api.get("/users/user-list/show").then((res) => {
            setUsers(res.data.users);
        });
    }, []);

    const getMessageBySenderAndReceiver = async (senderId, receiverId) => {
        let sendData = {
            senderId: senderId,
            receiverId: receiverId
        }
        api.post('/message/', sendData).then((res) => {
            setMessage(res.data.message);
        });
    }

    const handleChatBox = async (id) => {
        setChatBox(true);
        let senderId = localUser._id;

        await api.get(`/users/${id}`).then(res => {
            getMessageBySenderAndReceiver(senderId, id);
            setFindUser(res.data.users);
        }).catch((e) => {
            console.log(e)
        });

    }


    const closeChatBox = () => {
        setChatBox(false);
    }


    const sendMessage = (e) => {
        let message = e.target.value;
        let senderId = localUser._id;
        let receiverId = findUser._id;

        if (e.keyCode === 13) {
            socket.emit("message", {
                message: message,
                sender: senderId,
                receiver: receiverId,
            });
            e.target.value = "";
        }
    }


    const filterUser = (e) => {
        let value = e.target.value;
        if (value.length > 0) {
            api.get(`/users/user-search/${value}`).then((res) => {
                setUsers(res.data.users);
            });
        }
    }


    socket.on('message', async (msg) => {
        let senderId = localUser._id;
        let receiverId = findUser._id;
        setMessage([...message, msg]);
    });

    return (
        <React.Fragment>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main id="main" className="main">
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        {chatBox ? (
                                            <div className="chat-main-box col-md-8">
                                                <div className="col-md-12">
                                                    <button onClick={() => closeChatBox()}
                                                            className="btn btn-danger justify-content float-end">Close
                                                    </button>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="chat-box-header">
                                                            <img src={findUser.image} alt=""/>

                                                            <h1> {findUser.name ? findUser.name : "No Name"}</h1>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="messageListBox">
                                                            {message && message.map((msg, index) => (
                                                                <div key={index}>
                                                                    {msg.sender === localUser._id ? (
                                                                            <div
                                                                                className="receivedMessageBox">
                                                                                {msg.message}
                                                                            </div>) :
                                                                        <div
                                                                            className="senderMessageBox">
                                                                            {msg.message}
                                                                        </div>
                                                                    }
                                                                </div>
                                                            ))}


                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea onKeyDown={sendMessage}
                                                                      className="form-control"></textarea>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        ) : <div className="col-md-8 no-user-select">
                                            <h1>Conversations with Friends <i className="bi bi-people-fill"></i></h1>

                                            <h1><i className="bi bi-arrow-right-circle-fill"></i></h1>

                                        </div>}

                                        <div className="col-md-4 userBoxList">
                                            <div className="user-list-section">
                                                <h3>Users List</h3>
                                                <input onChange={filterUser} placeholder="Filter user" type="text"/>
                                                <ul className="user-list">
                                                    {users.map((luser) => (
                                                        <div key={luser._id}>
                                                            {
                                                                (() => {
                                                                    if (luser._id !== localUser._id)
                                                                        return <li
                                                                            onClick={() => handleChatBox(luser._id)}>
                                                                            <div className="user-list-item">
                                                                                <div className="user-list-item-image">
                                                                                    <img src={luser.image} width="40"
                                                                                         alt=""/>
                                                                                </div>
                                                                                <div className="user-list-item-name">
                                                                                    <h4>
                                                                                        {luser.name}
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    else
                                                                        return <span></span>
                                                                })()
                                                            }

                                                        </div>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </React.Fragment>


    )


}

export default ChatComponents;