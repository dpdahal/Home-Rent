import mongoose from "mongoose";

const HouseRating = mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
        default: 1
    },
    review: {
        type: String,
    }
});

export default mongoose.model("HouseRating", HouseRating);
