import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "House",
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
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
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

export default mongoose.model("BookHouse", BookSchema);