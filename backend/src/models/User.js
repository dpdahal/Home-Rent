import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    gender: {
        type: String, required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String, enum: ["tenant", 'owner', "admin"],
        default: "tenant"
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    image: {
        type: String,
    },

    status: {
        type: String, default: 'online'
    },
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
}, {
    versionKey: false
});

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


UserSchema.methods.generateToken = function () {
    const user = this;
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}


UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    if (user.image) {
        user.image = process.env.BASE_URL + "/uploads/users/" + user.image;
    } else {
        user.image = process.env.BASE_URL + "/uploads/icons/imagenotfound.jpg";
    }
    delete user.password;
    return user;
}


export default mongoose.model("User", UserSchema);