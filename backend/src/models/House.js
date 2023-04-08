import mongoose from "mongoose";


const HouseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required: true

    },
    rooms: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

}, {
    versionKey: false
});


export default mongoose.model("House", HouseSchema);
