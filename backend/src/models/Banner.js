import mongoose from "mongoose";

let bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default mongoose.model("Banner", bannerSchema);