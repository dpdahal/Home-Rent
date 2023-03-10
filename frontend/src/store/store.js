import {configureStore} from "@reduxjs/toolkit";

import usersSlice from "./reducers/usersSlice";
import bannerSlice from "./reducers/bannerSlice";
import authSlice from "./reducers/authSlice";
import bookOrderSlice from "./reducers/bookOrderSlice";
import settingSlice from "./reducers/settingSlice";
import blogSlice from "./reducers/blogSlice";
import messageSlice from "./reducers/messageSlice";
import aboutSlice from "./reducers/aboutSlice";
import HouseSlice from "./reducers/houseSlice";


const store = configureStore({
    reducer: {
        house: HouseSlice.reducer,
        user: usersSlice.reducer,
        banner: bannerSlice.reducer,
        auth: authSlice.reducer,
        bookOrder: bookOrderSlice.reducer,
        setting: settingSlice.reducer,
        blogs: blogSlice.reducer,
        message: messageSlice.reducer,
        about: aboutSlice.reducer,
    },

});

export default store;
