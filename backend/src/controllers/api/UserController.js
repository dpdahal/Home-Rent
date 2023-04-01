import dotenv from "dotenv";
import User from "../../models/User.js";
import fs from "fs";
import bcrypt from "bcrypt";

dotenv.config();
import Auth from "../../middleware/auth.js";


export default class UserController {

    async allUserData(req, res) {
        let userData = await User.find({});
        res.status(200).json({users: userData});
    }

    async index(req, res) {
        let token = req.headers.authorization;
        let ojb = Auth.verifyToken(token);
        if (ojb) {
            let loginRole = await User.findById(ojb.id);
            if (loginRole.role === 'admin') {
                let users = await User.find({_id: {$ne: ojb.id}});
                res.status(200).json({users: users, success: true});

            } else {
                let users = await User.find({_id: ojb.id});
                res.status(200).json({users: users, success: true});
            }
        } else {
            return res.status(200).json({message: "Invalid token"});
        }


    }

    async store(req, res) {
        let findEmail = await User.find({email: req.body.email}).countDocuments();
        if (findEmail > 0) {
            return res.status(200).json({message: "Email already exist"});
        } else {
            try {
                let imageName = "";
                if (req.file) {
                    imageName = req.file.filename;
                }
                return await User.create({...req.body, image: imageName}).then((user) => {
                    return res.status(200).json({success: "User created successfully"});
                }).catch((err) => {
                    return res.json(err);
                });


            } catch (e) {
                return res.json(e);
            }
        }


    }


    async update(req, res) {
        let id = req.body.id;
        let imageName;
        let findData = await User.findById(id);
        if (req.file) {
            let filePath = process.cwd() + "\\public\\uploads\\users\\" + findData.image;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            imageName = req.file.filename;
        }
        let updateData = {
            name: req.body.name,
            gender: req.body.gender,
            image: imageName,
        }
        try {
            await User.findByIdAndUpdate(id, updateData);
            return res.status(200).json({success: "User updated successfully"})
        } catch (e) {
            return res.json(e);
        }
    }


    async show(req, res) {
        try {
            let users = await User.findById(req.params.id);
            res.status(200).json({users: users});
        } catch (err) {
            res.json(err);
        }
    }

    async delete(req, res) {
        let findData = await User.findById(req.params.id);
        if (findData.image) {
            let filePath = process.cwd() + "\\public\\uploads\\users\\" + findData.image;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({success: "User deleted successfully"});
            }
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({success: "Banner deleted successfully"});
        } else {

            try {
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({success: "User deleted successfully"});
            } catch (err) {
                return res.json(err);
            }
        }
    }

    async changePassword(req, res) {
        let id = req.body.id;
        let oldPassword = req.body.old_password;
        let findData = await User.findById(id);
        let match = await bcrypt.compare(oldPassword, findData.password);
        if (match) {
            findData.password = req.body.password;
            await findData.save();
            return res.status(200).json({success: "Password match"});
        } else {
            return res.status(200).json({error: "Password does not match"});
        }
    }

    async searchUser(req, res) {
        let name = req.params.id;
        let users = await User.find({name: {$regex: name, $options: 'i'}});
        if (users.length > 0) {
            return res.status(200).json({users: users});
        }
    }
}

