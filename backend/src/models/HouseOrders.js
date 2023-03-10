import mongoose from "mongoose";

const HouseOrdersSchema = new mongoose.Schema({
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "house",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now

    }
}, {
    versionKey: false
});

export default mongoose.model("HouseOrdersSchema", HouseOrdersSchema);