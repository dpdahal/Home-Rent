import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import api from "../../config/api";

const initialState = {
    data: [],
    responseStatus: "",
    responseMessage: "",
};

export const addHouseImage = createAsyncThunk(
    "gallery/addHouseImage",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.post("/house/house-gallery", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getHouseImages = createAsyncThunk(
    "gallery/getHouseImages",
    async (bookId) => {
        try {
            const {data} = await api.get(`/house/house-gallery/${bookId}`);
            return data;
        } catch (error) {
            return error.response.data.message;
        }
    });


export const updateHouseImage = createAsyncThunk(
    "gallery/updateHouseImage",
    async (object, {rejectWithValue}) => {
        try {
            const {data} = await api.put("/house-gallery", object);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteHouseImage = createAsyncThunk(
    "gallery/deleteHouseImage",
    async (id, {rejectWithValue}) => {
        try {
            await api.delete(`/house-gallery/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const houseGallerySlice = createSlice({
    name: "houseGallery",
    initialState,
    reducers: {},
    extraReducers: {
        [addHouseImage.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [addHouseImage.fulfilled]: (state, action) => {
            return {
                ...state,
                tasks: [...state.data, action.payload],
                responseStatus: "success",
                responseMessage: "gallery created successfully",
            };
        },
        [addHouseImage.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [getHouseImages.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [getHouseImages.fulfilled]: (state, action) => {
            return {
                ...state,
                data: action.payload,
                responseStatus: "success",
            };
        },
        [getHouseImages.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },

        [deleteHouseImage.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [deleteHouseImage.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.filter((data) => data._id !== action.payload),
                responseStatus: "success",
            };
        },
        [deleteHouseImage.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
        [updateHouseImage.pending]: (state, action) => {
            return {
                ...state,
                responseStatus: "pending",
            };
        },
        [updateHouseImage.fulfilled]: (state, action) => {
            return {
                ...state,
                data: state.data.map((data) =>
                    data.id === action.payload._id ? action.payload : data
                ),
                responseStatus: "success",
                responseMessage: "Task updated successfully",
            };
        },
        [updateHouseImage.rejected]: (state, action) => {
            return {
                ...state,
                responseStatus: "rejected",
                responseMessage: action.payload,
            };
        },
    },
});

export default houseGallerySlice;
