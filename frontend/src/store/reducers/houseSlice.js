import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const createHouse = createAsyncThunk(
    "houses/createHouse",
    async (object, {rejectWithValue}) => {
        try {
            let token = localStorage.getItem("token");
            api.defaults.headers.common["Authorization"] = `${token}`;
            const {data} = await api.post("/house", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getHouse = createAsyncThunk(
    "houses/getHouse", async () => {
        try {
            let token = localStorage.getItem("token");
            api.defaults.headers.common["Authorization"] = `${token}`;
            const {data} = await api.get("/house");
            return data.house;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const getLoginHouse = createAsyncThunk(
    "houses/getLoginHouse", async () => {
        try {
            let token = localStorage.getItem("token");
            api.defaults.headers.common["Authorization"] = `${token}`;
            const {data} = await api.get("/house/login-house");
            return data.house;
        } catch (error) {
            return error.response.data.message;
        }
    });

export const updateHouse = createAsyncThunk(
    "houses/updateHouse",
    async (object, {rejectWithValue}) => {
        try {
            let token = localStorage.getItem("token");
            api.defaults.headers.common["Authorization"] = `${token}`;
            const {data} = await api.put("/house", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteHouse = createAsyncThunk(
    "houses/deleteHouse",
    async (houseId, {rejectWithValue}) => {
        try {
            let token = localStorage.getItem("token");
            api.defaults.headers.common["Authorization"] = `${token}`;
            await api.delete(`/house/delete/${houseId}`);
            return houseId;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const houseSlice = createSlice({
    name: "houses",
    initialState,
    reducers: {},
    extraReducers: {
        [createHouse.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [createHouse.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "houses created successfully",
            };
        },
        [createHouse.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getHouse.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getHouse.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getHouse.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteHouse.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteHouse.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteHouse.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateHouse.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateHouse.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "houses updated successfully",
            };
        },
        [updateHouse.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },


        [getLoginHouse.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getLoginHouse.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getLoginHouse.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },



    },
});

export default houseSlice;

