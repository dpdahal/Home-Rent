import mongoose from "mongoose";

let houseGallerySchema = new mongoose.Schema({
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "House",
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

export default mongoose.model("houseGallery", houseGallerySchema);