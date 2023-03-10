import React from "react";
import MasterComponents from "./components/master/MasterComponents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/FrontendStyle.scss";

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getSetting} from "./store/reducers/settingSlice";
import {getAuthUser} from "./store/reducers/authSlice";


function App() {
    if (localStorage.getItem('user')) {
        {
            console.log("test")
            let user = localStorage.getItem('user');
            user = JSON.parse(user);
            window.user = user;
        }
    }

    let dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(getAuthUser(window.user._id));
        }
        dispatch(getSetting())

    }, []);
    return (
        <React.Fragment>
            <MasterComponents/>
        </React.Fragment>
    )
}


export default App;
